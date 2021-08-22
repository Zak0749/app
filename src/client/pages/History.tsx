import { useContext } from 'react';
import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import './css/History.css';

type historyType = {
  quiz: quiz
  date: string
  progresx: number
}

function History(): JSX.Element {
  const [{ data, loading, error }] = useAxios<historyType[]>({
    method: 'GET',
    url: '/history',
  });

  const { loggedIn } = useContext(loggedInContext);

  const [, del] = useAxios({
    method: 'DELETE',
    url: '/history',
  }, { manual: true });

  const clearHistory = async () => {
    try {
      Promise.all(data.map((history) => del({ data: { quizId: history.quiz._id } })));
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

  if (!loggedIn) {
    return <div className="page">To access the ablity to store and see history you need to login</div>;
  }

  return (
    <div className="page history">
      <div className="space-between-box">
        <h1 className="navigationTitle">History</h1>
        <button type="button" className="clear-button" onClick={clearHistory}>Clear History</button>
      </div>

      <div className="grid">{data.map((item) => QuizTile(item.quiz))}</div>
    </div>
  );
}

export default History;
