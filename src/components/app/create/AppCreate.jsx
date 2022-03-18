import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from "@rjsf/core";
import './../AppManagement.css';
import { Spinner } from "react-bootstrap";
import Schemas from './../FormSchema'
import baseRequest from '../../../repository/api/API';

function AppCreate({ loggedUser }) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

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

    const onSubmit = ({ formData }, e) => {
        setErrorMessage("");
        setLoading(true);
        createAppRequest(formData.name, formData.description, loggedUser.token).then(result => {
            if (result.message !== undefined) { setErrorMessage(result.message); } else { history.push("/"); }
        });
    }

    return (
        <div className="AppManagement">
            <Form
                schema={schema}
                uiSchema={Schemas.UISchema}
                onSubmit={onSubmit} />
            <div>{errorMessage}</div>
            {loading ?
                <div>
                    <Spinner animation="grow" />
                </div>
                : <></>}
        </div>
    );
}
export default AppCreate;