import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import "./UserPortal.css";

export default function UserPortal({ onUserLogged, onUserCreated }) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signUpMode, setSignUpMode] = useState(false);

    const attemptLogin = async () => {
        try {
            const url = 'http://127.0.0.1:5880/user/login';
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            });
            const content = await rawResponse.json();
            setLoading(false)
            return content
        }
        catch (err) {
            setLoading(false)
        }
    }
    const attemptUserCreation = async () => {
        try {
            const url = 'http://127.0.0.1:5880/user/create';
            const rawResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
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

        if (signUpMode) {
            attemptUserCreation().then(response => {
                if (response.message != undefined) {
                    setErrorMessage(response.message)
                } else {
                    onUserCreated(response);
                    history.push("/");
                }
            });
        } else {
            attemptLogin().then(response => {
                if (response.message != undefined) {
                    setErrorMessage(response.message)
                } else {
                    onUserLogged(response);
                    history.push("/");
                }
            });
        }
    }

    return (
        <div className="Portal">
            <div className="mb-2">
                <Button onClick={() => {setSignUpMode(false); setErrorMessage("")}} variant={signUpMode ? "secondary" : "primary"} size="lg" className="TabButton">
                    Login with credentials
                </Button>{' or '}
                <Button onClick={() => {setSignUpMode(true); setErrorMessage("")}} variant={signUpMode ? "primary" : "secondary"} size="lg" className="TabButton">
                    Register new user
                </Button>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Control
                        className="InputField"
                        autoFocus
                        autoComplete="off"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Control
                        className="InputField"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                {errorMessage}
                <Button className="SubmitButton" size="lg" type="submit" disabled={!validateForm()}>
                    {signUpMode ? "Sign up" : "Login"}
                </Button>
            </Form>
        </div>
    );
}
