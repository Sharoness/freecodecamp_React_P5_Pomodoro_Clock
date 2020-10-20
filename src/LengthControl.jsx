import React from 'react';
import { MdArrowUpward } from 'react-icons/md';
import { MdArrowDownward } from 'react-icons/md';
import './LengthControl.css';

const LengthControl = ({idLabel, length, idDecrement, idLength, idIncrement, lengthCount, setLengthCount, setTimerCount, tellerId, sessionOrBreak, label}) => {
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
        <div style={{gridColumn: length === "Break Length" ? "1 / 3" : "5 / 7"}} className="length-control">
            <div id={idLabel}>
                {length}
            </div>
            <div id="arrowNumArrow">
                <button id={idDecrement} onClick={decrease(setLengthCount, lengthCount, label)}><MdArrowDownward size={20} /></button>
                <div id={idLength}>{lengthCount}</div>
                <button id={idIncrement} onClick={increase(setLengthCount, lengthCount, label)}><MdArrowUpward size={20} /></button>
            </div>
        </div>
    )
}

export default LengthControl;
