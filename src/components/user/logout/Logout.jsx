import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Logout({ loggedUser, onUserLoggedOut }) {
    const history = useHistory();
    useEffect(() => {
        const logoutUser = async (user) => {
            const data = await fetch('http://localhost:5880/apps');
            const json = await data.json();
            onUserLoggedOut();
        }
        setTimeout(function() {
            logoutUser(loggedUser);
            history.push("/");
        }, 2000);        
    }, [])

    return (
        <div className="alert alert-info" role="alert">
            Goodbye! You are being logged out.
        </div>
    );
}
export default Logout;