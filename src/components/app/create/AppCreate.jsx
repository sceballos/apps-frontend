import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Form from "@rjsf/core";
import './../AppManagement.css';
import { Spinner } from "react-bootstrap";
import Schemas from './../FormSchema'

function AppCreate({ loggedUser }) {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const createAppRequest = async (name, description, token) => {
        try {
            const url = `http://127.0.0.1:5880/apps/create/`;
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
            setLoading(false);
        }
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
export default AppCreate;