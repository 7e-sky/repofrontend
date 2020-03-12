import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import FicheFournisseur from './FicheFournisseur';
import HeaderFicheFournisseur from './HeaderFicheFournisseur';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import ContactFournisseurDialog from './ContactFournisseurDialog';

const useStyles = makeStyles(theme => ({
    middle: {
        background: 'linear-gradient(to right, ' + theme.palette.secondary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },

}));

function FicheFournisseurApp(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const parametres = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.parametres);
    const fournisseur = useSelector(({ fournisseursApp }) => fournisseursApp.fournisseur.data);

    useEffect(() => {

        function updateFournisseurState() {
            const params = props.match.params;
            const { id,tab } = params;
            if(!tab){
                if(fournisseur.length === 0)
                dispatch(Actions.getFournisseur(id));
                dispatch(Actions.getFournisseurProduitsApercu(id));
            }
            
            
        }
        

        updateFournisseurState();
    }, [dispatch, props.match.params]);

    useEffect(() => {

        function updateProduitsState() {
            const params = props.match.params;
            const { id,tab } = params;
            if(tab){
                if(fournisseur.length === 0)
                dispatch(Actions.getFournisseur(id));
                dispatch(Actions.getFournisseurProduits(id, parametres));
                
            }
            
        }

        updateProduitsState();
    }, [dispatch, props.match.params, parametres]);

    return (
        <div className="flex flex-col min-h-xl">
            <div
                className={clsx(classes.middle, "mb-0 relative overflow-hidden flex flex-col flex-shrink-0 ")}>
                <div className={classes.overlay} />
                <Grid container spacing={2} className=" max-w-2xl mx-auto py-8  sm:px-16 items-center z-9999">
                    <Grid item sm={12} xs={12}>
                        <HeaderFicheFournisseur {...props} />
                    </Grid>
                </Grid>
            </div>
            <FicheFournisseur {...props} />
            <ContactFournisseurDialog />
        </div>


    )
}

export default withReducer('fournisseursApp', reducer)(FicheFournisseurApp);