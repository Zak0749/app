/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAxios } from '../helpers/axios';
import { Quiz } from '../../index';
import { QuizItem, QuizItemPlaceholder } from '../components/QuizItem';
import themeContext from '../helpers/theme-context';

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

function randColors() {
  const acc: string[] = [];
  for (let i = 0; i < 20; i += 1) {
    acc.push(colors[Math.floor(Math.random() * colors.length)]);
  }

  return acc;
}

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
      text="light"
      className="me-3"
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

function LoadingFeatured({ color }: {color:string}) {
  return (
    <Card style={{ width: '15rem', backgroundColor: `var(--bs-${color})` }} className="me-3">
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

function Explore() {
  const [{ data, loading, error }] = useAxios<ExploreData>({
    method: 'GET',
    url: '/discover',
  });

  const [usedColors] = useState(randColors());
  const theme = useContext(themeContext);

  if (error) {
    return <>{error.toString()}</>;
  }

  return (
    <div role="main" className={`h-100 w-100 ml-sm-auto col-lg-10 pt-3 px-4 text-${theme}`} style={{ backgroundColor: theme.mainBg }}>
      {
        error
          ? (
            <Alert variant="danger">
              There was an error try reloading if this issue persists report it
              {' '}
              <Alert.Link href="https://github.com/Zak0749/quiz-app/issues">here</Alert.Link>
            </Alert>
          )
          : <></>
      }
      <h1 className={theme.text}>Explore</h1>
      <div>
        <h3 className={`mt-3 ${theme.text}`}>Featured</h3>
        <Row className="flex-nowrap overflow-scroll">
          {
            loading
              ? usedColors.map((color) => <LoadingFeatured color={color} />)
              : data.featured.map((quiz, index) => <FeaturedCard quiz={quiz} color={usedColors[index]} />)
          }
        </Row>
      </div>

      <div>
        <h3 className={`mt-3 ${theme.text}`}>ForYou</h3>

        <Row className="flex-nowrap overflow-scroll">
          {
            loading ? Array.from(Array(10).keys()).map(() => <QuizItemPlaceholder />)
              : data.forYou ? data.forYou.map((quiz) => <QuizItem quiz={quiz} />)
                : <></>
          }
        </Row>
      </div>

      <div>
        <h3 className={`mt-3 ${theme.text}`}>Popular</h3>

        <Row className="flex-nowrap overflow-scroll">
          {
            loading
              ? Array.from(Array(10).keys()).map(() => <QuizItemPlaceholder />)
              : data.popular.map((quiz) => <QuizItem quiz={quiz} />)
          }
        </Row>
      </div>
    </div>
  );
}

export default Explore;
