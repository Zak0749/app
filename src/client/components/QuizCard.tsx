import { Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Quiz } from '../..';

function QuizCard({
  quiz: {
    emoji, title, username, _id, categoryTitle,
  },
}: { quiz: Quiz }) {
  return (
    <Card style={{ width: '15rem' }} className="m-2" bg="dark" text="dark">
      <Link to={`/quiz/${_id}`} className="text-decoration-none " style={{ color: 'var(--bs-body-color)' }}>
        <div className="text-center mt-3" style={{ fontSize: '120px' }}>{emoji}</div>
        <Card.Body>
          <Card.Title className="fw-bold">{title}</Card.Title>
          <Card.Text className="text-primary">{ categoryTitle }</Card.Text>
          <Card.Text className="text-secondary">
            -
            {' '}
            {username}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

function QuizCardPlaceholder() {
  return (
    <Card style={{ width: '15rem' }} className="m-2" bg="dark" text="dark">
      <Placeholder className="text-center mt-3 rounded" animation="glow"><Placeholder style={{ minWidth: '100%', minHeight: '180px' }} /></Placeholder>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={9} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export { QuizCard, QuizCardPlaceholder };
