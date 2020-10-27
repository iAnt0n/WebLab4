import React, {useEffect, useState} from "react";
import Graph from "./Graph";
import {getUserPoints} from "../service/requests";
import {PointForm} from "./PointForm";
import UserHeader from "./UserHeader";
import {useSelector} from "react-redux";
import {selectHistory} from "../store/slices/historySlice";
import {CustomDatatable} from "./CustomDatatable";

function Home(props) {
    const [history, setHistory] = useState([]);
    const historyList = useSelector(selectHistory);

    useEffect(
        () => {
            getUserPoints()
                .then(response => response.json())
                .then(userPoints => {
                    setHistory(userPoints);
                });
        },
        [historyList]
    );

    return (
        <div className="w-100">
            <UserHeader {...props}/>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-center col-md-6">
                            <Graph pointHistory={history}/>
                    </div>
                    <div className="col-md-6">
                        <PointForm/>
                    </div>
                </div>
                <div className="row mt-3">
                    <CustomDatatable pointHistory={history}/>
                </div>
            </div>
        </div>
    )

}

export default Home;