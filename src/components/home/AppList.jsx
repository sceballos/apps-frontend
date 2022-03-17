import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Card } from 'react-bootstrap';

function AppList({loggedUser}) {
    const history = useHistory();
    const [apps, setApps] = useState([]);

    useEffect(() => {
        const getApps = async () => {
            const data = await fetch('http://localhost:5880/apps');
            const json = await data.json();
            setApps(json);
        }
        getApps();
    }, [])

    const editApp = (app, user) => {
        if (user == undefined) {
            return;
        } else {
            history.push({ pathname: "/edit", state: {app : app, user : user}})
        }
    }

    return (
        <div>
            {apps.map((app) =>
                <Card key={app.app_id} style={{ width: '25rem', color : "#000" }} onClick={ () => editApp(app, loggedUser)}>
                    <Card.Body>
                        <Card.Title>{app.name}</Card.Title>
                        <Card.Text>
                            {app.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
export default AppList;