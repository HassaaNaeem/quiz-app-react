import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { useEffect } from "react";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],

  // statuses: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload == question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => {
    return (acc += question.points);
  }, 0);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Hero>
        {status === "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status == "active" && (
          <>
            <Progress
              numOfQuestions={numOfQuestions}
              index={index}
              totalPoints={totalPoints}
              points={points}
              answer={answer}
            />
            <Question
              currentQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numOfQuestions={numOfQuestions}
              index={index}
            />
          </>
        )}
        {status == "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            highscore={highscore}
          />
        )}
      </Hero>
    </div>
  );
}

export default App;
