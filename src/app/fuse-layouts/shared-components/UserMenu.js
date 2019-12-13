import React, { useState } from 'react';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography, Hidden } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import { Link } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';



function UserMenu(props) {
    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    return (
        <React.Fragment>
            {/* ============= TOKENS FOURNISSEURS ============*/}
            {user.role === 'ROLE_FOURNISSEUR' ?
                (
                    !user.requestJeton ?
                        <div
                            className={clsx("flex items-center px-8 py-4 mr-8 rounded-sm", !user.jetons ? "bg-red text-white" : "bg-green text-white")}>
                            <Icon className="text-20 mr-4">monetization_on</Icon>
                            <Hidden only={['xs']}> <span>Vous avez</span></Hidden>&ensp;
                             <b className="text-20">{user.jetons}</b> &ensp;
                             <Hidden only={['xs']}> <span>Jeton(s) restant(s)</span></Hidden>
                        </div>
                        :
                        <div className="flex  items-center px-8 py-4 mr-8 ">
                            <CircularProgress color="secondary" />
                        </div>
                )
                : ''
            }
            {/* ============= FIN TOKENS FOURNISSEURS ============*/}

            <Button className="h-64" onClick={userMenuClick}>
                {user.data.photoURL ?
                    (
                        <Avatar className="" alt="user photo" src={FuseUtils.getUrl() + user.data.photoURL} />
                    )
                    :
                    (
                        <Avatar className="">
                            {user.data.displayName[0]}
                        </Avatar>
                    )
                }

                <div className="hidden md:flex flex-col ml-12 items-start">
                    <Typography component="span" className="normal-case font-600 flex">
                        {user.data.displayName}
                    </Typography>
                    <Typography className="text-11 capitalize" color="textSecondary">
                        {user.role.toString()}
                    </Typography>
                </div>

                <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
            </Button>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: "py-8"
                }}
            >
                {!user.role || user.role.length === 0 ? (
                    <React.Fragment>
                        <MenuItem component={Link} to="/login">
                            <ListItemIcon className="min-w-40">
                                <Icon>lock</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Login" />
                        </MenuItem>
                        <MenuItem component={Link} to="/register">
                            <ListItemIcon className="min-w-40">
                                <Icon>person_add</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Register" />
                        </MenuItem>
                    </React.Fragment>
                ) : (
                        <React.Fragment>
                            {/*
                        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>account_circle</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="My Profile"/>
                        </MenuItem>
                        <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
                            <ListItemIcon className="min-w-40">
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText className="pl-0" primary="Inbox"/>
                        </MenuItem>
                        */}
                            <MenuItem
                                onClick={() => {
                                    dispatch(authActions.logoutUser());
                                    userMenuClose();
                                }}
                            >
                                <ListItemIcon className="min-w-40">
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Logout" />
                            </MenuItem>
                        </React.Fragment>
                    )}
            </Popover>
        </React.Fragment>
    );
}

export default UserMenu;
