import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function AppList() {
    const [apps, setApps] = useState([]);
    useEffect(() => {
        const getApps = async () => {
            const data = await fetch('http://localhost:5880/apps');
            const json = await data.json();
            setApps(json);
        }
        getApps();
    }, [])

    return (
        <div>
            {apps.map(({ name, description }) =>
                <Card style={{ width: '25rem', color : "#000" }} onClick={ () => console.log("open edit page")}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
export default AppList;

