import React from 'react';
// import './Timer.css';

const Timer = ({timerCount, sessionOrBreak, audioRef}) => {
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
            <p>timerlabel: </p><div id="timer-label">{sessionOrBreak}</div>
            <p>Time left: </p><div id="time-left">{secToMmSs(timerCount)}</div>
            <audio id="beep" preload="auto" src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" ref={audioRef}></audio>
        </div>
    )
}

export default Timer;
