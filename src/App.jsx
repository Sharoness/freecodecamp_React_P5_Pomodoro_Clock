import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [breakLengthCount, setBreakLengthCount] = useState(5);
  const [sessionLengthCount, setSessionLengthCount] = useState(25);
  const [timerCount, setTimerCount] = useState(sessionLengthCount*60);
  const [tellerId, setTellerId] = useState();

  const startstop = () => {
    if (tellerId !== undefined) {
      clearInterval(tellerId);
      setTellerId(undefined);
    } else {
      const id = setInterval(() => {setTimerCount((value) => value - 1)}, 1000);
      setTellerId(id);
    }
  }

  const reset = () => {
    setBreakLengthCount(5);
    setSessionLengthCount(25);
    setTimerCount(1500);
    clearInterval(tellerId);
    setTellerId(undefined);
  }

  const increase = (setter, state) => {
    return (() => {
      setter(state + 1);
    })
  }

  const decrease = (setter, state) => {
    return (() => {
      setter(state - 1);
    })
  }

  return (
    <div>
      <div id="break-label">
        Break Length
      </div>
      <div id="session-label">
        Session Length
      </div>
      <button id="break-decrement" onClick={decrease(setBreakLengthCount, breakLengthCount)}>break v</button>
      <button id="session-decrement" onClick={decrease(setSessionLengthCount, sessionLengthCount)}>session v</button>
      <button id="break-increment" onClick={increase(setBreakLengthCount, breakLengthCount)}>break ^</button>
      <button id="session-increment" onClick={increase(setSessionLengthCount, sessionLengthCount)}>session ^</button>
      <div id="break-length">Break length: {breakLengthCount}</div>
      <div id="session-length">Session length: {sessionLengthCount}</div>
      <div id="timer-label">Session</div>
      <div id="time-left">Time left: {timerCount}</div>
      <button id="start_stop" onClick={startstop}>start/stop</button>
      <button id="reset" onClick={reset}>reset</button>
    </div>
    );
}


export default App;
