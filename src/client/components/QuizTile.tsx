import { Link } from 'react-router-dom';
import './css/QuizTile.css';

function QuizTile({
  _id, title, emoji, username,
}: quiz): JSX.Element {
  return (
    <Link to={`/quiz/${_id}`} className="quiz-tile" key={_id}>
      <div className="quiz-tile-emoji">{emoji}</div>
      <div className="quiz-tile-title">
        {title}
      </div>
      <div className="quiz-tile-username">{username}</div>
    </Link>
  );
}

export default QuizTile;
