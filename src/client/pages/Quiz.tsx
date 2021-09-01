import React, { useContext } from 'react';
import { Alert, Placeholder } from 'react-bootstrap';
import { Bookmark, BookmarkFill } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom';
import { Quiz } from '../..';
import { useAxios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import themeContext from '../helpers/theme-context';

function QuizView() {
  const { id } = useParams<{ id: string }>();

  const { loggedIn } = useContext(loggedInContext);
  const theme = useContext(themeContext);

  const [{ data, error, loading }, refresh] = useAxios<Quiz>({
    method: 'get',
    url: `/quiz/${id}`,
  });

  const [{ error: saveErr }, save] = useAxios({
    method: 'POST',
    url: '/saved',
    data: {
      quizId: id,
    },
  });

  const [{ error: unsaveErr }, unsave] = useAxios({
    method: 'DELETE',
    url: '/saved',
    data: {
      quizId: id,
    },
  });

  if (loading) {
    return (
      <div style={{ backgroundColor: theme.mainBg }}>
        <div className="p-3 me-auto ms-auto">
          <Placeholder animation="glow"><div className="me-auto ms-auto mw-80 text-center bg-light border rounded"><Placeholder className="w-100 h-100" style={{ minHeight: '200px' }} /></div></Placeholder>

          <Placeholder animation="glow">
            <div className="d-flex justify-content-between py-2">
              <div className="fs-1 fw-bold"><Placeholder xs={10} /></div>
              <div className="align-middle d-flex align-items-center">
                <Placeholder xs={10} />
              </div>
            </div>
          </Placeholder>

          <Placeholder animation="glow">
            <div className="d-flex justify-content-between py-2">
              <Placeholder xs={10} />
              <Placeholder xs={10} />
            </div>
          </Placeholder>

          <Placeholder>
            <div className="py-2">
              <Placeholder xs={12} />
            </div>
          </Placeholder>

          <Placeholder>
            <div className="py-2">
              <Placeholder xs={6} />
              <Placeholder xs={7} />
              <Placeholder xs={4} />
              <Placeholder xs={5} />
              <Placeholder xs={8} />
              <Placeholder xs={5} />
              <Placeholder xs={2} />
              <Placeholder xs={10} />
              <Placeholder xs={4} />
              <Placeholder xs={5} />
              <Placeholder xs={8} />
              <Placeholder xs={9} />
              <Placeholder xs={6} />
              <Placeholder xs={7} />
              <Placeholder xs={4} />
              <Placeholder xs={5} />
              <Placeholder xs={8} />
              <Placeholder xs={5} />
              <Placeholder xs={2} />
              <Placeholder xs={10} />
              <Placeholder xs={4} />
              <Placeholder xs={5} />
              <Placeholder xs={8} />
              <Placeholder xs={9} />
            </div>
          </Placeholder>

          <Placeholder>
            <div className="d-flex justify-content-between py-2">
              <Placeholder xs={12} />
              <Placeholder xs={1} />
            </div>
          </Placeholder>
        </div>
      </div>
    );
  }

  const SaveButton = data.saved ? <BookmarkFill className="bookmark-fill" onClick={() => { unsave().then(() => refresh()); }} /> : <Bookmark className="bookmark" onClick={() => { save().then(() => refresh()); }} />;

  return (
    <div style={{ backgroundColor: theme.mainBg }}>
      <div className={`p-3 me-auto ms-auto ${theme.text}`} style={{ maxWidth: '500px' }}>
        {
          error || saveErr || unsaveErr
            ? (
              <Alert variant="danger">
                There was an error try reloading if this issue persists report it
                {' '}
                <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
              </Alert>
            )
            : <></>
        }
        <div className={`${theme.bg} rounded text-center`} style={{ fontSize: '250px' }}>{data.emoji}</div>
        <div className="d-flex justify-content-between py-2">
          <div className="fs-1 fw-bold">{data.title}</div>
          <div className="align-middle d-flex align-items-center">
            {data?.plays}
            {' '}
            plays
          </div>
        </div>

        <div className="d-flex justify-content-between py-2">
          <Link to={`/user/${data?.userId}`} className="">{data.username}</Link>
          <Link to={`/category/${data?.categoryId}`} className="">{data.categoryTitle}</Link>
        </div>

        <div className="py-2">
          Posted
          {' '}
          {new Date(data.date).toDateString()}
        </div>

        <div className="py-2">{data.description}</div>

        <div className="d-flex justify-content-between py-2">
          <div className={theme.text}>
            There are
            {' '}
            {data.questions.length}
            {' '}
            questions
          </div>

          <div className="text-primary">
            {
              loggedIn ? SaveButton : <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizView;
