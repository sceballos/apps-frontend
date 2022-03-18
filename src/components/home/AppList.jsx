import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card, CardGroup, Badge, Button, Form } from 'react-bootstrap';

function AppList({ loggedUser }) {
    const history = useHistory();
    const [apps, setApps] = useState([]);
    const [update, setUpdate] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState();
    const [appsToDelete, setAppsToDelete] = useState([]);

    useEffect(() => {
        const getApps = async () => {
            const data = await fetch('http://localhost:5880/apps');
            const json = await data.json();
            setApps(json);
            setUpdate(false);
        }
        getApps();
    }, [update])

    const attemptAppDeletion = async (appList, token) => {
        try {
            const url = 'http://127.0.0.1:5880/apps/delete';
            const rawResponse = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(appList)
            });
            const content = await rawResponse.json();
            //setLoading(false)
            return content
        }
        catch (err) {
            //setLoading(false)
        }
    }

    const handleClick = (app, user) => {
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
        if (user == undefined) {
            return;
        } else {
            history.push({ pathname: "/edit", state: { app: app, user: user } })
        }
    }

    const handleDeleteAction = (appsList, token) => {
        console.log(token);
        attemptAppDeletion(appsList, token).then( result => {
            console.log(result.length);
            console.log("current ", appsToDelete.length);
            if (result.message == undefined) {
                setAppsToDelete([]);
                setDeleteMessage("Apps successfully deleted!");
                setUpdate(true);
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
            {loggedUser ? <Button onClick={() => toggleDeleteMode()}
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
                    <Card bg="red" key={app.app_id} style={{ width: '25rem', color: "#000" }} onClick={() => handleClick(app, loggedUser)}>
                        {appsToDelete.includes(app.app_id) ? <Badge bg="danger">Selected</Badge> : <></>}
                        <Card.Body>
                            <Card.Title>{app.name}</Card.Title>
                            <Card.Text>
                                {app.description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )}
            </CardGroup>
        </div>

    );
}
export default AppList;