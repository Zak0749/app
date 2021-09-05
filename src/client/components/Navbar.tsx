import React, { useContext } from 'react';
import {
  Button,
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SizeMeProps, withSize } from 'react-sizeme';
import { PersonCircle } from 'react-bootstrap-icons';
import loggedInContext from '../helpers/logged-in-context';

function NavigationBar({ size }: SizeMeProps) {
  // Logged in status
  const { status } = useContext(loggedInContext);

  // A logged in button or a profule button depending on the users logged in staus
  const UserButton = () => (status
    ? <LinkContainer to="/session"><Button><PersonCircle /></Button></LinkContainer>
    : <LinkContainer to="/login"><Button variant="primary">Login</Button></LinkContainer>);

  // The navbar
  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
      <Container>
        <Nav>
          <div className="d-flex justify-content-between" style={{ minWidth: '175px' }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
            <LinkContainer to="/explore">
              <Navbar.Brand>Quizzes</Navbar.Brand>
            </LinkContainer>
          </div>
        </Nav>

        {size.width < 575 ? (
          <UserButton />
        ) : <></>}

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
        </Navbar.Collapse>

        {size.width > 575 ? (
          <UserButton />
        ) : <></>}

      </Container>
    </Navbar>
  );
}

export default withSize()(NavigationBar);
