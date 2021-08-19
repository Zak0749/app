import { useEffect, useState } from 'react';
import FeaturedTile from '../components/FeaturedTile';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/Discover.css';

type DisoverData = {
  featured: quiz[],
  popular: quiz[],
  forYou?: quiz[]
}

function QuizRow({ quizzes }: {quizzes: quiz[] | undefined}): JSX.Element {
  return (
    quizzes
      ? (
        <div className="quiz-tile-row">
          {quizzes.map((quiz) => QuizTile(quiz))}
        </div>
      ) : <></>
  );
}

function FeaturedRow({ quizzes }: {quizzes: quiz[] | undefined}): JSX.Element {
  return (
    quizzes
      ? (
        <div className="quiz-tile-row">
          {quizzes.map((quiz) => FeaturedTile({ quiz }))}
        </div>
      ) : <></>
  );
}

function Discover(): JSX.Element {
  const [discover, setDiscover] = useState<DisoverData | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/discover',
        });

        setDiscover(res.data);
      } catch {
        //
      }
    })();
  }, []);
  return (
    <div className="page discover">
      <h1 className="navigationTitle">Discover</h1>
      <h2>Featured</h2>
      <FeaturedRow quizzes={discover?.featured} />
      {
        discover?.forYou
          ? (
            <div className="forYou">
              <h2>ForYou</h2>
              <QuizRow quizzes={discover.forYou} />
            </div>
          ) : <></>
      }
      <h2>Popular</h2>
      <QuizRow quizzes={discover?.popular} />
    </div>
  );
}

export default Discover;
