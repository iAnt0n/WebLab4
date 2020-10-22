import React, {Component} from "react";
import './index.css';
import Logout from "./Logout";
import {Button} from "primereact/button";


class Home extends Component {
    render() {
        return (
            <div>
                <p>{localStorage.getItem("auth")}</p>
                <Logout {...this.props}/>

            </div>
        )
    }
}

export default Home;