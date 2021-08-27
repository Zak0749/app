import React from 'react';
import {
  Button,
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/explore">
          <Navbar.Brand>Quizzes</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/explore">
              <Nav.Link>Explore</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/create">
              <Nav.Link>Create</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Library" id="collasible-nav-dropdown">
              <LinkContainer to="/saved">
                <NavDropdown.Item>
                  Saved
                </NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to="/history">
                <NavDropdown.Item>
                  History
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to="/categories">
              <Nav.Link>Categories</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/login">
              <Button variant="primary">Login</Button>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
