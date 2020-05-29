
import { FuseUtils } from '@fuse';
import { showMessage } from 'app/store/actions/fuse';
import agent from 'agent';
import _ from '@lodash';
import * as Actions from '@fuse/components/FuseNavigation/store/actions';


export const REQUEST_DEMANDE = '[DEMANDE ADMIN APP] REQUEST DEMANDE';
export const GET_DEMANDE = '[DEMANDE ADMIN APP] GET DEMANDE';
export const REQUEST_SAVE = '[DEMANDE ADMIN APP] REQUEST SAVE';
export const REDIRECT_SUCCESS = '[DEMANDE ADMIN APP] REDIRECT SUCCESS';


export const SAVE_DEMANDE = '[DEMANDE ADMIN APP] SAVE DEMANDE';
export const SAVE_ERROR = '[DEMANDE ADMIN APP] SAVE ERROR';

export const REQUEST_SOUS_SECTEUR = '[DEMANDE ADMIN APP] REQUEST SOUS_SECTEUR';
export const GET_SOUS_SECTEUR = '[DEMANDE ADMIN APP] GET SOUS SECTEUR';

export const REQUEST_MOTIF = '[DEMANDE ADMIN APP] REQUEST REQUEST_MOTIF';
export const GET_MOTIF = '[DEMANDE ADMIN APP] GET GET_MOTIF';

export const UPLOAD_ATTACHEMENT = '[DEMANDE ADMIN APP] UPLOAD ATTACHEMENT';
export const UPLOAD_REQUEST = '[DEMANDE ADMIN APP] UPLOAD REQUEST';
export const UPLOAD_ERROR = '[DEMANDE ADMIN APP] UPLOAD ERROR';


export const REQUEST_DELETE = '[DEMANDE ADMIN APP] REQUEST DELETE';
export const DELETE_SUCCESS = '[DEMANDE ADMIN APP] DELETE SUCCESS';
export const ERROR_DELETE = '[DEMANDE ADMIN APP] ERROR DELETE';
export const CLEAN_UP_DEMANDE = '[DEMANDE ADMIN APP] CLEAN_UP';


export function cleanUpDemande() {

    return (dispatch) => dispatch({
        type: CLEAN_UP_DEMANDE,
    });
}

export function getMotifs() {
    const request = agent.get('/api/motifs');

    return (dispatch) => {
        dispatch({
            type: REQUEST_MOTIF,
        });
        return request.then((response) => {
            dispatch({
                type: GET_MOTIF,
                payload: response.data['hydra:member']
            })
        });
    }
    
}

export function getSousSecteurs() {
    const request = agent.get('/api/sous_secteurs?pagination=false&props[]=id&props[]=name');

    return (dispatch) => {
        dispatch({
            type: REQUEST_SOUS_SECTEUR,
        });
        return request.then((response) => {
            dispatch({
                type: GET_SOUS_SECTEUR,
                payload: response.data['hydra:member']
            })
        });

    }
   

}

export function getDemande(params) {
    const request = agent.get(`/api/demande_achats/${params}`);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DEMANDE,
        });
        return request.then((response) => {
            dispatch({
                type: GET_DEMANDE,
                payload: response.data
            })
        }

        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error),

            })
        });
    }

}



export function putDemande(data,sousSecteurs,motif, id,history,categories) {

    
    let postData ={
        ...data,
        categories: _.map(categories, function (value, key) {
            return value['@id'];
        }),
        attachements:_.map(data.attachements, function (value, key) {
            return value['@id'];
        }),
        budget : data.budget && parseFloat(data.budget),
        motifRejet : data.motifRejet? motif.value : null
    }

    const request = agent.put(`/api/demande_achats/${id}`, postData);

    return (dispatch) => {
        dispatch({
            type: REQUEST_SAVE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Demande Modifié' }));
            dispatch(Actions.getCountForBadge('demandes-admin'));
            dispatch({
                type: SAVE_DEMANDE,
                payload: response.data
            })
            history.push('/demandes_admin')
        }
        ).catch((error) => {
            dispatch({
                type: SAVE_ERROR,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}

export function deleteMedia(media) {
    const request = agent.delete(media['@id']);

    return (dispatch) => {
        dispatch({
            type: REQUEST_DELETE,
        });
        return request.then((response) => {

            dispatch(showMessage({ message: 'Document supprimé' }));

            return dispatch({
                type: DELETE_SUCCESS,
                id: media.id
            })
        }
        ).catch((error) => {
            dispatch({
                type: ERROR_DELETE,
                payload: FuseUtils.parseApiErrors(error)
            });
        });
    }

}



export function uploadAttachement(file) {

    return (dispatch, getState) => {

        const formData = new FormData();
        formData.append("file", file);

        const request = agent.post('/api/attachements', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch({
            type: UPLOAD_REQUEST
        });
        return request.then((response) =>

            Promise.all([
                (response),
                dispatch({
                    type: UPLOAD_ATTACHEMENT,
                    payload: response.data

                }),
                dispatch(showMessage({
                    message: 'Document uploaded!', anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'success'
                }))
            ])
        ).catch((error) => {
            dispatch({
                type: UPLOAD_ERROR,
            });
            dispatch(
                showMessage({
                    message: _.map(FuseUtils.parseApiErrors(error), function (value, key) {
                        return key + ': ' + value;
                    }),//text or html
                    autoHideDuration: 6000,//ms
                    anchorOrigin: {
                        vertical: 'top',//top bottom
                        horizontal: 'right'//left center right
                    },
                    variant: 'error'//success error info warning null
                }))
        }

        );
    };
}




export function newDemande() {
    const data = {
        reference: '',
        description: '',
        descriptionEn: '',
        descriptionEs: '',
        dateExpiration: null,
        isPublic: false,
        isAnonyme: false,
        sousSecteurs: null,
        budget: null,
        motifRejet: '',
        langueP: 'fr',
        statut: null,
        attachements: [],
        diffusionsdemandes: []
    };

    return {
        type: GET_DEMANDE,
        payload: data
    }
}
