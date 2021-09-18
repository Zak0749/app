import { ProgressBar, Table } from 'react-bootstrap';
import {
  Check, CheckLg, X, XLg,
} from 'react-bootstrap-icons';
import { Answer, Quiz } from '../..';

function FinishedView({ quiz, answers }: { quiz: Quiz, answers: Answer[] }) {
  return (
    <div className="px-3 h-100 d-flex flex-column justify-content-between">
      <div>
        <h1>
          {quiz.title}
          {' '}
          Complete!
        </h1>

        <Table hover>
          <thead>
            <tr>
              <th>Question</th>
              <th>Correct</th>
              <th>Given Answer</th>
            </tr>
          </thead>
          <tbody>
            {quiz.questions.map((que, idx) => (
              <tr>
                <th>{que.body}</th>
                <th>{answers[idx].correct ? <CheckLg style={{ color: 'var(--bs-success)' }} /> : <XLg style={{ color: 'var(--bs-danger)' }} />}</th>
                <th>{answers[idx].body}</th>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5 className="text-center">Click cross in the top right to exit</h5>

      </div>

      <ProgressBar>
        <ProgressBar variant="success" now={(answers.reduce((acc, curr) => (curr.correct === true ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={1} />
        <ProgressBar variant="danger" now={(answers.reduce((acc, curr) => (curr.correct === false ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={2} />
      </ProgressBar>
    </div>
  );
}

export default FinishedView;
