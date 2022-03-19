import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import {CardGroup, Button, Form, Spinner } from 'react-bootstrap';
import AppCard from './AppCard.jsx';
import baseRequest from './../../repository/api/API.js'
import LoadingWidget from '../uielem/LoadingWidget.jsx';

function AppList({ loggedUser }) {
    const history = useHistory();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [appsToDelete, setAppsToDelete] = useState([]);

    useEffect(() => {
        let isCancelled = false;
        const getApps = async () => {
            const apiResponse = await baseRequest("/apps");
            if (!isCancelled) {
                setLoading(false);
                if (apiResponse.error) {
                    setErrorMessage(apiResponse.error);
                    return;
                }
                if (!apiResponse.length) {
                    setErrorMessage("No available apps");
                    return;
                };
                setApps(apiResponse);
            }
        }
        getApps();
        return () => {
            isCancelled = true;
        };
    }, [loading])

    const attemptAppDeletion = async (appList, token) => {
        const apiResponse = await
            baseRequest(
                "/apps/delete",
                "DELETE",
                appList,
                token);
        setLoading(false);
        return apiResponse;
    }

    const clickCallback = useCallback((event, app, user) => {
        event.preventDefault();

        if (!deleteMode) {
            editApp(app, user);
            return;
        }
        const wasAppSelected = appsToDelete.includes(app.app_id);

        wasAppSelected ?
            setAppsToDelete(appsToDelete.filter((e) => (e !== app.app_id)))
            :
            setAppsToDelete(appsToDelete => [...appsToDelete, app.app_id]);
    }, [deleteMode, appsToDelete]);

    const editApp = (app, user) => {
        if (user) {
            history.push({ pathname: "/edit", state: { app: app, user: user } })
        }
    }

    const handleDeleteAction = (appsList, token) => {
        setDeleteMessage("Deleting...");
        attemptAppDeletion(appsList, token).then(result => {
            if (result.error) {
                setDeleteMessage(result.error);
                return;
            }
            if (result.message) {
                setDeleteMessage(result.message);
                return;
            }
            setAppsToDelete([]);
            setDeleteMessage("Apps successfully deleted!");
            setLoading(true);
        });
    }

    const toggleDeleteMode = () => {
        if (deleteMode) {
            setDeleteMessage("");
            setAppsToDelete([])
        } else {
            setDeleteMessage("Click on any app to add it to the deletion list.");
        }
        setDeleteMode(!deleteMode);
    }
    return (
        <div>
            <LoadingWidget isLoading={loading}/>
            {errorMessage ? errorMessage : ""}
            {loggedUser && !loading ? <Button onClick={() => toggleDeleteMode()}
                variant={deleteMode ? 'primary' : 'danger'}
                style={{ margin: "1%", }}>
                {deleteMode ? "Disable Delete Mode" : "Enable Delete Mode"}
            </Button> : <></>}
            {deleteMode ? <Form.Label>{deleteMessage}</Form.Label> : <></>}

            {(deleteMode && appsToDelete.length > 0) ? <Button onClick={() => handleDeleteAction(appsToDelete, loggedUser.token)}
                variant='danger'
                style={{ margin: "1%", }}>
                Delete Selected Apps
            </Button> : <></>}
            <CardGroup>
                {apps.map((app) =>
                    <AppCard
                        key={app.app_id}
                        app={app}
                        handleClick={clickCallback}
                        loggedUser={loggedUser}
                        isSelected={appsToDelete.includes(app.app_id)} />                    
                )}
            </CardGroup>
        </div>
    );
}
export default AppList;