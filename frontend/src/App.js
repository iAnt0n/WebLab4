import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter, Switch} from "react-router-dom";
import Home from "./components/Home";
import {Login} from "./components/Login";
import PublicRoute from "./security/PublicRoute";
import PrivateRoute from "./security/ProtectedRoute";

class App extends Component {
    render() {
        return (
            <BrowserRouter basename={'/~s285596'}>
                <div>
                    <Switch>
                        <PublicRoute exact path="/" component={Home}/>
                        <PrivateRoute path="/login" component={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App