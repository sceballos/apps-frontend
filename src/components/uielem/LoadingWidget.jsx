import React from 'react';
import { Spinner } from 'react-bootstrap'

function LoadingWidget({isLoading}) {
    return (
        <div>
        {
            isLoading ?
                <Spinner animation = "grow"/> : <></>
        }
        </div >
    );
}

export default LoadingWidget;