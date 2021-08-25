import useAxios from 'axios-hooks';
import Error from '../components/Error';
import Loading from '../components/Loading';

function Editor({ editing, setEditing }: { editing: editing, setEditing: React.Dispatch<React.SetStateAction<editing>> }) : JSX.Element {
  const [{ loading, error }] = useAxios<{ _id: string, title: string }[]>({
    method: 'GET',
    url: '/categorys',
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="editing">
      <input type="text" value={editing.emoji} onChange={(e) => setEditing({ ...editing, emoji: e.target.value })} />
      <input type="text" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
      <input type="text" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />

      <select>
        {

        }
      </select>
    </div>
  );
}

export default Editor;
