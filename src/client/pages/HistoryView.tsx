import { useContext, useEffect, useState } from 'react';
import { Alert, Row, Button } from 'react-bootstrap';
import { axios, useAxios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';
import { Quiz } from '../..';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';

type Saved = {
  date: string;
  progress: number;
  quiz: Quiz;
}

function HistoryView() {
  const { status } = useContext(loggedInContext);

  const [{ error, loading, data }, refresh] = useAxios<Saved[]>({
    method: 'GET',
    url: '/history',
  });

  // Handles the state of the info alert
  const [showInfoAlert, setInfoAlert] = useState(false);

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    refresh();
    if (error && status) {
      setErrAlert(true);
    }
  }, [error]);

  useEffect(() => {
    if (!status) {
      setInfoAlert(true);
    }
  }, [status]);

  const clear = async () => {
    await Promise.all(data.map((his) => axios({
      method: 'DELETE',
      url: '/history',
      data: {
        quizId: his.quiz._id,
      },
    })));

    refresh();
  };

  if (!status) {
    return (
      <div className="p-3">
        <Alert show={showInfoAlert} variant="info" onClose={() => { setInfoAlert(false); }} dismissible>
          To see your history quizzes you need to login use button in the top left
        </Alert>
        <h1>History</h1>
      </div>
    );
  }

  if (error || loading) {
    return (
      <div className="p-3">
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
        </Alert>
        <h1>History</h1>
        <Row>
          {Array.from(Array(20).keys()).map(() => <QuizCardPlaceholder />)}
        </Row>
      </div>
    );
  }

  return (
    <div className="p-3">

      <div className="d-flex justify-content-between">
        <h1>History</h1>
        <Button onClick={clear}>Clear</Button>
      </div>
      <Row>
        {data.map((saved) => <QuizCard quiz={saved.quiz} />)}
      </Row>
    </div>
  );
}

export default HistoryView;
