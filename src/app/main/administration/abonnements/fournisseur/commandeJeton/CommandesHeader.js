import React from 'react';
import { Icon,  Input, Paper, Typography, Button} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import * as Actions from './store/actions';

function CommandesHeader(props)
{
    const dispatch = useDispatch();
    //const searchText = useSelector(({commandesApp}) => commandesApp.commandes.searchText);
    const mainTheme = useSelector(({fuse}) => fuse.settings.mainTheme);
    const parametres = useSelector(({commandesApp}) => commandesApp.commandes.parametres);
    return (
         <div className="flex flex-1 items-center justify-between p-8 sm:p-24">

                <div className="flex items-center">
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">control_point_duplicate</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="hidden sm:flex" variant="h6">Liste des commandes</Typography>
                    </FuseAnimate>
                </div>

                <div className="flex flex-1 items-center justify-center px-12">

                    <ThemeProvider theme={mainTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                <Icon className="mr-8" color="action">search</Icon>

                                <Input
                                    placeholder="Rechercher..."
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    type="number"
                                    min="1"
                                    value={parametres.id}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={ev => {
                                        parametres.page = 1;
                                        parametres.id=ev.target.value
                                        dispatch(Actions.setParametresData(parametres))
                                    }}
                                />
                            </Paper>
                        </FuseAnimate>
                    </ThemeProvider>
                    

                </div>
               
            </div>

        
    );
}

export default CommandesHeader;
