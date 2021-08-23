import './css/Categorys.css';
import { Link } from 'react-router-dom';
import useAxios from '../helpers/axios';
import Loading from '../components/Loading';
import Error from '../components/Error';

function CategoryTitle({ _id, title }: {_id:string, title:string}): JSX.Element {
  return (
    <Link className="tile" key={_id} to={`/category/${_id}`}>
      {title}
    </Link>
  );
}

function Categorys(): JSX.Element {
  const [{ data, loading, error }] = useAxios<{ _id: string, title: string }[]>({
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
    <div className="page categories">
      <h1 className="navigationTitle">Categorys</h1>
      <div className="grid">{data.map((val) => CategoryTitle(val))}</div>
    </div>
  );
}

export default Categorys;
