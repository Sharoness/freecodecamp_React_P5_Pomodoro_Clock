import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import Title from './Title';

const App = () => {
  const [breakLengthCount, setBreakLengthCount] = useState(5);
  const [sessionLengthCount, setSessionLengthCount] = useState(25);
  const [timerCount, setTimerCount] = useState(1500); 
  const [tellerId, setTellerId] = useState();
  const [sessionOrBreak, setSessionOrBreak] = useState("Session");

  const audioRef = useRef();

  useEffect(() => {
    if (timerCount === 0) {
      audioRef.current.play();
    }
    if (timerCount < 1) {
      clearInterval(tellerId);
      setTellerId(undefined);
      
      if (sessionOrBreak === "Session") {
        setSessionOrBreak("Break");
        setTimerCount(breakLengthCount*60);
      } else {
        setSessionOrBreak("Session");
        setTimerCount(sessionLengthCount*60);
      }
      const id = setInterval(() => {setTimerCount((value) => value - 1)}, 1000);
      setTellerId(id);
    }
  }, [timerCount, tellerId])

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
    setSessionOrBreak("Session");
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  const increase = (setter, state, timerlabel) => {
    return (() => {
      if (tellerId === undefined && state < 60) {
        setter(state + 1);
        if (sessionOrBreak === timerlabel) {
          setTimerCount(state*60 + 60);
        } 
      };
    });
  }

  const decrease = (setter, state, timerlabel) => {
    return (() => {
      if (tellerId === undefined && state > 1) {
        setter(state - 1);
        if (sessionOrBreak === timerlabel) {
          setTimerCount(state*60 - 60);
        }
      };
    });
  }

  const secToMmSs = (state) => {
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
      <Title />
      <div id="break-label">
        Break Length
      </div>
      <div id="session-label">
        Session Length
      </div>
      <button id="break-decrement" onClick={decrease(setBreakLengthCount, breakLengthCount, "Break")}>break v</button>
      <button id="session-decrement" onClick={decrease(setSessionLengthCount, sessionLengthCount, "Session")}>session v</button>
      <button id="break-increment" onClick={increase(setBreakLengthCount, breakLengthCount, "Break")}>break ^</button>
      <button id="session-increment" onClick={increase(setSessionLengthCount, sessionLengthCount, "Session")}>session ^</button>
      <p>Break length: </p><div id="break-length">{breakLengthCount}</div>
      <p>Session length: </p><div id="session-length">{sessionLengthCount}</div>
      <p>timerlabel: </p><div id="timer-label">{sessionOrBreak}</div>
      <p>Time left: </p><div id="time-left">{secToMmSs(timerCount)}</div>
      <audio id="beep" preload="auto" src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" ref={audioRef}></audio>
      <button id="start_stop" onClick={startstop}>start/stop</button>
      <button id="reset" onClick={reset}>reset</button>
    </div>
    );
}

export default App;
