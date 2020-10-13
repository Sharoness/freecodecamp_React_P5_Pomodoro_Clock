import React, {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [breakLengthCount, setBreakLengthCount] = useState(5);
  const [sessionLengthCount, setSessionLengthCount] = useState(25);
  const [timerCount, setTimerCount] = useState(1500); 
  const [tellerId, setTellerId] = useState();
  const [sessionOrBreak, setSessionOrBreak] = useState("Session");


  useEffect(() => {
    if (timerCount < 0) {
      console.log("useeffect tc", timerCount);
      clearInterval(tellerId);
      setTellerId(undefined);
      // playSound();
      if (sessionOrBreak === "Session") { // go to break
        setSessionOrBreak("Break");
        setTimerCount(breakLengthCount);
      } else { // go to session
        setSessionOrBreak("Session");
        setTimerCount(sessionLengthCount);
      }
      const id = setInterval(() => {setTimerCount((value) => value - 1)}, 1000);
      setTellerId(id);
    }
  }, [timerCount, tellerId])

  const startstop = () => {
    console.log("startstop tc", timerCount);
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
    setSessionOrBreak("Session");
  }

  const increase = (setter, state) => {
    return (() => {
      if (tellerId === undefined && state < 60) {
        setter(state + 1);
        if (sessionOrBreak === "Session") {
          setTimerCount(sessionLengthCount*60 + 60);
        } else {
          setTimerCount(breakLengthCount*60 + 60);
        }
      };
    });
  }

  const decrease = (setter, state) => {
    return (() => {
      if (tellerId === undefined && state > 1) {
        setter(state - 1);
        setTimerCount(state*60);
        if (sessionOrBreak === "Session") {
          setTimerCount(sessionLengthCount*60 - 60);
        } else {
          setTimerCount(breakLengthCount*60 - 60);
        }
      };
    });
  }

  const secToMmSs = (state) => {
    console.log("sextommss tc", timerCount);
    const minutes = (state-state%60)/60;
    const seconds = state%60;
    if (minutes < 10 && seconds < 10) {
      return "0"+minutes+":0"+seconds;
    }
    if (minutes < 10 && seconds >= 10) {
      return "0"+minutes+":"+seconds;
    }
    if (minutes >= 10 && seconds < 10) {
      return minutes+":0"+seconds;
    }
    if (minutes >= 10 && seconds >= 10) {
      return minutes+":"+seconds;
    }
    throw new Error("Unexpected time received " + state);
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
      <p>Break length: </p><div id="break-length">{breakLengthCount}</div>
      <p>Session length: </p><div id="session-length">{sessionLengthCount}</div>
      <p>timerlabel: </p><div id="timer-label">{sessionOrBreak}</div>
      <p>Time left: </p><div id="time-left">{secToMmSs(timerCount)}</div>
      <button id="start_stop" onClick={startstop}>start/stop</button>
      <button id="reset" onClick={reset}>reset</button>
    </div>
    );
}

export default App;
