import React, { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    if (secondsRemaining == 0) return;
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <div className="timer">
      {String(mins).padStart(2, 0)}:{String(seconds).padStart(2, 0)}
    </div>
  );
}

export default Timer;
