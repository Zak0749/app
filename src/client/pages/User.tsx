import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import './css/User.css';

function User(): JSX.Element {
  const { id } = useParams() as { id: string };
  const [{ data, loading, error }] = useAxios<user>({
    method: 'GET',
    url: `/user/${id}`,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="page user limit">
      <div className="emoji">{data.emoji}</div>
      <div className="username">{data.username}</div>
      <div className="date">
        Account Created
        {' '}
        {new Date(data.date).toDateString()}

      </div>
      <div>{data.quizzes.map((quiz) => QuizTile(quiz))}</div>
    </div>
  );
}

export default User;
