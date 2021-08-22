import Error from '../components/Error';
import Loading from '../components/Loading';
import QuizTile from '../components/QuizTile';
import useAxios from '../helpers/axios';
import './css/Create.css';

// const blankDraft = {
//   title: '',
//   emoji: '',
//   description: '',
//   date: new Date(),
//   categoryId: '',
//   questions: [],
// };

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
  // const [published, setPublished] = useState<quiz[] | undefined>();
  // const [drafts, setDrafts] = useState<draft[] | undefined>();

  const [{ data: drafts, loading: draftLoading, error: draftError }] = useAxios<draft[]>({
    method: 'GET',
    url: '/draft',
  });

  const [{ data: published, loading: publishedLoading, error: publishedError }] = useAxios<user>({
    method: 'GET',
    url: '/draft',
  });

  if (draftLoading || publishedLoading) {
    return <Loading />;
  }

  if (draftError || publishedError) {
    return <Error />;
  }

  return (
    <div className="page">
      <div className="space-between-box">
        <h1 className="navigationTitle">Create</h1>
        <button type="button">hi</button>
      </div>

      <h3>Published</h3>
      <div>{published ? published.quizzes.map(QuizTile) : <></>}</div>

      <h3>Drafts</h3>
      <div>{drafts ? drafts.map(DraftRow) : <></>}</div>
    </div>
  );
}

export default Create;
