import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
function MainNavBar({ loggedUser }) {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>Apps Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>                    
                        {loggedUser ? <Nav.Link as={Link} to="/create">Add App</Nav.Link> : <></>}
                        {loggedUser ? <Nav.Link as={Link} to="/logout">Logout</Nav.Link> :
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default MainNavBar;