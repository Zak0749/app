import React, { useContext } from 'react';
import {
  Button,
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SizeMeProps, withSize } from 'react-sizeme';
import { PersonCircle } from 'react-bootstrap-icons';
import loggedInContext from '../helpers/logged-in-context';
import modalContext from '../helpers/modal-context';
import LoginView from '../pages/LoginView';
import SessionView from '../pages/SessionView';

function NavigationBar({ size }: SizeMeProps) {
  // Logged in status
  const { status } = useContext(loggedInContext);
  const [, setModal] = useContext(modalContext);

  // A logged in button or a profule button depending on the users logged in staus
  const UserButton = () => (status
    ? <Button variant="primary" onClick={() => setModal({ show: true, element: SessionView })}><PersonCircle /></Button>
    : <Button variant="primary" onClick={() => setModal({ show: true, element: LoginView })}>Login</Button>
  );

  // The navbar
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
      <Container>
        <Nav>
          <div className="d-flex justify-content-between" style={{ minWidth: '175px' }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0" />
            <LinkContainer to="/explore">
              <Navbar.Brand>Quizzes</Navbar.Brand>
            </LinkContainer>
          </div>
        </Nav>

        {size.width < 768 ? (
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

            <LinkContainer to="/search">
              <Nav.Link>Search</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>

        {size.width >= 768 ? (
          <UserButton />
        ) : <></>}

      </Container>
    </Navbar>
  );
}

export default withSize()(NavigationBar);
