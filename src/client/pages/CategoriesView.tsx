import { FC, useEffect, useState } from 'react';
import {
  Alert, Card, Placeholder, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Category } from '../..';
import { useAxios } from '../helpers/axios';

const CategoryCard: FC<{category:Category}> = ({ category }) => (
  <Card className="m-2" style={{ width: '18rem' }}>
    <Link to={`/category/${category._id}`} className="text-decoration-none text-body ">
      <Card.Body>{category.title}</Card.Body>
    </Link>
  </Card>
);

const CategoryCardPlaceholder: FC = () => (
  <Card className="m-2" style={{ width: '18rem' }}>
    <Placeholder as={Card.Body} animation="glow">
      <Placeholder xs={6} />
    </Placeholder>
  </Card>
);

const CategoriesView : FC = () => {
  // Gets the categories from the server
  const [{ data, loading, error }] = useAxios<Category[]>({
    method: 'GET',
    url: '/categorys',
  });

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  // Show placeholder view if loading or an error
  if (loading || error) {
    return (
      <div className="p-3">
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
        </Alert>
        <h1>Categories</h1>
        <Row>{Array.from(Array(20).keys()).map(() => <CategoryCardPlaceholder />)}</Row>
      </div>
    );
  }

  return (
    <div className="p-3">
      <h1>Categories</h1>
      <Row>{data.map((category) => <CategoryCard category={category} />)}</Row>
    </div>
  );
};

export default CategoriesView;
