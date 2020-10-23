import React, {Component} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import './index.scss';
import login from '../service/requests'
import register from '../service/requests'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            errorMessage: '',
            successMessage: ''
        };

        this.login = login.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.register = register.bind(this);
        this.handleRegSubmit = this.handleRegSubmit.bind(this)
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        this.setState({errorMessage: ''});
        this.setState({successMessage: ''});
        this.login(this.state.name, this.state.password).then(response => {
            if (response.ok) {
                localStorage.setItem("auth", btoa(this.state.name + ":" + this.state.password));
                this.props.history.push('/');
            } else {
                if (response.status===401){
                    this.setState({errorMessage: 'Wrong login or password'})
                }
                else this.setState({errorMessage: 'Something went wrong, try again'})
            }
        });
    }

    handleRegSubmit(e) {
        e.preventDefault();
        this.setState({errorMessage: ''});
        this.setState({successMessage: ''});
        this.register(this.state.name, this.state.password).then(response => {
            if (response.ok) {
                response.text().then(text =>
                    this.setState({successMessage: text})
                );
            }
            else response.text().then(text =>
                this.setState({errorMessage: text})
            );
        });
    }

    render() {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        { this.state.errorMessage &&
                        <div className="alert alert-danger"> { this.state.errorMessage } </div> }
                        { this.state.successMessage &&
                        <div className="alert alert-success"> { this.state.successMessage } </div> }
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" className="form-control" name="username" value={this.state.name}
                                       autoComplete="off"
                                       onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Password</label>
                            <Password id="password" className="form-control" name="password" weakLabel={null}
                                      mediumLabel={null}
                                      strongLabel={null}
                                      promptLabel={null}
                                      value={this.state.password}
                                      onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4 d-flex justify-content-center">
                        <input className="col btn btn-primary mr-3" type="button" value="Login"
                               onClick={this.handleLoginSubmit}/>
                        <input className="col btn btn-secondary ml-3" type="button" value="Register"
                               onClick={this.handleRegSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;