import { useContext, useEffect, useState } from 'react';
import {
  Alert, Card, Placeholder, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Quiz } from '../..';
import { QuizCard, QuizCardPlaceholder } from '../components/QuizCard';
import { useAxios } from '../helpers/axios';
import loggedInContext from '../helpers/logged-in-context';

const colors = [
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
];

type ExploreData = {
  featured: Quiz[],
  forYou?: Quiz[],
  popular: Quiz[]
}

function FeaturedCard({
  quiz: { title, _id, emoji }, color,
}: {quiz: Quiz, color:string}) {
  return (
    <Card
      style={{
        width: '15rem', backgroundColor: `var(--bs-${color})`,
      }}
      className="m-2"
    >
      <Link to={`/quiz/${_id}`} className="text-decoration-none text-white">
        <div className="text-center" style={{ fontSize: '100px' }}>{emoji}</div>
        <Card.Body>
          <Card.Title className="fs-3 fw-bold">
            {title}
            {color}
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

function FeaturedCardPlacholder({ color }: {color:string}) {
  return (
    <Card style={{ width: '15rem', backgroundColor: `var(--bs-${color})` }} className="m-2">
      <Card.Body>
        <Placeholder className="text-center" animation="glow"><Placeholder style={{ minWidth: '12rem', minHeight: '150px' }} /></Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
          {' '}
          <Placeholder xs={4} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

function ExploreView(): JSX.Element {
  // Gets the explore data from the server
  const [{ data, loading, error }] = useAxios<ExploreData>({
    method: 'GET',
    url: '/discover',
  });

  // The users logged in status
  const { status } = useContext(loggedInContext);

  // The colors used for the featured row
  const [featuredColors] = useState(Array.from({ length: 20 }, () => colors[Math.floor(Math.random() * colors.length)]));

  // Handles the state of the error alert
  const [showErrAlert, setErrAlert] = useState(false);

  // When the server gives an error
  useEffect(() => {
    if (error) {
      setErrAlert(true);
    }
  }, [error]);

  // If the data is loading show a placholder view
  if (loading || error) {
    return (
      <div className="p-3">
        <Alert show={showErrAlert} variant="danger" onClose={() => { setErrAlert(false); }} dismissible>
          There was an error try reloading if this issue persists report it
          {' '}
          <Alert.Link href="https://github.com/Zak0749/app/issues">here</Alert.Link>
        </Alert>

        <h1>Explore</h1>

        <h3 className="mt-3">Featured</h3>
        <Row className="flex-nowrap overflow-scroll">
          {featuredColors.map((color) => <FeaturedCardPlacholder color={color} />)}
        </Row>

        {
          status
            ? (
              <>
                <h3 className="mt-3">For You</h3>
                <Row className="flex-nowrap overflow-scroll">
                  {Array.from(Array(10).keys()).map(() => <QuizCardPlaceholder />)}
                </Row>
              </>
            )
            : <></>
        }

        <h3 className="mt-3">Popular</h3>
        <Row className="flex-nowrap overflow-scroll">
          {Array.from(Array(10).keys()).map(() => <QuizCardPlaceholder />)}
        </Row>
      </div>
    );
  }

  // Returns the page
  return (
    <div className="p-3">
      <h1>Explore</h1>

      <h3 className="mt-3">Featured</h3>
      <Row className="flex-nowrap overflow-scroll">
        {data.featured.map((quiz, index) => <FeaturedCard color={featuredColors[index]} quiz={quiz} />)}
      </Row>

      {
        data.forYou
          ? (
            <>
              <h3 className="mt-3">For You</h3>
              <Row className="flex-nowrap overflow-scroll">
                {data.forYou.map(() => <QuizCardPlaceholder />)}
              </Row>
            </>
          )
          : <></>
      }

      <h3 className="mt-3">Popular</h3>
      <Row className="flex-nowrap overflow-scroll">
        {data.popular.map((quiz) => <QuizCard quiz={quiz} />)}
      </Row>
    </div>
  );
}

export default ExploreView;
