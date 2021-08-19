import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/Session.css';

function Session({ setLoggedIn, loggedIn }: loggedIn): JSX.Element {
  const [self, setSelf] = useState<user | undefined>();
  const history = useHistory();
  useEffect(() => {
    if (!loggedIn) {
      history.push('/login');
    }

    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/session',
        });

        setSelf(res.data);
      } catch (err) {
        history.push('/login');
      }
    })();
  }, []);

  const logOut = async () => {
    try {
      Request({
        method: 'DELETE',
        url: '/session',
      });

      history.push('/login');
      setLoggedIn(false);
    } catch {
      //
    }
  };

  return (
    <div className="page session limit">
      <div className="emoji">{self?.emoji}</div>
      <div className="username">{self?.username}</div>
      <div className="email">{self?.email}</div>
      <div className="date">
        You started playing
        {' '}
        {self ? new Date(self.date).toDateString() : ''}
      </div>
      <div>{self?.quizzes?.map((quiz) => QuizTile(quiz))}</div>

      <button className="logout" type="button" onClick={logOut}>
        Logout
      </button>
    </div>
  );
}

export default Session;
