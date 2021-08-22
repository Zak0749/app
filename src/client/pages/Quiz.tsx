import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/Quiz.css';
import { Bookmark, BookmarkBorder } from '@material-ui/icons';
import useAxios from '../helpers/axios';
import Play from '../sub-pages/play-quiz/Play';
import Loading from '../components/Loading';
import Error from '../components/Error';
import loggedInContext from '../helpers/logged-in-context';

function Quiz(): JSX.Element {
  const [playing, setPlaying] = useState(false);
  const { id } = useParams() as { id: string };
  const [{ data, loading, error }, reload] = useAxios<quiz>({
    method: 'GET',
    url: `/quiz/${id}`,
  });

  const { loggedIn } = useContext(loggedInContext);

  const [, save] = useAxios({
    method: 'POST',
    url: '/saved',
  }, { manual: true });

  const [, del] = useAxios({
    method: 'DELETE',
    url: '/saved',
  }, { manual: true });

  const saveQuiz = async () => {
    try {
      await save({
        data: {
          quizId: data._id,
        },
      });

      reload();
    } catch {
      //
    }
  };

  const unsaveQuiz = async () => {
    try {
      await del({
        data: {
          quizId: data._id,
        },
      });

      reload();
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

  const SaveButton = data.saved ? <Bookmark className="bookmark-fill" onClick={unsaveQuiz} /> : <BookmarkBorder className="bookmark" onClick={saveQuiz} />;

  return (
    <>
      {
        playing
          ? <Play quiz={data} setPlaying={setPlaying} />
          : (
            <div className="page limit">
              <div className="quiz-emoji">{data.emoji}</div>
              <div className="space-between-box">
                <div className="quiz-title">{data.title}</div>
                <div className="quiz-plays">
                  {data?.plays}
                  {' '}
                  plays
                </div>
              </div>
              <div className="space-between-box">
                <Link to={`/user/${data?.userId}`} className="quiz-username">{data.username}</Link>
                <Link to={`/category/${data?.categoryId}`} className="quiz-category">{data.categoryTitle}</Link>
              </div>

              <div className="quiz-date">
                Posted
                {' '}
                {new Date(data.date).toDateString()}
              </div>

              <div className="quiz-description">{data.description}</div>

              <div className="space-between-box">
                <div className="quiz-questionCount">
                  There are
                  {' '}
                  {data.questions.length}
                  {' '}
                  questions
                </div>

                <div className="save">
                  {
                    loggedIn ? SaveButton : <></>
                  }
                </div>
              </div>
              <button type="button" className="quiz-play-button" onClick={() => setPlaying(true)}>Play</button>

            </div>
          )
      }
    </>
  );
}

export default Quiz;
