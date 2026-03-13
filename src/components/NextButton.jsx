import React from "react";

function NextButton({ dispatch, index, numOfQuestions, answer }) {
  if (answer == null) return;
  if (index + 1 < numOfQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index + 1 == numOfQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
