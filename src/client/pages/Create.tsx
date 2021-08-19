import { useEffect, useState } from 'react';
import QuizTile from '../components/QuizTile';
import Request from '../helpers/axios';
import './css/Create.css';

const blankDraft = {
  title: '',
  emoji: '',
  description: '',
  date: new Date(),
  categoryId: '',
  questions: [],
};

function DraftRow({
  _id, emoji, title, date,
}:draft): JSX.Element {
  return (
    <div key={_id} className="draft-row">
      <div className="right">
        <div className="emoji">{emoji}</div>
        <div className="title">{title}</div>
      </div>

      <div className="draft-row-right">{new Date(date).toDateString()}</div>
    </div>
  );
}

function Create(): JSX.Element {
  const [published, setPublished] = useState<quiz[] | undefined>();
  const [drafts, setDrafts] = useState<draft[] | undefined>();

  const refresh = () => {
    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/draft',
        });

        setDrafts(res.data);
      } catch {
        //
      }
    })();

    (async () => {
      try {
        const res = await Request({
          method: 'GET',
          url: '/session',
        });

        const user = res.data as user;

        setPublished(user.quizzes);
      } catch {
        //
      }
    })();
  };

  useEffect(() => {
    refresh();
  }, []);

  const newDraft = async () => {
    try {
      await Request({
        method: 'POST',
        url: '/draft',
        data: blankDraft,
      });

      refresh();
    } catch {
      //
    }
  };

  return (
    <div className="page">
      <div className="space-between-box">
        <h1 className="navigationTitle">Create</h1>
        <button type="button" onClick={newDraft}>hi</button>
      </div>

      <h3>Published</h3>
      <div>{published ? published.map(QuizTile) : <></>}</div>

      <h3>Drafts</h3>
      <div>{drafts ? drafts.map(DraftRow) : <></>}</div>
    </div>
  );
}

export default Create;
