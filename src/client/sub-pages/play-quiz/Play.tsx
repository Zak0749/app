/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '../css/play-quiz.css';
import ScoreBar from './ScoreBar';
import Finished from './Finished';
import addId from '../../helpers/addId';
import Request from '../../helpers/axios';

function Question({ question, next }:{question: question, next: (arg:answer) => void}): JSX.Element {
  const [selectedAnswer, setAnswer] = useState<undefined | answer>(undefined);

  const nextQuestion = () => {
    if (selectedAnswer) {
      next(selectedAnswer);
      setAnswer(undefined);
    }
  };

  function Answer({ answer }:{answer:answer & {id: string}}): JSX.Element {
    const clickedClass = answer.correct ? 'correct-answer' : 'wrong-answer';
    return (
      <button key={answer.id} type="button" onClick={() => setAnswer(answer)} className={`answer ${selectedAnswer ? clickedClass : ''}`}>
        {answer.body}
        {answer.correct.toString()}
      </button>
    );
  }

  return (
    <div className="question">
      <div className="body">{question.body}</div>
      {
        selectedAnswer
          ? <button className="next" type="button" onClick={nextQuestion}>Next</button>
          : <></>
      }
      <div className="answers">
        {
          addId(question.answers).map((answer) => <Answer answer={answer} />)
        }
      </div>
    </div>
  );
}

function PlayQuiz({ quiz, setPlaying }:{quiz:quiz, setPlaying: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
  const [counter, setCounter] = useState(0);
  const [answers, setAnswers] = useState<answer[]>([]);
  const [finsihed, setFinished] = useState(false);

  const next = (answer:answer) => {
    setAnswers(answers.concat(answer));

    if (quiz) {
      if (counter === quiz?.questions.length - 1) {
        setFinished(true);
      }
    }

    setCounter(counter + 1);
  };

  const finish = async () => {
    setPlaying(false);
    try {
      await Request({
        method: 'POST',
        url: '/history',
        data: {
          progress: counter / quiz.questions.length,
          quizId: quiz._id,
        },
      });
    } catch {
      //
    }
  };

  return (
    <div className="page play">
      <div className="menu">
        <h1 className="navigationTitle">{quiz.title}</h1>
        <IoClose className="close" onClick={finish} />

      </div>

      <div className="bottom-play">
        {finsihed ? <Finished quiz={quiz} answers={answers} /> : <Question question={quiz.questions[counter]} next={next} />}
        <ScoreBar answers={answers} questionNumber={quiz.questions.length} />
      </div>
    </div>
  );
}

export default ({ quiz, setPlaying } : {quiz:quiz | undefined, setPlaying: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => <>{quiz ? <PlayQuiz setPlaying={setPlaying} quiz={quiz} /> : <></>}</>;
