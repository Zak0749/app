import { useContext } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import './css/Saved.css';

type savedType = {
  date: string;
  quiz: quiz;
}

function Saved(): JSX.Element {
  const [{ data, loading, error }] = useAxios<savedType[]>({
    method: 'GET',
    url: '/saved',
  });

  const { loggedIn } = useContext(loggedInContext);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!loggedIn) {
    return <div className="page">To access the ablity to save quizzes you need to login</div>;
  }

  return (
    <div className="page saved">
      <h1 className="navigationTitle">Saved</h1>

      <div className="grid">{data.map((item) => QuizTile(item.quiz))}</div>
    </div>
  );
}

export default Saved;
