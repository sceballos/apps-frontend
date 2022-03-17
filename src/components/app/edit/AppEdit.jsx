import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Form from "@rjsf/core";

function AppEdit() {
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
                    'Authorization' : token
                },
                body: JSON.stringify({ name: name, description: description })
            });
            const content = await rawResponse.json();
            return content
        }
        catch (err) {
            console.log(err);

        }
    }

    const schema = {
        title: `Edit ${appToEdit.name}`,
        type: "object",
        required: ["name", "description"],
        properties: {
            name: { type: "string", title: "Name", default: appToEdit.name },
            description: { type: "string", title: "Description", default: appToEdit.description }
        }
    };

    const onSubmit = ({ formData }, e) => {
        updateAppRequest(formData.name, formData.description, loggedUser.token).then(result => {
            if (result.message != undefined) { setErrorMessage(result.message); } else { history.push("/"); }
        });
    }

    return (
        <div>
            <Form
                schema={schema}
                onChange={console.log("changed")}
                onSubmit={onSubmit}
                onError={console.log("errors")} />
            <div>{errorMessage}</div>

        </div>


    );
}
export default AppEdit;