import { useEffect, useState } from 'react';
import { Alert, Placeholder, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { User } from '../..';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';
import { useAxios } from '../helpers/axios';

function UserView(): JSX.Element {
  // The Id provided in the URL
  const { id } = useParams<{ id: string }>();

  // The results of getting the user
  const [{ data, error, loading }] = useAxios<User>({
    method: 'GET',
    url: `/user/${id}`,
  });

  // Handles the state of the info alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  if (loading || error) {
    return (
      <div className="p-3 mx-auto" style={{ maxWidth: '500px' }}>
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
        </Alert>
        <Placeholder animation="glow"><div className="mw-80 text-center  rounded"><Placeholder className="w-100 h-100" style={{ minHeight: '350px' }} /></div></Placeholder>
        <Placeholder className="my-2 fs-1 fw-bold" xs={8} />
        <Placeholder animation="glow">
          <div className="m= y-2">
            <Placeholder xs={6} />
          </div>
        </Placeholder>

        <Row>{Array.from(Array(20).keys()).map(() => <QuizCardPlaceholder />)}</Row>
      </div>
    );
  }

  return (
    <div className="p-3 mx-auto" style={{ maxWidth: '500px' }}>
      <div className="bg-dark rounded text-center" style={{ fontSize: '250px' }}>{data.emoji}</div>
      <div className="fs-1 py-2 fw-bold">{data.username}</div>
      <div className="py-2">
        Account Created
        {' '}
        {new Date(data.date).toDateString()}
      </div>

      <Row>
        {data.quizzes.map((quiz) => <QuizCard quiz={quiz} />)}
      </Row>
    </div>
  );
}

export default UserView;
