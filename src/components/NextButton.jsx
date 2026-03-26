import React from "react";
import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { index, numOfQuestions, answer, nextQuestion, finishedQuiz } =
    useQuiz();
  if (answer == null) return;
  if (index + 1 < numOfQuestions)
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );
  if (index + 1 == numOfQuestions)
    return (
      <button className="btn btn-ui" onClick={finishedQuiz}>
        Finish
      </button>
    );
}

export default NextButton;
