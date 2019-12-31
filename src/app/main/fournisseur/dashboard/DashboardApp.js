import React, { useEffect, useRef, useState } from 'react';
import {Tab, Tabs, Typography } from '@material-ui/core';
import { FuseAnimateGroup, FusePageSimple } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import { makeStyles } from '@material-ui/styles';
import ContentLoader from 'react-content-loader'

const useStyles = makeStyles(theme => ({
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0'
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft: 1
    },
}));

function DashboardApp(props) {
    const dispatch = useDispatch();
    const widgets = useSelector(({ dashboardApp }) => dashboardApp.widgets);
    const user = useSelector(({ auth }) => auth.user);
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);



    useEffect(() => {
        dispatch(Actions.getWidgets());
    }, [dispatch]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }



    if (!widgets) {
        return null;
    }

    return (
        <FusePageSimple
            classes={{
                header: "min-h-160 h-160",
                toolbar: "min-h-48 h-48",
                rightSidebar: "w-288",
                content: classes.content,
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                    <div className="flex justify-between items-start">
                        <Typography className="py-0 sm:py-24" variant="h4">Bienvenue à nouveau, {user.data.displayName}!</Typography>

                    </div>
                </div>
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                >
                    <Tab className="text-14 font-600 normal-case" label="Accueil" />
                    <Tab className="text-14 font-600 normal-case" label="Résumé du budget" />
                    <Tab className="text-14 font-600 normal-case" label="Membres de l'équipe" />
                </Tabs>
            }
            content={
                <div className="p-12">
                    {
                        tabValue === 0 &&
                        (
                            widgets.loading === false ?
                                <FuseAnimateGroup
                                    className="flex flex-wrap"
                                    enter={{
                                        animation: "transition.slideUpBigIn"
                                    }}
                                >
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <Widget1 widget={widgets.data.widget1} />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <Widget2 widget={widgets.data.widget2} />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <Widget3 widget={widgets.data.widget3} />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
                                        <Widget4 widget={widgets.data.widget4} />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <Widget6 />
                                    </div>
                                    <div className="widget flex w-full sm:w-1/2 p-12">
                                        <Widget5 />
                                    </div>

                                </FuseAnimateGroup>
                                :

                                <ContentLoader
                                    height={100}
                                    width={750}
                                    speed={2}
                                    primaryColor="#d9d9d9"
                                    secondaryColor="#ecebeb"
                                >
                                    <circle cx="90" cy="50" r="30" />
                                    <rect x="20" y="90" rx="0" ry="0" width="140" height="25" />
                                    <circle cx="250" cy="50" r="30" />
                                    <rect x="180" y="90" rx="0" ry="0" width="140" height="25" />
                                    <circle cx="400" cy="50" r="30" />
                                    <rect x="340" y="90" rx="0" ry="0" width="140" height="25" />
                                    <circle cx="570" cy="50" r="30" />
                                    <rect x="500" y="90" rx="0" ry="0" width="140" height="25" />
                                </ContentLoader>


                        )}
                    {tabValue === 1 && (

                        <div className="flex flex-wrap">
                            <div className="widget w-full sm:w-1/3 p-16">
                                <Widget7 />
                            </div>
                            <div className="widget w-full sm:w-2/3 p-16">
                                <Widget8 />
                            </div>
                        </div>

                    )}
                    {tabValue === 2 && (
                          
                                <Widget9 />
                    )}
                </div>
            }
            ref={pageLayout}
        />
    );
}

export default withReducer('dashboardApp', reducer)(DashboardApp);
