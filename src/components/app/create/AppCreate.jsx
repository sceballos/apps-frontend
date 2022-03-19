import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from "@rjsf/core";
import './../AppManagement.css';
import Schemas from './../FormSchema'
import baseRequest from '../../../repository/api/API';
import LoadingWidget from '../../uielem/LoadingWidget';

function AppCreate({ loggedUser }) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [appName, setAppName] = useState("");
    const [appDescription, setAppDescription] = useState("");

    const createAppRequest = async (name, description, token) => {
        const apiResponse = await baseRequest(
            "/apps/create/",
            "POST",
            { name: name, description: description },
            token
        )
        return apiResponse;
    }

    const schema = JSON.parse(JSON.stringify(Schemas.FormSchema));
    schema.title = "Create a new application";
    schema.properties.name.default = appName;
    schema.properties.description.default = appDescription;

    const onSubmit = ({ formData }, e) => {
        setErrorMessage("");
        setLoading(true);
        setAppName(formData.name);
        setAppDescription(formData.description);
        createAppRequest(formData.name, formData.description, loggedUser.token).then(result => {
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
                onSubmit={onSubmit} />
            <div>{errorMessage}</div>
            <LoadingWidget isLoading={loading}/>
        </div>
    );
}
export default AppCreate;