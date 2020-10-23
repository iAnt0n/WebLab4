import React, {Component} from 'react';
import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import PublicRoute from "./security/PublicRoute";
import PrivateRoute from "./security/ProtectedRoute";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
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