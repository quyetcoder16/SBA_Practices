import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Orchid Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
