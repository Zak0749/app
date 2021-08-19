import { useEffect, useState } from 'react';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/History.css';

type historyType = {
  quiz: quiz
  date: string
  progresx: number
}

function History(): JSX.Element {
  const [history, setHistory] = useState<historyType[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/history',
        });

        setHistory(res.data);
      } catch {
        //
      }
    })();
  }, []);

  const clearHistory = async () => {
    try {
      if (history) {
        await Promise.all(history.map((his) => Request({
          method: 'DELETE',
          url: '/history',
          data: {
            quizId: his.quiz._id,
          },
        })));

        setHistory([]);
      }
    } catch {
      //
    }
  };

  return (
    <div className="page history">
      <div className="space-between-box">
        <h1 className="navigationTitle">History</h1>
        <button type="button" className="clear-button" onClick={clearHistory}>Clear History</button>
      </div>

      <div className="grid">{history ? history.map((item) => QuizTile(item.quiz)) : <></>}</div>
    </div>
  );
}

export default History;
