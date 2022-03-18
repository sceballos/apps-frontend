import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardGroup, Badge, Button, Form, Spinner } from 'react-bootstrap';
import convertDate from './../../util.js';

function AppList({ loggedUser }) {
    const history = useHistory();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [appsToDelete, setAppsToDelete] = useState([]);

    const maxTextLength = 130;
    useEffect(() => {
        let isCancelled = false;
        const getApps = async () => {
            const data = await fetch('http://localhost:5880/apps');
            const json = await data.json();

            if (!isCancelled) {
                setApps(json);
                setLoading(false);
            }
        }
        getApps();
        return () => {
            isCancelled = true;
        };
    }, [loading])

    const attemptAppDeletion = async (appList, token) => {
        try {
            const url = 'http://127.0.0.1:5880/apps/delete';
            const rawResponse = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(appList)
            });
            const content = await rawResponse.json();
            setLoading(false)
            return content
        }
        catch (err) {
            setLoading(false)
        }
    }

    const handleClick = (event, app, user) => {
        event.preventDefault();
        let selection = window.getSelection().toString();
        if (selection.length > 0) {
            return;
        }
        if (deleteMode) {
            if (appsToDelete.includes(app.app_id)) {
                setAppsToDelete(appsToDelete.filter((e) => (e !== app.app_id)));
            } else {
                setAppsToDelete(appsToDelete => [...appsToDelete, app.app_id]);
            }
        } else {
            editApp(app, user);
        }
    }

    const editApp = (app, user) => {
        if (user === undefined) {
            return;
        } else {
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
        <div style={{ alignContent: 'center' }}>

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