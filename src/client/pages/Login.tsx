import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Request from '../helpers/axios';
import './css/Login.css';

function Login({ setLoggedIn, loggedIn }:loggedIn): JSX.Element {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (evt:React.FormEvent) => {
    evt.preventDefault();
    try {
      await Request({
        method: 'POST',
        url: '/session',
        data: {
          username,
          password,
        },
      });

      setLoggedIn(true);
      history.goBack();
    } catch (err) {
      setError('Ooops there was an error');
    }
  };

  useEffect(() => {
    if (loggedIn) {
      history.push('/session');
    }
  }, []);

  return (
    <div className="page login limit">
      <h1 className="navigationTitle">Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <h3> Username</h3>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        <label htmlFor="password">
          <h3>Password</h3>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {error ? <h4>{error}</h4> : <></>}

        <button type="submit" className="primary-button">Login</button>

        <Link to="/signup">
          <div className="secondary-button">
            Sign Up
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Login;