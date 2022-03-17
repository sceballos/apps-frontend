import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import {
    Link
} from "react-router-dom";
function MainNavBar({ loggedIn }) {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#home">Apps Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>

                        {loggedIn ? <Nav.Link><Link to="/create">Add App</Link></Nav.Link> : <></>}

                        {loggedIn ? <Nav.Link><Link to="/logout">Logout</Link></Nav.Link> :
                            <Nav.Link><Link to="/login">Login</Link></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default MainNavBar;