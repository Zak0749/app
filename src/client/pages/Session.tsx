import useAxios from 'axios-hooks';
import React, { useContext, useEffect } from 'react';
import { Alert, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { User } from '../..';
import { QuizItem } from '../components/QuizItem';
import loggedInContext from '../helpers/logged-in-context';
import themeContext from '../helpers/theme-context';

function Session() {
  const theme = useContext(themeContext);
  const { loggedIn, refresh } = useContext(loggedInContext);
  const history = useHistory();

  const [{ data, error, loading }] = useAxios<User>({
    method: 'GET',
    url: '/session',
  });

  useEffect(() => {
    refresh()
      .then(() => {
        if (!loggedIn) {
          history.push('/login');
        }
      });
  });

  if (loading) {
    return (
      <div role="main" className={`h-100 w-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg }}>
        e
      </div>
    );
  }

  return (
    <div role="main" className={`h-100 w-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg }}>
      {
        error
          ? (
            <Alert variant="danger">
              There was an error try reloading if this issue persists report it
              {' '}
              <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
            </Alert>
          )
          : <></>
      }
      <div className="">{data.emoji}</div>
      <div className="">{data.username}</div>
      <div className="">{data.email}</div>
      <div className="">
        Account created
        {' '}
        {new Date(data.date).toISOString()}
      </div>

      <Row>
        {data.quizzes.map((quiz) => <QuizItem quiz={quiz} />)}
      </Row>
    </div>
  );
}

export default Session;
