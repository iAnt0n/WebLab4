import React, {useState} from 'react';
import {Slider} from 'primereact/slider';
import {InputText} from 'primereact/inputtext';
import {clearUserPoints, sendForm} from "../service/requests";
import {useDispatch, useSelector} from 'react-redux'
import {changeR, selectR} from '../store/slices/inputValuesSlice';
import {addPointToHistory, updateHistory} from "../store/slices/historySlice";
import {addPoint} from "../store/slices/lastAddedPointSlice";

export function PointForm() {
    const globalR = useSelector(selectR);
    const [x, setX] = useState(0.0);
    const [y, setY] = useState(null);
    const [r, setR] = useState(globalR);
    const [xValid, setXValid] = useState(true);
    const [yValid, setYValid] = useState(false);
    const [rValid, setRValid] = useState(true);
    const dispatch = useDispatch();

    const handleChangeX = (e) => {
        const x = e.value / 10;
        if (!(y >= -3 && y <= 5)) {
            setXValid(false);
        } else setXValid(true);
        setX(x);
    };

    const handleChangeR = (e) => {
        const r = e.value / 10;
        setR(r);
        if (r <= 0||r>5) {
            setRValid(false);
        } else {
            dispatch(changeR(r));
            setRValid(true);
        }
        setR(r);
    };

    const handleChangeY = (e) => {
        const y = e.target.value.substring(0,14);
        if (y==='' || !(Number(y) > -3 && Number(y) < 3)) {
            setYValid(false);
        } else setYValid(true);
        setY(y);
    };

    const handleFormSubmit = () => {
        sendForm(x, y, r)
            .then(response => response.json())
            .then(point => {
                dispatch(addPoint(point.x, point.y, point.r, point.result));
                dispatch(addPointToHistory(point));
            });
    };

    const handleClear = () => {
        clearUserPoints()
            .then(dispatch(updateHistory([])));
    };


    return (
        <div className="mt-3">
            <div className="form-group">
                <span>X: {x}</span>
                <Slider className="form-control" min={-30} max={50}
                        step={1} value={x * 10}
                        onChange={e => handleChangeX(e)}/>
            </div>
            <div className="form-group">
                <InputText className="form-control" autoComplete="false" placeholder="(-3;3)"
                           onChange={(e) => handleChangeY(e)}/>
                {y !== null && !yValid &&
                <small style={{color: "#BF0B10"}}>Y must be in (-3; 3)</small>}
            </div>
            <div className="form-group">
                <span>R: {r}</span>
                <Slider className="form-control" min={-30} max={50}
                        step={1} value={r * 10}
                        onChange={e => handleChangeR(e)}/>
                {!rValid &&
                <small style={{color: "#BF0B10"}}>Yes, you can slide here, but it's invalid</small>}
            </div>
            <div className="d-flex justify-content-center">
                <button onClick={handleFormSubmit} type="button"
                        disabled={!(xValid && yValid && rValid)}
                        className="col btn btn-primary mr-3">Submit</button>
                <button onClick={handleClear} type="button"
                        className="col btn btn-danger ml-3">Clear History</button>
            </div>
        </div>
    );
}

