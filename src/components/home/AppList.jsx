import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardGroup, Badge, Button, Form, Spinner } from 'react-bootstrap';
import convertDate from './../../util.js';
import baseRequest from './../../repository/api/API.js'

function AppList({ loggedUser }) {
    const history = useHistory();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [appsToDelete, setAppsToDelete] = useState([]);

    const maxTextLength = 100;
    useEffect(() => {
        let isCancelled = false;
        const getApps = async () => {
            const apiResponse = await baseRequest("/apps")
            if (!isCancelled) {
                setApps(apiResponse);
                setLoading(false);
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

    const handleClick = (event, app, user) => {
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
    }

    const editApp = (app, user) => {
        if (user !== undefined) {
            history.push({ pathname: "/edit", state: { app: app, user: user } })
        }
    }

    const handleDeleteAction = (appsList, token) => {
        setDeleteMessage("Deleting...");
        attemptAppDeletion(appsList, token).then(result => {
            if (result.message === undefined) {
                setAppsToDelete([]);
                setDeleteMessage("Apps successfully deleted!");
                setLoading(true);
            } else {
                setDeleteMessage(result.message);
            }
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
            {loading ?
                <div>
                    <Spinner animation="grow" />
                </div>
                : <></>}

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
                    <div key={app.app_id} className="row-lg-1 d-flex align-items-stretch">
                        <Card
                            style={{ margin: '5px', display: 'inline-block', width: '250px', height: '250px', maxHeight: '250px' }}
                            onClick={(e) => handleClick(e, app, loggedUser)}>
                            <div style={{ margin: 5 }}>
                                {appsToDelete.includes(app.app_id) ? <Badge bg="danger">Selected</Badge>
                                    : <Badge bg="info">{`Modified on ${convertDate(app.modified_on)}`}</Badge>}
                            </div>
                            <Card.Img
                                style={{ height: '10%', width: '10%' }}
                                variant="top"
                                src="https://play-lh.googleusercontent.com/UrY7BAZ-XfXGpfkeWg0zCCeo-7ras4DCoRalC_WXXWTK9q5b0Iw7B0YQMsVxZaNB7DM=s180" />

                            <Card.Body>
                                <Card.Title>
                                    {app.name}
                                </Card.Title>
                                <Card.Text>
                                    {app.description.substring(0, maxTextLength)} {app.description.length >= maxTextLength && '...'}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )}
            </CardGroup>
        </div>

    );
}
export default AppList;