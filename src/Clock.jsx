import React, {useState, useEffect, useRef} from 'react';
import './Clock.css';
import LengthControl from './LengthControl';
import Timer from './Timer';
import TimerControl from './TimerControl';

const Clock = () => {
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
    }, [timerCount, tellerId, breakLengthCount, sessionLengthCount, sessionOrBreak]);

    return (
        <div id="clock" className="clock">
          <LengthControl idLabel={"break-label"} length={"Break Length"} idDecrement={"break-decrement"} idLength={"break-length"} idIncrement={"break-increment"} lengthCount={breakLengthCount} setLengthCount={setBreakLengthCount} setTimerCount={setTimerCount} tellerId={tellerId} sessionOrBreak={sessionOrBreak} label={"Break"} />
          <LengthControl idLabel={"session-label"} length={"Session Length"} idDecrement={"session-decrement"} idLength={"session-length"} idIncrement={"session-increment"} lengthCount={sessionLengthCount} setLengthCount={setSessionLengthCount} setTimerCount={setTimerCount} tellerId={tellerId} sessionOrBreak={sessionOrBreak} label={"Session"} />
          <Timer timerCount={timerCount} sessionOrBreak={sessionOrBreak} audioRef={audioRef} />
          <TimerControl setBreakLengthCount={setBreakLengthCount} setSessionLengthCount={setSessionLengthCount} setTimerCount={setTimerCount} tellerId={tellerId} setTellerId={setTellerId} setSessionOrBreak={setSessionOrBreak} audioRef={audioRef} />
        </div>
    )
}

export default Clock;
