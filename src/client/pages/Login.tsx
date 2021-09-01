import React, { useContext, useEffect, useState } from 'react';
import {
  Alert, Button, Form, FormGroup, Spinner,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAxios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import themeContext from '../helpers/theme-context';

function Login() {
  const theme = useContext(themeContext);
  const { loggedIn, refresh } = useContext(loggedInContext);
  const [details, setDetails] = useState({ username: '', password: '' });

  const [{ error, loading }, request] = useAxios({
    method: 'POST',
    url: '/session',
    data: details,
  }, { manual: true });

  const history = useHistory();

  useEffect(() => {
    refresh().then(() => {
      if (loggedIn) {
        history.push('/session');
      }
    });
  }, []);

  const submit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await request();
    refresh();
    history.push('/explore');
  };

  return (
    <div role="main" className={`me-auto ms-auto nw-100 h-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg, maxWidth: '500px' }}>
      <h1 className={theme.text}>Login</h1>
      {
        error
          ? (
            <Alert variant="danger">
              There was an error try reloading if this issue persists report it
              {' '}
              <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
            </Alert>
          )
          : <></>
      }
      <Form onSubmit={submit}>
        <FormGroup className="mb-3" controlId="username">
          <Form.Label className={theme.text}>Username</Form.Label>
          <Form.Control className={`${theme.bg} border border-${theme.main}`} type="text" placeholder="Enter username" value={details.username} onChange={(e) => setDetails({ ...details, username: e.target.value })} />
        </FormGroup>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={theme.text}>Password</Form.Label>
          <Form.Control className={`${theme.bg} border border-${theme.main}`} type="password" placeholder="Password" value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} />
        </Form.Group>

        {
          loading
            ? (
              <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )
            : <Button variant="primary" type="submit">Submit</Button>
        }

      </Form>
    </div>
  );
}

export default Login;
