import React from 'react';
// import './LengthControl.css';

const LengthControl = ({breakLengthCount, setBreakLengthCount, sessionLengthCount, setSessionLengthCount, setTimerCount, tellerId, sessionOrBreak}) => {
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

    return (
        <div>
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
        </div>
    )
}

export default LengthControl;
