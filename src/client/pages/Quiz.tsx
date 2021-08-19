import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './css/Quiz.css';
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import Request from '../helpers/axios';
import Play from '../sub-pages/play-quiz/Play';

function Quiz(): JSX.Element {
  const [quiz, setQuiz] = useState<quiz | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const { id } = useParams() as {id:string};

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: `/quiz/${id}`,
        });

        setQuiz(res.data);
      } catch (err) {
        //
      }
    })();
  }, []);

  const saveQuiz = async () => {
    if (quiz) {
      try {
        await Request({
          method: 'POST',
          url: '/saved',
          data: {
            quizId: quiz._id,
          },
        });

        setQuiz({
          ...quiz,
          saved: true,
        });
      } catch {
        //
      }
    }
  };

  const unsavedQuiz = async () => {
    if (quiz) {
      try {
        await Request({
          method: 'DELETE',
          url: '/saved',
          data: {
            quizId: quiz._id,
          },
        });

        setQuiz({
          ...quiz,
          saved: false,
        });
      } catch {
        //
      }
    }
  };

  return (
    <>
      {
        playing
          ? <Play quiz={quiz} setPlaying={setPlaying} />
          : (
            <div className="page limit">
              <div className="quiz-emoji">{quiz?.emoji}</div>
              <div className="space-between-box">
                <div className="quiz-title">{quiz?.title}</div>
                <div className="quiz-plays">
                  {quiz?.plays}
                  {' '}
                  plays
                </div>
              </div>
              <div className="space-between-box">
                <Link to={`/user/${quiz?.userId}`} className="quiz-username">{quiz?.username}</Link>
                <Link to={`/category/${quiz?.categoryId}`} className="quiz-category">{quiz?.categoryTitle}</Link>
              </div>

              <div className="quiz-date">
                Posted
                {' '}
                {quiz ? new Date(quiz.date).toDateString() : ''}
              </div>

              <div className="quiz-description">{quiz?.description}</div>

              <div className="space-between-box">
                <div className="quiz-questionCount">
                  There are
                  {' '}
                  {quiz?.questions.length}
                  {' '}
                  questions
                </div>

                <div className="save">
                  {
                    quiz?.saved ? <BsBookmarkFill className="bookmark-fill" onClick={unsavedQuiz} /> : <BsBookmark className="bookmark" onClick={saveQuiz} />

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
