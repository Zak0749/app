import { useState } from 'react';
import './css/Search.css';
import { Link } from 'react-router-dom';
import useAxios from '../helpers/axios';
import QuizItem from '../components/QuizItem';
import Error from '../components/Error';
import Loading from '../components/Loading';

function userItem({
  username, emoji, userId, quizzes,
}: user): JSX.Element {
  return (
    <Link to={`/user/${userId}`} key={userId} className="search-user-item">
      <div className="search-list-item">
        <div className="search-list-left">
          <div className="search-list-emoji">{emoji}</div>
          <div>{username}</div>
        </div>

        <div className="search-list-right">
          <div>
            {quizzes?.length}
            {' '}
            quizzes
          </div>
        </div>

      </div>
    </Link>
  );
}

function Search(): JSX.Element {
  const [term, setTerm] = useState('');
  const [{ data, loading, error }] = useAxios<searchResult>({
    method: 'GET',
    url: `/search/${term}`,
  });

  if (error) {
    return <Error />;
  }

  return (
    <div className="page">
      <h1 className="navigationTitle">Search</h1>

      <input type="search" className="search-search-bar" name="search" value={term} onChange={(e) => setTerm(e.target.value)} />
      {
        loading ? <Loading />
          : (
            <div>
              {
                data.quizzes.length === 0
                  ? <></> : <h3 className="search-title">Quizzes</h3>
              }

              {
                data.quizzes.map((quiz) => QuizItem(quiz))
              }

              {
                data.users.length === 0
                  ? <></> : <h3 className="search-title">Users</h3>
              }

              {
                data.users.map((user) => userItem(user))
              }
            </div>
          )
      }

    </div>
  );
}

export default Search;
