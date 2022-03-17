import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Form from "@rjsf/core";

function AppCreate({loggedUser}) {
    const history = useHistory();    
    const [errorMessage, setErrorMessage] = useState("");

    console.log(loggedUser);
    const createAppRequest = async (name, description, token) => {
        try {
            const url = `http://127.0.0.1:5880/apps/create/`;
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
        title: `Create a new application`,
        type: "object",
        required: ["name", "description"],
        properties: {
            name: { type: "string", title: "Name", default: "" },
            description: { type: "string", title: "Description", default: "" }
        }
    };

    const onSubmit = ({ formData }, e) => {
        createAppRequest(formData.name, formData.description, loggedUser.token).then(result => {
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
export default AppCreate;