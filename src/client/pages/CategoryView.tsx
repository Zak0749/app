import { useEffect, useState } from 'react';
import { Alert, Placeholder, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Category } from '../..';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';
import { useAxios } from '../helpers/axios';

function CategoryView(): JSX.Element {
  // The id provided in the url
  const { id } = useParams<{ id: string }>();

  // The result of the category contained in the url
  const [{ data, error, loading }] = useAxios<Category>({
    method: 'GET',
    url: `/category/${id}`,
  });

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  // Error / Loading View
  if (error || loading) {
    return (
      <div className="p-3">
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
        </Alert>
        <Placeholder animation="glow"><h1><Placeholder xs={3} size="lg" /></h1></Placeholder>
        <Row>
          {Array.from(Array(20).keys()).map(() => <QuizCardPlaceholder />)}
        </Row>
      </div>
    );
  }

  // The View
  return (
    <div className="p-3">
      <h1>{data.title}</h1>
      <Row>
        {data.quizzes.map((quiz) => <QuizCard quiz={quiz} />)}
      </Row>
    </div>
  );
}

export default CategoryView;
