import React from 'react';
import './TimerControl.css';
import { MdPlayArrow } from 'react-icons/md';
import { MdPause } from 'react-icons/md';
import { MdRefresh } from 'react-icons/md';

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
            <button id="start_stop" onClick={startstop}><MdPlayArrow size={24} className="arrow" /><MdPause size={24} /></button>
            <button id="reset" onClick={reset}><MdRefresh size={24} /></button>
        </div>
    )
}

export default TimerControl;
