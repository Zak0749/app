import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import './css/Session.css';

function Session(): JSX.Element {
  const [{ data, loading, error }] = useAxios<user>({
    method: 'GET',
    url: '/session',
  });

  const { loggedIn, setLoggedIn } = useContext(loggedInContext);

  const [, del] = useAxios({
    method: 'DELETE',
    url: '/session',
  }, { manual: false });

  const history = useHistory();
  useEffect(() => {
    if (!loggedIn) {
      history.push('/login');
    }
  }, []);

  const logOut = async () => {
    try {
      del();
      history.push('/login');
      setLoggedIn(false);
    } catch {
      //
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="page session limit">
      <div className="emoji">{data.emoji}</div>
      <div className="username">{data.username}</div>
      <div className="email">{data.email}</div>
      <div className="date">
        You started playing
        {' '}
        {new Date(data.date).toDateString()}
      </div>
      <div>{data.quizzes.map((quiz) => QuizTile(quiz))}</div>

      <button className="logout" type="button" onClick={logOut}>
        Logout
      </button>
    </div>
  );
}

export default Session;
