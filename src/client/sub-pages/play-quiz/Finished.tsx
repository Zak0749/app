import addId from '../../helpers/addId';
import '../css/play-quiz.css';

function tableRow(question: question & {id: string}, index: number, answers: answer[]): JSX.Element {
  const selectedAnswer = answers[index];
  const correctAnswers = question.answers.filter((answer) => (answer.correct === true));
  return (
    <tr>
      <td className="question-result">{question.body}</td>
      <td className="given-answers" style={{ color: selectedAnswer.correct ? 'green' : 'red' }}>{selectedAnswer.body}</td>
      <td className="expected-answers">
        {correctAnswers.map((answer) => <div className="expected-answer">{answer.body}</div>)}
      </td>
    </tr>
  );
}

function Finished({ quiz, answers }: {quiz:quiz, answers:answer[]}): JSX.Element {
  return (
    <div className="finished">
      <table className="result">
        <tr>
          <th>Question</th>
          <th>Your answer</th>
          <th>Expected Answers</th>
        </tr>
        {
          addId(quiz.questions).map((question, index) => tableRow(question, index, answers))
        }
      </table>

      <h4 className="close-message">Click the X in the top right to close</h4>
    </div>
  );
}

export default Finished;
