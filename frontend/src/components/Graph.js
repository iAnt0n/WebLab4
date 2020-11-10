import React, {useEffect, useRef} from "react";
import {sendForm} from "../service/requests";
import {useDispatch, useSelector} from "react-redux";
import {selectR} from "../store/slices/inputValuesSlice";
import {selectLastPoint} from "../store/slices/lastAddedPointSlice";
import {addPointToHistory} from "../store/slices/historySlice";

export function Graph(props) {
    const globalR = useSelector(selectR);
    const lastPoint = useSelector(selectLastPoint);
    const dispatch = useDispatch();
    const graph = useRef();

    const drawPreviousPoints = (pointsArray) => {
        pointsArray.forEach(point => drawPoint(point.x, point.y, point.r, point.result));
    };

    useEffect(
        () => {
            drawPreviousPoints(Array.isArray(props.pointHistory) ? props.pointHistory : []);
            return () => clearPoints()
        },
        [props.pointHistory]
    );

    useEffect(
        () => updatePoints(globalR),
        [globalR]
    );

    useEffect(
        () => drawPoint(lastPoint.x, lastPoint.y, lastPoint.r, lastPoint.res),
        [lastPoint]
    );

    const updatePoints = (r) => {
        document.querySelectorAll('.target-dot').forEach(function (elem) {
            if (+elem.getAttribute("data-r") === +r) {
                elem.setAttribute("style", "visibility: visible");
            } else elem.setAttribute("style", "visibility: hidden");
        });
    };

    const clearPoints = () => document.querySelectorAll('.target-dot').forEach(function (elem) {
        elem.remove();
    });


    const drawPoint = (_x, _y, _r, _result) => {
        if (_x == null || _y == null || _r == null || _result == null) return;
        let x = Number(_x);
        let y = Number(_y);
        let r = Number(_r);
        let color = _result ? "#600BBF" : "#BF0B10";
        let dot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        dot.setAttribute("r", "3");
        dot.setAttribute("cx", String(200 + x * 180 / r));
        dot.setAttribute("cy", String(200 - y * 180 / r));
        dot.setAttribute("data-r", String(r));
        dot.setAttribute("class", "target-dot");
        dot.setAttribute("fill", color);
        if (r === globalR) {
            dot.setAttribute("style", "visibility: visible");
        } else dot.setAttribute("style", "visibility: hidden");
        graph.current.appendChild(dot);
    };

    const handleClick = (e) => {
        e.preventDefault();
        let htmlCoordinatesPoint = graph.current.createSVGPoint();
        htmlCoordinatesPoint.x = e.clientX;
        htmlCoordinatesPoint.y = e.clientY;
        let svgPoint = htmlCoordinatesPoint.matrixTransform(graph.current.getScreenCTM().inverse());
        let calcX = globalR * (svgPoint.x - 200) / 180;
        let calcY = globalR * (svgPoint.y - 200) / -180;
        sendForm(calcX, calcY, globalR)
            .then(response => response.json())
            .then(point => {
                drawPoint(point.x, point.y, point.r, point.result);
                dispatch(addPointToHistory(point));
            });
    };


    return (
        <div>
            <svg ref={graph} onClick={event => handleClick(event)} className="graph content"
                 height="400" width="400" id="graph" xmlns="http://www.w3.org/2000/svg">
                <line className="axis" stroke="black" x1="0" x2="400" y1="200" y2="200"/>
                <line className="axis" stroke="black" x1="200" x2="200" y1="0" y2="400"/>

                <line className="arrow" stroke="black" x1="390" x2="400" y1="195" y2="200"/>
                <line className="arrow" stroke="black" x1="390" x2="400" y1="205" y2="200"/>

                <line className="arrow" stroke="black" x1="195" x2="200" y1="10" y2="0"/>
                <line className="arrow" stroke="black" x1="200" x2="205" y1="0" y2="10"/>

                <line className="point-line" stroke="black" x1="20" x2="20" y1="195" y2="205"/>
                <line className="point-line" stroke="black" x1="110" x2="110" y1="195" y2="205"/>
                <line className="point-line" stroke="black" x1="290" x2="290" y1="195" y2="205"/>
                <line className="point-line" stroke="black" x1="380" x2="380" y1="195" y2="205"/>

                <line className="point-line" stroke="black" x1="195" x2="205" y1="20" y2="20"/>
                <line className="point-line" stroke="black" x1="195" x2="205" y1="110" y2="110"/>
                <line className="point-line" stroke="black" x1="195" x2="205" y1="290" y2="290"/>
                <line className="point-line" stroke="black" x1="195" x2="205" y1="380" y2="380"/>

                <text className="point-text" x="10" y="190">-R</text>
                <text className="point-text" x="100" y="190">-R/2</text>
                <text className="point-text" x="285" y="190">R/2</text>
                <text className="point-text" x="375" y="190">R</text>
                <text className="point-text" x="207" y="385">-R</text>
                <text className="point-text" x="207" y="295">-R/2</text>
                <text className="point-text" x="207" y="115">R/2</text>
                <text className="point-text" x="207" y="25">R</text>

                <polygon className="rectangle-graph" fill="#0BBFBA"
                         fillOpacity="0.5" points="290,200 290,380 200,380 200,200" stroke="#0BBFBA"/>
                <polygon className="triangle-graph" fill="#0BBFBA"
                         fillOpacity="0.5" points="20,200 200,20 200,200" stroke="#0BBFBA"/>
                <path className="circle-graph" d="M 380 200 A 180 180 0 0 0 200 20 L 200 200 Z"
                      fill="#0BBFBA" fillOpacity="0.5" stroke="#0BBFBA"/>
            </svg>
        </div>
    )
}

export default Graph;
