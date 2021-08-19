import {
  useState, useEffect,
} from 'react';
import './css/Categorys.css';
import { Link } from 'react-router-dom';
import Request from '../helpers/axios';

function CategoryTitle({ _id, title }: {_id:string, title:string}): JSX.Element {
  return (
    <Link className="tile" key={_id} to={`/category/${_id}`}>
      {title}
    </Link>
  );
}

function Categorys(): JSX.Element {
  const [categorys, setCategorys] = useState([] as {_id:string, title:string}[]);

  useEffect(() => {
    (async () => {
      const res = await Request({
        method: 'GET',
        url: '/categorys',
      });
      setCategorys(res.data);
    })();
  }, []);
  return (
    <div className="page">
      <h1 className="navigationTitle">Categorys</h1>
      <div className="grid">{categorys.map((val) => CategoryTitle(val))}</div>
    </div>
  );
}

export default Categorys;
