import useAxios from 'axios-hooks';
import React, { useContext, useEffect } from 'react';
import { Alert, Placeholder, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { User } from '../..';
import { QuizItem, QuizItemPlaceholder } from '../components/QuizItem';
import loggedInContext from '../helpers/logged-in-context';
import themeContext from '../helpers/theme-context';

function Session() {
  const theme = useContext(themeContext);
  const { loggedIn, refresh } = useContext(loggedInContext);
  const history = useHistory();

  const [{ data, error, loading }] = useAxios<User>({
    method: 'GET',
    url: '/api/session',
  });

  useEffect(() => {
    refresh()
      .then(() => {
        if (!loggedIn) {
          history.push('/login');
        }
      });
  }, []);

  if (loading) {
    return (
      <div role="main" className={`me-auto ms-auto nw-100 h-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg, maxWidth: '500px' }}>
        <Placeholder animation="glow"><div className="me-auto ms-auto mw-80 text-center bg-light border rounded"><Placeholder className="w-100 h-100" style={{ minHeight: '200px' }} /></div></Placeholder>
        <Placeholder animation="glow"><div className="fs-1"><Placeholder xs={8} /></div></Placeholder>
        <Placeholder animation="glow"><div className="pt-2 fs-4"><Placeholder xs={10} /></div></Placeholder>
        <Placeholder animation="glow"><div className="pt-2 fs-4"><Placeholder xs={12} /></div></Placeholder>
        <Row>{Array.from(Array(10).keys()).map(() => <QuizItemPlaceholder />)}</Row>
      </div>
    );
  }

  return (
    <div role="main" className={`nw-100 h-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg }}>
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
      <div className="me-auto ms-auto" style={{ maxWidth: '500px' }}>
        <div className="me-auto ms-auto mw-80 text-center bg-light border rounded" style={{ fontSize: '200px' }}>{data.emoji}</div>
        <div className="fs-1">{data.username}</div>
        <div className="pt-2 fs-4">{data.email}</div>
        <div className="pt-2 fs-4">
          Account created
          {' '}
          {new Date(data.date).toDateString()}
        </div>
      </div>

      <Row className="pt-5">
        {data.quizzes.map((quiz) => <QuizItem quiz={quiz} />)}
      </Row>
    </div>
  );
}

export default Session;
