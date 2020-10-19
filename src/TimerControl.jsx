import React from 'react';
import './TimerControl.css';

const TimerControl = ({setBreakLengthCount, setSessionLengthCount, setTimerCount, tellerId, setTellerId, setSessionOrBreak, audioRef}) => {
      
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
    
  
    return (
        <div className="timer-control">
            <button id="start_stop" onClick={startstop}>start/stop</button>
            <button id="reset" onClick={reset}>reset</button>
        </div>
    )
}

export default TimerControl;
