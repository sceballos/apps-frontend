import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./UserPortal.css";
import baseRequest from "../../../repository/api/API";

export default function UserPortal({ onUserLogged, onUserCreated }) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [signUpMode, setSignUpMode] = useState(false);

    const attemptLogin = async () => {
        const apiResponse = await baseRequest(
            "/user/login",
            "POST",
            { username: username, password: password });
        setLoading(false);
        return apiResponse;
    }
    const attemptUserCreation = async () => {
        const apiResponse = await baseRequest(
            "/user/create",
            "POST",
            { username: username, password: password });
        setLoading(false);
        return apiResponse;
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setLoading(true);
        (signUpMode ? attemptUserCreation() : attemptLogin())
            .then(response => {
                setLoading(false);
                if (response.error) {
                    setErrorMessage(response.error);
                    return;
                }
                if (response.message) {
                    setErrorMessage(response.message);
                    return;
                }
                (signUpMode ? onUserCreated(response) : onUserLogged(response));
                history.push("/");
            });
    }

    return (
        <div className="Portal">
            <div className="mb-2">
                <Button onClick={() => { setSignUpMode(false); setErrorMessage("") }} variant={signUpMode ? "secondary" : "primary"} size="lg" className="TabButton">
                    Login with credentials
                </Button>{' or '}
                <Button onClick={() => { setSignUpMode(true); setErrorMessage("") }} variant={signUpMode ? "primary" : "secondary"} size="lg" className="TabButton">
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
                <Button data-testid="portal-submit" className="SubmitButton" size="lg" type="submit" disabled={!validateForm()}>
                    {signUpMode ? "Sign up" : "Login"}
                </Button>
                {loading ?
                    <div>
                        <Spinner animation="grow" />
                    </div>
                    : <></>}
            </Form>
        </div>
    );
}
