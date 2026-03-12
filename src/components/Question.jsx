import React from "react";
import Options from "./Options";

function Question({ currentQuestion }) {
  return (
    <div>
      <h4>{currentQuestion.question}</h4>

      <Options options={currentQuestion.options} />
    </div>
  );
}

export default Question;
