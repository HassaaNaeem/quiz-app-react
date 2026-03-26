import { createContext, useContext, useEffect, useReducer } from "react";
const QuizContext = createContext();

const initialState = {
  questions: [],

  // statuses: loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  console.log(state);
  const SECS_PER_QUEST = 30;
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUEST,
      };
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
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining == 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => {
    return (acc += question.points);
  }, 0);

  function newAnswer(answerIndex) {
    dispatch({ type: "newAnswer", payload: answerIndex });
  }

  function startQuiz() {
    dispatch({ type: "start" });
  }
  function startTimer() {
    dispatch({ type: "tick" });
  }
  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }
  function finishedQuiz() {
    dispatch({ type: "finished" });
  }
  function restartQuiz() {
    dispatch({ type: "restart" });
  }

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numOfQuestions,
        totalPoints,
        newAnswer,
        startQuiz,
        startTimer,
        nextQuestion,
        finishedQuiz,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context == undefined)
    throw new Error("QuizContext is being used outside the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
