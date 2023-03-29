import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import Gif from './Gif';
function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/path/to/your/logo.png"
            height="30"
            className="d-inline-block align-top"
            alt="Your Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="mx-auto">
            <Gif/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;