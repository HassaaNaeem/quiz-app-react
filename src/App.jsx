import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import { useEffect } from "react";
import { useReducer } from "react";

const initialState = {
  questions: [],

  // statuses: loading, error, ready, active, finished
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question?</p>
      </Hero>
    </div>
  );
}

export default App;
