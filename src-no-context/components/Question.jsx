import React from "react";
import Options from "./Options";

function Question({ currentQuestion, dispatch, answer }) {
  return (
    <div>
      <h4>{currentQuestion.question}</h4>

      <Options question={currentQuestion} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
