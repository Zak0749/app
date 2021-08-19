import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/User.css';

function User(): JSX.Element {
  const [user, setUser] = useState<user | undefined>(undefined);
  const { id } = useParams() as {id:string};

  useEffect(() => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: `/user/${id}`,
        });
        setUser(res.data);
      } catch (err) {
        //
      }
    })();
  }, []);

  return (
    <div className="page user limit">
      <div className="emoji">{user?.emoji}</div>
      <div className="username">{user?.username}</div>
      <div className="date">
        Account Created
        {' '}
        {user ? new Date(user.date).toDateString() : ''}

      </div>
      <div>{user?.quizzes?.map((quiz) => QuizTile(quiz))}</div>
    </div>
  );
}

export default User;
