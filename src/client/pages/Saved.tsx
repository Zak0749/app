import { useEffect, useState } from 'react';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/Saved.css';

type savedType = {
  date: string;
  quiz: quiz;
}

function Saved(): JSX.Element {
  const [saved, setSaved] = useState<savedType[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/saved',
        });

        setSaved(res.data);
      } catch {
        //
      }
    })();
  }, []);

  return (
    <div className="page saved">
      <h1 className="navigationTitle">Saved</h1>

      <div className="grid">{saved ? saved.map((item) => QuizTile(item.quiz)) : <></>}</div>
    </div>
  );
}

export default Saved;
