function ScoreBar({ answers, questionNumber }:{answers:answer[], questionNumber: number}): JSX.Element {
  const correct = (answers.filter((answer) => answer.correct === true).length / questionNumber) * 100;
  const wrong = (answers.filter((answer) => answer.correct === false).length / questionNumber) * 100;
  return (
    <div className="scorebar">
      <div className="correct" style={{ width: `${correct}%` }}>{' '}</div>
      <div className="wrong" style={{ width: `${wrong}%` }}>{' '}</div>
    </div>
  );
}

export default ScoreBar;
