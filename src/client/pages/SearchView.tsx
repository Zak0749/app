import { FC, useEffect, useState } from 'react';
import {
  Alert,
  Form, ListGroup, ListGroupItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Quiz, User } from '../..';
import { useAxios } from '../helpers/axios';

const SearchView: FC = () => {
  const [term, setTerm] = useState('');

  const [{ data, error }, fetch] = useAxios<{quizzes: Quiz[], users: User[]}>({
    method: 'GET',
  }, { manual: true });

  const change = async (e: {target: {value: string}}) => {
    setTerm(e.target.value);
    if (e.target.value !== '') fetch({ url: `search/${e.target.value}` });
  };

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  return (
    <div className="p-3">
      {
        error ? (
          <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
            There was an error try reloading if this issue persists report it
            {' '}
            <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
          </Alert>

        ) : <></>
      }
      <h1>Search</h1>
      <Form.Control type="text" placeholder="Search..." onChange={change} value={term} />

      {
        data ? (
          <>
            <ListGroup>
              {
                data.quizzes.map((quiz) => (
                  <Link to={`/quiz/${quiz._id}`} className="text-decoration-none">
                    <ListGroupItem action variant="dark">{quiz.title}</ListGroupItem>
                  </Link>
                ))
              }
            </ListGroup>

            <ListGroup>
              {
                data.users.map((user) => (
                  <Link to={`/user/${user.userId}`} className="text-decoration-none">
                    <ListGroupItem action variant="dark">{user.username}</ListGroupItem>
                  </Link>
                ))
              }
            </ListGroup>
          </>
        )
          : <></>
      }
    </div>
  );
};

export default SearchView;
