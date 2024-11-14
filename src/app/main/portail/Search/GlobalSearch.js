import React from 'react';
import { Paper, Icon, Input, ClickAwayListener, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import withReducer from 'app/store/withReducer';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    searchResults: {
        position: 'absolute',
        top: '150px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: '90%',
        maxWidth: '400px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        borderRadius: theme.shape.borderRadius,
        overflowY: 'auto',
        maxHeight: '400px',
    },
}));

function GlobalSearch(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const globalSearch = useSelector(({ globalSearchApp }) => globalSearchApp.globalSearch);
    const history = useHistory();

    const handleSearchChange = (event) => {
        dispatch(Actions.setSearchText(event.target.value));
    };

    const handleShowAll = () => {
        const keyword = globalSearch.searchText.trim();
        if (keyword) {
            history.push(`/search?q=${encodeURIComponent(keyword)}`);
        }
    };

    return (
        <div>
            <Paper className="flex p-4 items-center w-full rounded-lg" elevation={1}>
                <Icon className="mr-8 ml-8" color="action">search</Icon>
                <Input
                    placeholder="Rechercher un produit, une activité, un fournisseur"
                    className="flex flex-1 h-44 focus:bg-gray"
                    disableUnderline
                    fullWidth
                    onChange={handleSearchChange}
                    value={globalSearch.searchText}
                />
            </Paper>
            {globalSearch.opened && (
                <ClickAwayListener onClickAway={() => dispatch(Actions.hideSearch())}>
                    <Paper className={classes.searchResults} elevation={1}>
                        <div>Aucun résultat trouvé</div>
                        <Button onClick={handleShowAll} color="primary">
                            Afficher tout
                        </Button>
                    </Paper>
                </ClickAwayListener>
            )}
        </div>
    );
}

export default withReducer('globalSearchApp', reducer)(GlobalSearch);
