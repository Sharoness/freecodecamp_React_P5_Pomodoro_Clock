import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [breakLengthCount, setBreakLengthCount] = useState(5);
  const [sessionLengthCount, setSessionLengthCount] = useState(25);
  const [timerCount, setTimerCount] = useState(sessionLengthCount*60);

  const countDown = () => {
    setInterval(() => {setTimerCount((value) => value - 1)}, 1000);
  }

  return (
    <div>
      <div id="break-label">
        Break Length
      </div>
      <div id="session-label">
        Session Length
      </div>
      <button id="break-decrement">break v</button>
      <button id="session-decrement">session v</button>
      <button id="break-increment">break ^</button>
      <button id="session-increment">session ^</button>
      <div id="break-length">Break length: {breakLengthCount}</div>
      <div id="session-length">Session length: {sessionLengthCount}</div>
      <div id="timer-label">Session</div>
      <div id="time-left">Time left: {timerCount}</div>
      <button id="start_stop" onClick={countDown}>start/stop</button>
      <button id="reset">reset</button>
    </div>
    );
}


export default App;
