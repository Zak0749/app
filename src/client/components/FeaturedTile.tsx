import { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/FeaturedTile.css';

const colors = [
  'blue',
  'cyan',
  'green',
  'indigo',
  'mint',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow',
];

function FeaturedTile({ quiz }:{quiz:quiz}): JSX.Element {
  const [color] = useState(colors[Math.floor((Math.random() * colors.length))]);

  return (
    <Link to={`/quiz/${quiz._id}`} className={`featured-tile ${color}`} key={quiz._id}>
      <div className="emoji">{quiz.emoji}</div>
      <div className="title">
        {quiz.title}
      </div>
    </Link>
  );
}

export default FeaturedTile;
