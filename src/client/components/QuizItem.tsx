import { Link } from 'react-router-dom';

function QuizItem({
  title, _id, emoji, plays, date,
}: quiz): JSX.Element {
  return (
    <Link to={`/quiz/${_id}`} key={_id} className="search-list-item">
      <div className="search-list-left">
        <div className="search-list-emoji">{emoji}</div>
        {' '}
        <div>{title}</div>
      </div>

      <div className="search-list-right">
        {' '}
        <div>
          {plays}
          {' '}
          plays
        </div>
        <div>
          Created
          {' '}
          {new Date(date).toDateString()}
        </div>
      </div>
    </Link>
  );
}

export default QuizItem;
