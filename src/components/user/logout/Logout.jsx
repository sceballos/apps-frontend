import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import baseRequest from '../../../repository/api/API';

function Logout({ loggedUser, onUserLoggedOut }) {
    const history = useHistory();
    useEffect(() => {
        const logoutUser = async (user) => {
            const fakeLogoutRequest = await baseRequest("/apps");
            onUserLoggedOut();
        }
        setTimeout(function() {
            logoutUser(loggedUser);
            history.push("/");
        }, 1000);        
    }, [])

    return (
        <div className="alert alert-info" role="alert">
            Goodbye {loggedUser.username}! You are being logged out.
        </div>
    );
}
export default Logout;