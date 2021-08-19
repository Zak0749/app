import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Request from '../helpers/axios';
import './css/SignUp.css';

function SignUp(): JSX.Element {
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfimPass] = useState('');
  const [email, setEmail] = useState('');
  const [emoji, setEmoji] = useState('');
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (evt:React.FormEvent) => {
    evt.preventDefault();
    try {
      const res = await Request({
        method: 'post',
        url: '/user',
        data: {
          username, email, password, emoji,
        },
      });

      if (res.status === 201) {
        history.push('/login');
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="page signup limit">
      <h1 className="navigationTitle">Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <h3 className="text-box-label">Email</h3>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label htmlFor="username">
          <h3 className="text-box-label">Username</h3>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>

        <label htmlFor="password">
          <h3 className="text-box-label">Password</h3>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        </label>

        <label htmlFor="password">
          <h3 className="text-box-label">Confirm Password</h3>
          <input type="password" id="password" name="password" value={confirmPass} onChange={(e) => setConfimPass(e.target.value)} required />

        </label>

        <label htmlFor="emoji">
          <h3 className="text-box-label">Profile Emoji</h3>
          <input className="emojiPicker" type="text" id="emoji" name="emoji" value={emoji} onChange={(e) => setEmoji(e.target.value)} required maxLength={1} />
        </label>

        {error ? <h4>There was an error</h4> : <></>}

        <button type="submit" className="primary-button">Go!</button>
      </form>

    </div>
  );
}

export default SignUp;
