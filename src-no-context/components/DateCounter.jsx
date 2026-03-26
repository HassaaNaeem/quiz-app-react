import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);
  return state + action;
}

function DateCounter() {
  //   const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const date = new Date("March 11 2026");
  date.setDate(date.getDate() + count);

  const inc = () => {
    // setCount((count) => count + step);
    dispatch(1);
  };
  const dec = () => {
    // setCount((count) => count - step);
    dispatch(-1);
  };

  const defineCount = (e) => {
    // setCount(Number(e.target.value));
  };
  const defineStep = (e) => {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    // setCount(0);
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
