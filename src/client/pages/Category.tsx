import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizTile from '../components/QuizTile';
import './css/Category.css';
import Request from '../helpers/axios';

function Category(): JSX.Element {
  const [category, setCategory] = useState<category | undefined>(undefined);
  const { id } = useParams() as {id:string};
  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: `/category/${id}`,
        });
        setCategory(res.data);
      } catch (err) {
        // console.log(err);
      }
    })();
  }, []);

  return (
    <div className="page">
      <h1 className="navigationTitle">{category?.title}</h1>
      <div className="grid">
        {category?.quizzes.map((quiz) => QuizTile(quiz))}
      </div>
    </div>
  );
}

export default Category;
