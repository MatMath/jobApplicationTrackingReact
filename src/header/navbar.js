// https://react-bootstrap.github.io/components/
import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';

function TopNavBar() {
  return (
    <Navbar bg="light" expand="lg" className="container">
    <Navbar.Brand href="#home">New Job</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#joblist">Job list</Nav.Link>
        <Nav.Link href="#cie">Companies</Nav.Link>
        <Nav.Link href="#graph">Graph</Nav.Link>
      </Nav>
      <Form inline>
        <Button variant="light">Logout</Button>
      </Form>
    </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNavBar;
