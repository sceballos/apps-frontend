import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Form from "@rjsf/core";
import { Spinner } from "react-bootstrap";
import './../AppManagement.css';
import Schemas from './../FormSchema'

function AppEdit() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const appToEdit = location.state.app;
    const loggedUser = location.state.user;

    const [errorMessage, setErrorMessage] = useState("");

    const updateAppRequest = async (name, description, token) => {
        try {
            const url = `http://127.0.0.1:5880/apps/update/${appToEdit.app_id}`;
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name: name, description: description })
            });
            const content = await rawResponse.json();
            setLoading(false);
            return content
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    const schema = JSON.parse(JSON.stringify(Schemas.FormSchema));
    schema.title = `Edit ${appToEdit.name}`;
    schema.properties.name.default = appToEdit.name;
    schema.properties.description.default = appToEdit.description;
    
    const onSubmit = ({ formData }, e) => {
        setLoading(true);
        updateAppRequest(formData.name, formData.description, loggedUser.token).then(result => {
            if (result.message !== undefined) { setErrorMessage(result.message); } else { history.push("/"); }
        });
    }

    return (
        <div className="AppManagement">
            <Form
                schema={schema}
                uiSchema={Schemas.UISchema}
                onChange={console.log("changed")}
                onSubmit={onSubmit}
                onError={console.log("errors")} />
            <div>{errorMessage}</div>
            {loading ?
                <div>
                    <Spinner animation="grow" />
                </div>
                : <></>}
        </div>


    );
}
export default AppEdit;