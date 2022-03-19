import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Form from "@rjsf/core";
import { Spinner } from "react-bootstrap";
import './../AppManagement.css';
import Schemas from './../FormSchema'
import baseRequest from '../../../repository/api/API';

function AppEdit() {
    const location = useLocation();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const appId = location.state.app.app_id;
    const [appName, setAppName] = useState(location.state.app.name);
    const [appDescription, setAppDescription] = useState(location.state.app.description);
    const user = location.state.user;

    const updateAppRequest = async (id, name, description, token) => {
        const apiResponse = await baseRequest(
            `/apps/update/${id}`,
            "POST",
            { name: name, description: description },
            token);
        return apiResponse;
    }

    const schema = JSON.parse(JSON.stringify(Schemas.FormSchema));
    schema.title = `Edit ${location.state.app.name}`;
    schema.properties.name.default = appName;
    schema.properties.description.default = appDescription;
    
    const onSubmit = ({ formData }, e) => {
        setLoading(true);
        setAppName(formData.name);
        setAppDescription(formData.description);
        updateAppRequest(appId, formData.name, formData.description, user.token).then(result => {
            setLoading(false);
            if (result.error) {
                setErrorMessage(result.error);
                return;
            }
            if (result.message) {
                setErrorMessage(result.message);
                return;
            }
            history.push("/");
        });
    }

    return (
        <div className="AppManagement">
            <Form
                schema={schema}
                uiSchema={Schemas.UISchema}
                onSubmit={onSubmit}/>
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