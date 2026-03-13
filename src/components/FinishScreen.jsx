import React from "react";

function FinishScreen({ points, totalPoints, highscore }) {
  const percentage = (points / totalPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </div>
  );
}

export default FinishScreen;
