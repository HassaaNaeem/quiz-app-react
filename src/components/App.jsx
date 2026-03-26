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
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Hero>
        {status === "loading" && <Loader />}
        {status == "error" && <Error />}
        {status == "ready" && <Start />}
        {status == "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status == "finished" && <FinishScreen />}
      </Hero>
    </div>
  );
}

export default App;
