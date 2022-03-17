import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login({onUserLogged}) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const attemptLogin = async () => {
        try {
            const url = 'http://127.0.0.1:5880/user/login';
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username : username, password : password })
            });
            const content = await rawResponse.json();
            setLoading(false)
            return content
        }
        catch (err) {
            setLoading(false)
        }
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setLoading(true);
        attemptLogin().then( response => {
            if (response.message != undefined) { 
                setErrorMessage(response.message)
            } else {
                onUserLogged(response);
                history.push("/");
            }
        });        
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        autoComplete="off"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {errorMessage}
                <Button size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}
