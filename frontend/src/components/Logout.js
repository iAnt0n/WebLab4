import React, {Component} from "react";
import {Button} from "primereact/button";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(e){
        e.preventDefault();
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return <Button className="btn btn-primary" type="button" onClick={this.handleLogout} label="Logout"/>;
    }
}

export default Logout;
