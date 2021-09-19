import { ProgressBar, Table } from 'react-bootstrap';
import {
  Check, CheckLg, QuestionLg, X, XLg,
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
                <th>
                  {
                    answers[idx].correct ? answers[idx].correct === false
                      ? <XLg style={{ color: 'var(--bs-danger)' }} />
                      : <QuestionLg style={{ color: 'var(--bs-danger)' }} />
                      : <CheckLg style={{ color: 'var(--bs-success)' }} />
                  }

                </th>
                <th>{answers[idx].body}</th>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5 className="text-center">Click cross in the top right to exit</h5>

      </div>

      <ProgressBar>
        <ProgressBar variant="secondary" now={(answers.reduce((acc, curr) => (curr.correct === null ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={1} />
        <ProgressBar variant="success" now={(answers.reduce((acc, curr) => (curr.correct === true ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={1} />
        <ProgressBar variant="danger" now={(answers.reduce((acc, curr) => (curr.correct === false ? acc + 1 : acc), 0) / quiz.questions.length) * 100} key={2} />
      </ProgressBar>
    </div>
  );
}

export default FinishedView;
