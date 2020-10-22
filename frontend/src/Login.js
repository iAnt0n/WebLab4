import React, {Component} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.register = this.register.bind(this);
        this.handleRegSubmit = this.handleRegSubmit.bind(this)
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.login(this.state.name, this.state.password).then(response => {
            if (response.ok) {
                console.log("loginsuccess");
                localStorage.setItem("auth", btoa(this.state.name + ":" + this.state.password));
                this.props.history.push('/');
            }
        });
    }

    handleRegSubmit(e) {
        e.preventDefault();
        this.register(this.state.name, this.state.password).then(response => response.text()).then(data => console.log(data));
    }

    login(name, password) {
        return fetch("http://localhost:11180/web-lab-4-0.0.1-SNAPSHOT/auth/login",
            {
                method: 'POST',
                headers: {
                    Authorization: "Basic " + btoa(name + ":" + password)
                },
            }
        );
    }

    register(name, password) {
        return fetch("http://localhost:11180/web-lab-4-0.0.1-SNAPSHOT/users",
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": name, "password": password})
            }
        );
    }

    render() {
        return (
            <div>
                <div className="flex-vertical flex-centered">
                    <label>
                        Username:
                        <InputText name="username" value={this.state.name}
                                   onChange={(e) => this.setState({name: e.target.value})}/>
                    </label>
                    <label>
                        Password:
                        <Password name="password" weakLabel={null} mediumLabel={null} strongLabel={null}
                                  promptLabel={null}
                                  value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                    </label>
                    <input type="button" value="Login" onClick={this.handleLoginSubmit}/>
                    <input type="button" value="Register" onClick={this.handleRegSubmit}/>
                </div>
            </div>
        )
    }
}

export default Login;