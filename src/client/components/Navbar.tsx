import React, { useContext } from 'react';
import {
  Button,
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { SizeMeProps, withSize } from 'react-sizeme';
import { PersonCircle } from 'react-bootstrap-icons';
import loggedInContext from '../helpers/logged-in-context';
import themeContext from '../helpers/theme-context';

function NavigationBar({ size }: SizeMeProps) {
  const theme = useContext(themeContext);
  const { loggedIn } = useContext(loggedInContext);

  const UserButton = () => (loggedIn
    ? <LinkContainer to="/session"><Button><PersonCircle /></Button></LinkContainer>
    : <LinkContainer to="/login"><Button variant="primary">Login</Button></LinkContainer>);

  return (
    <Navbar collapseOnSelect expand="sm" bg={theme.main} variant={theme.main}>
      <Container>
        <Nav>
          <div style={{ display: 'flex', justifyContent: 'space-between', minWidth: '175px' }}>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
