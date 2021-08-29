import { useContext } from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Quiz } from '../..';
import themeContext from '../helpers/theme-context';

function QuizItem({
  quiz: {
    emoji, title, username, _id, categoryTitle,
  },
}: { quiz: Quiz }) {
  const theme = useContext(themeContext);
  return (
    <Card style={{ width: '15rem' }} className="me-3" bg={theme.main} text={theme.opp}>
      <Link to={`/quiz/${_id}`} className="text-decoration-none text-white ">
        <div className={`text-center ${theme.bg} mt-3 rounded`} style={{ fontSize: '120px' }}>{emoji}</div>
        <Card.Body>
          <Card.Title className={theme.text}>{title}</Card.Title>
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

function QuizItemPlaceholder() {
  const theme = useContext(themeContext);

  return (
    <Card style={{ width: '15rem' }} className="me-3" bg={theme.main} text={theme.opp}>
      <Placeholder className="text-center" animation="glow"><Placeholder style={{ minWidth: '100%', minHeight: '180px' }} /></Placeholder>
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

export { QuizItem, QuizItemPlaceholder };
