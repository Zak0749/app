import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import './css/Category.css';

function Category(): JSX.Element {
  const { id } = useParams() as {id:string};
  const [{ data, loading, error }] = useAxios<category>({
    method: 'GET',
    url: `/category/${id}`,
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="page category">
      <h1 className="navigationTitle">{data?.title}</h1>
      <div className="grid">
        {data.quizzes.map((quiz) => QuizTile(quiz))}
      </div>
    </div>
  );
}

export default Category;
