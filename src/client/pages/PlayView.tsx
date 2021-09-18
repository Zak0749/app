import { useEffect, useState } from 'react';
import {
  Button, Card, Col, Row, ProgressBar, Modal, CloseButton,
} from 'react-bootstrap';
import { Answer, Question, Quiz } from '../..';
import FinishedView from './FinishedView';

function AnswerCard({
  answer, chosen, choose,
}: { answer: Answer, choose: (a: Answer) => void, chosen: Answer | undefined }) {
  const bg = chosen ? answer.correct ? 'success' : 'danger' : '';
  const ifChosenStyle = chosen ? chosen === answer ? { transform: 'scale(1.1)' } : { transform: 'scale(0.9)' } : {};
  return (
    <Card className="zoom-in" style={{ transition: 'transform .2s', ...ifChosenStyle }} bg={bg} onClick={() => choose(answer)}>
      <Card.Body>{answer.body}</Card.Body>
    </Card>
  );
}

function QuestionView({
  quiz, index, setIdx, answers, setAnswers, progress,
}: {
  quiz: Quiz,
  index: number,
  setIdx: React.Dispatch<React.SetStateAction<number>>
  answers: Answer[],
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>,
  progress: number,
}) {
  const [question, setQuestion] = useState<Question>(quiz.questions[index]);
  const [chosenAns, setAns] = useState<Answer | undefined>(undefined);
  const [fin, setFin] = useState(false);

  useEffect(() => {
    setQuestion(quiz.questions[index]);
  }, [index]);

  const chooseAnswer = (answer: Answer) => {
    if (!chosenAns) {
      setAns(answer);
      setAnswers([...answers, answer]);
    }
  };

  const nextAns = () => {
    setIdx(index + 1);
    setAns(undefined);
  };

  const nextButton = index !== quiz.questions.length - 1
    ? <Button className="d-grid ms-auto me-auto mb-3" onClick={() => nextAns()}>Next</Button>
    : <Button className="d-grid ms-auto me-auto mb-3" onClick={() => setFin(true)}>Finish</Button>;

  if (fin) {
    return <FinishedView quiz={quiz} answers={answers} />;
  }

  return (
    <div className="px-3 h-100 d-flex flex-column justify-content-between">
      <h1 className="text-center font-weight-bold">{question.body}</h1>

      <div>
        {chosenAns ? nextButton : <></>}

        <Row md={2} className="g-4 mb-3">
          {
            question.answers.map((answer) => (
              <Col><AnswerCard chosen={chosenAns} choose={chooseAnswer} answer={answer} /></Col>
            ))
          }
        </Row>

        <ProgressBar>
          <ProgressBar variant="dark" now={(answers.reduce((acc, curr) => (curr.correct === null ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={1} />
          <ProgressBar variant="success" now={(answers.reduce((acc, curr) => (curr.correct === true ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={1} />
          <ProgressBar variant="danger" now={(answers.reduce((acc, curr) => (curr.correct === false ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={2} />
        </ProgressBar>
      </div>
    </div>
  );
}

function PlayView({
  quiz, startInx, close, progress,
}: { quiz: Quiz, startInx: number, close: (a:Answer[]) => void, progress: number }) {
  const [index, setInx] = useState(startInx);
  const [answers, setAnswers] = useState<Answer[]>(Array.from({ length: progress / quiz.questions.length }, () => ({ body: '', correct: null })));

  console.log(answers);

  return (
    <>
      <Modal.Header><CloseButton onClick={() => close(answers)} /></Modal.Header>
      <Modal.Body>
        <QuestionView
          progress={progress}
          index={index}
          setIdx={setInx}
          quiz={quiz}
          answers={answers}
          setAnswers={setAnswers}
        />
      </Modal.Body>
    </>
  );
}

export default PlayView;
