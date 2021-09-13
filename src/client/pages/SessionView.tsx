import { Row, Modal } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { useAxios } from '../helpers/axios';
import { User } from '../..';
import { QuizCard } from '../components/QuizCard';
import loggedInContext from '../helpers/logged-in-context';
import modalContext from '../helpers/modal-context';
import LoginView from './LoginView';

function SessionView() {
  const [{ data, error, loading }] = useAxios<User>({
    method: 'GET',
    url: '/session',
  });

  const { status } = useContext(loggedInContext);
  const [, setModal] = useContext(modalContext);

  useEffect(() => {
    if (!status) {
      setModal({ show: true, element: LoginView });
    }
  }, []);

  if (error || loading || !data) {
    return (
      <></>
    );
  }

  return (
    <Modal.Dialog style={{
      maxWidth: '700px', width: '90%', height: '90%',
    }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          {data.username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ fontSize: '200px' }} className="text-center text-secondary p-3 rounded bg-dark">{data.emoji}</div>
        <div className="p-3 h1">{data.email}</div>
        <div className="p-3 h3">
          You stated quizzin on
          {' '}
          {new Date(data.date).toDateString()}
        </div>
        <Row>
          {
            data.quizzes.map((quiz) => <QuizCard quiz={quiz} />)
          }
        </Row>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default SessionView;
