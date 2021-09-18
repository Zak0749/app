import {
  Row, Modal, Placeholder, Alert,
} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useAxios } from '../helpers/axios';
import { User } from '../..';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';
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

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  if (loading || error) {
    return (
      <Modal.Dialog style={{
        maxWidth: '700px', width: '90%', minHeight: '90%',
      }}
      >
        <Modal.Header closeButton>
          <Placeholder as={Modal.Title} animation="glow">
            <Placeholder xs={8} />
          </Placeholder>
        </Modal.Header>
        <Modal.Body>
          <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
            There was an error try reloading if this issue persists report it
            {' '}
            <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
          </Alert>
          <Placeholder animation="glow"><div style={{ fontSize: '200px' }} className="text-center text-secondary p-3 rounded bg-dark"><Placeholder xs={9} /></div></Placeholder>
          <Placeholder animation="glow"><div className="p-3 h1"><Placeholder xs={6} /></div></Placeholder>
          <Placeholder animation="glow">
            <div className="p-3 h3">
              <Placeholder xs={2} />
              <Placeholder xs={3} />
              <Placeholder xs={4} />
              <Placeholder xs={5} />
              <Placeholder xs={2} />
            </div>
          </Placeholder>
          <Row>
            {Array.from(Array(10).keys()).map(() => <QuizCardPlaceholder />)}
          </Row>
        </Modal.Body>
      </Modal.Dialog>
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
