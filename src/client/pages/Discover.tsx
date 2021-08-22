import Error from '../components/Error';
import FeaturedTile from '../components/FeaturedTile';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
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
  const [{ data, loading, error }] = useAxios<DisoverData>({
    method: 'GET',
    url: '/discover',
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="page discover">
      <h1 className="navigationTitle">Discover</h1>
      <h2>Featured</h2>
      <FeaturedRow quizzes={data.featured} />
      {
        data.forYou
          ? (
            <div className="forYou">
              <h2>ForYou</h2>
              <QuizRow quizzes={data.forYou} />
            </div>
          ) : <></>
      }
      <h2>Popular</h2>
      <QuizRow quizzes={data.popular} />
    </div>
  );
}

export default Discover;
