import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { useEffect } from "react";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";

const initialState = {
  questions: [],

  // statuses: loading, error, ready, active, finished
  status: "loading",
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const numOfQuestions = questions.length;

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
        {status == "active" && <Question currentQuestion={questions[index]} />}
      </Hero>
    </div>
  );
}

export default App;
