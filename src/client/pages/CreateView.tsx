import {
  FC, useContext, useEffect, useState,
} from 'react';
import {
  Alert, Modal, Button, Row, Badge,
} from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { useAxios } from '../helpers/axios';
import { Draft, User } from '../..';
import { QuizCard } from '../components/QuizCard';
import loggedInContext from '../helpers/logged-in-context';
import EditorView from './EditorView';

const DraftRow: FC<{ draft: Draft }> = ({ draft }) => (
  <></>
);

const CreateView: FC = () => {
  const [{ data: user, error: publishedErr, loading: publishedLoading }] = useAxios<User>({
    method: 'GET',
    url: '/session',
  });

  const [{ data: drafts, error: draftErr, loading: draftLoading }] = useAxios<Draft[]>({
    method: 'GET',
    url: '/drafts',
  });

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (draftErr || publishedErr) {
      setErrAlert(true);
    }
  }, [draftErr, publishedErr]);

  const { status } = useContext(loggedInContext);

  const [showInfoAlert, setInfoAlert] = useState(false);

  const [showEditor, setEditor] = useState(false);

  if (!status) {
    return (
      <div className="p-3">
        <Alert show={showInfoAlert} variant="info" onClose={() => { setInfoAlert(false); }} dismissible>
          To save and see your saved quizzes you need to login use button in to left
        </Alert>
        <h1>Create</h1>
      </div>
    );
  }

  if (draftErr || publishedErr || publishedLoading || draftLoading) {
    return (
      <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
        There was an error try reloading if this issue persists report it
        {' '}
        <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
      </Alert>
    );
  }

  return (
    <div className="p-3">
      <h1 className="d-flex justify-content-between">
        <div>Create</div>
        <Badge bg="primary"><PlusLg onClick={() => setEditor(true)} /></Badge>
      </h1>
      <h3>Published</h3>
      <Row className="flex-nowrap overflow-scroll">
        {user.quizzes.map((quiz) => <QuizCard quiz={quiz} />)}
      </Row>
      <h3>Drafts</h3>
      <Modal
        show={showEditor}
        onHide={() => setEditor(false)}
        dialogAs={() => (
          <EditorView editing={{
            emoji: '',
            title: '',
            description: '',
            categoryId: '',
            questions: [],
          }}
          />
        )}
      />
    </div>
  );
};

export default CreateView;
