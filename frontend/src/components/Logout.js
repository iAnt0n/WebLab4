import React, {Component} from "react";

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
        return <button className="btn btn-primary" type="button" onClick={this.handleLogout}>Logout</button>;
    }
}

export default Logout;
