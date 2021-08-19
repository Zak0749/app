import { useState } from 'react';
import './css/Search.css';
import { Link } from 'react-router-dom';
import Request from '../helpers/axios';
import QuizItem from '../components/QuizItem';

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
  const [result, setResult] = useState<searchResult | undefined>();

  async function makeSearch(evt:React.ChangeEvent<HTMLInputElement>): Promise<void> {
    setTerm(evt.target.value);
    if (evt.target.value !== '') {
      try {
        const res = await Request({
          method: 'GET',
          url: `http://nitetop.local/api/search/${evt.target.value}`,
        });
        setResult(res.data);
      } catch (err) {
        // handle
      }
    }
  }

  return (
    <div className="page">
      <h1 className="navigationTitle">Search</h1>

      <input type="search" className="search-search-bar" name="search" value={term} onChange={makeSearch} />

      {
        result === undefined
          ? <></> : (
            <div>
              {
                result?.quizzes.length === 0
                  ? <></> : <h3 className="search-title">Quizzes</h3>
              }

              {
                result?.quizzes.map((quiz) => QuizItem(quiz))
              }

              {
                result?.users.length === 0
                  ? <></> : <h3 className="search-title">Users</h3>
              }

              {
                result?.users.map((user) => userItem(user))
              }
            </div>
          )
      }
    </div>
  );
}

export default Search;
