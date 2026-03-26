import React from "react";
import Options from "./Options";
import { useQuiz } from "../context/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  const currentQuestion = questions[index];
  return (
    <div>
      <h4>{currentQuestion.question}</h4>

      <Options question={currentQuestion} />
    </div>
  );
}

export default Question;
