import React, { useContext, useEffect, useState } from 'react';
import { Alert, Placeholder } from 'react-bootstrap';
import { BookmarkFill, Bookmark } from 'react-bootstrap-icons';
import { Link, useParams } from 'react-router-dom';
import { Quiz } from '../..';
import { useAxios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';

// eslint-disable-next-line no-unused-vars
function PlaceholderView() {
  return (
    <>

      <Placeholder animation="glow"><div className="mw-80 text-center  rounded"><Placeholder className="w-100 h-100" style={{ minHeight: '350px' }} /></div></Placeholder>

      <Placeholder animation="glow">
        <div className="d-flex justify-content-between py-2">
          <Placeholder className="fs-1 fw-bold" xs={8} />
          <Placeholder className="align-middle d-flex align-items-center" xs={1} />
        </div>
      </Placeholder>

      <Placeholder animation="glow">
        <div className="d-flex justify-content-between py-2 fs-3">
          <Placeholder xs={3} />
          <Placeholder xs={3} />
        </div>
      </Placeholder>

      <Placeholder animation="glow">
        <div className="py-2">
          <Placeholder xs={6} />
        </div>
      </Placeholder>

      <Placeholder animation="glow">
        <div className="py-2">
          <Placeholder xs={3} />
          {' '}
          <Placeholder xs={4} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={3} />
          {' '}
          <Placeholder xs={4} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={5} />
          {' '}
          <Placeholder xs={3} />
          {' '}
          <Placeholder xs={4} />
          {' '}
          <Placeholder xs={5} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={5} />
          {' '}
          <Placeholder xs={3} />
          {' '}
          <Placeholder xs={4} />
          {' '}
          <Placeholder xs={1} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={5} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={3} />
          {' '}
          <Placeholder xs={4} />
          {' '}
          <Placeholder xs={5} />
          {' '}
          <Placeholder xs={2} />
          {' '}
          <Placeholder xs={1} />
          {' '}
        </div>
      </Placeholder>

      <Placeholder>
        <div className="d-flex justify-content-between py-2">
          <Placeholder xs={12} />
          <Placeholder xs={1} />
        </div>
      </Placeholder>
    </>
  );
}

function QuizView() {
  // The id provided in the url
  const { id } = useParams<{ id: string }>();

  // The logged in statues of the user
  const { status } = useContext(loggedInContext);

  // The results of getting the quiz
  const [{ error, loading, data }, refresh] = useAxios<Quiz>({
    method: 'GET',
    url: `/quiz/${id}`,
  });

  // Save the quiz
  const [{ error: saveErr }, save] = useAxios({
    method: 'POST',
    url: '/saved',
    data: {
      quizId: id,
    },
  }, { manual: true });

  // Remove the quiz from saved
  const [{ error: unsaveErr }, unsave] = useAxios({
    method: 'DELETE',
    url: '/saved',
    data: {
      quizId: id,
    },
  }, { manual: true });

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // Handles the state of the info alert
  const [showInfoAlert, setInfoAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error || saveErr || unsaveErr) {
      setErrAlert(true);
    }
  }, [error, saveErr, unsaveErr]);

  if (error || loading) {
    return (
      <div className="p-3 mx-auto" style={{ maxWidth: '500px' }}>
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
        </Alert>
        <PlaceholderView />
      </div>
    );
  }

  return (
    <div className="p-3 mx-auto" style={{ maxWidth: '500px' }}>
      <Alert show={showInfoAlert} variant="info" onClose={() => { setInfoAlert(false); }} dismissible>
        To save quizzes you need to login use the button in the top right.
      </Alert>
      <Alert show={showErrAlert} variant="info" onClose={() => { setErrAlert(false); }} dismissible>
        There was a problem with saving/unsaving the quiz please reaload and try again if this issue persists report it
        {' '}
        <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
        .
      </Alert>
      <div className="bg-dark rounded text-center" style={{ fontSize: '250px' }}>{data.emoji}</div>
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
        <div>
          There are
          {' '}
          {data.questions.length}
          {' '}
          questions
        </div>

        <div>
          {
            data.saved
              ? (
                <BookmarkFill onClick={() => {
                  if (!status) {
                    setInfoAlert(true);
                    return;
                  }

                  unsave().then(() => refresh());
                }}
                />
              )
              : (
                <Bookmark onClick={() => {
                  if (!status) {
                    setInfoAlert(true);
                    return;
                  }

                  save().then(() => refresh());
                }}
                />
              )
          }
        </div>
      </div>
    </div>
  );
}

export default QuizView;
