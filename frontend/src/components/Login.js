import React, {useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {login} from "../service/requests";
import {register} from "../service/requests";
import {Messages} from 'primereact/messages';
import LoginHeader from "./LoginHeader";

export function Login(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loginValid, setLoginValid] = useState(null);
    const [passwordValid, setPasswordValid] = useState(null);
    const messages = useRef();

    const validateValues = () => {
        let loginIsValid = false;
        let passIsValid = false;
        if (name !== '' && name.match("^[A-Za-z0-9_-]{1,14}$")) {
            loginIsValid = true;
            setLoginValid(true);
        } else setLoginValid(false);


        if (password.length >= 4) {
            passIsValid = true;
            setPasswordValid(true);
        } else setPasswordValid(false);

        return loginIsValid && passIsValid;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        messages.current.clear();
        login(name, password).then(response => {
            if (response.ok) {
                response.text().then(text => {
                        localStorage.setItem("auth", text);
                        props.history.push('/');
                    }
                );
            } else {
                if (response.status === 401) {
                    response.text().then(text => {
                            messages.current.show({sticky: true, severity: 'error', detail: text});
                        }
                    );
                } else messages.current.show({
                    sticky: true,
                    severity: 'error',
                    detail: 'Something went wrong. Try again'
                });
            }
        });
    };

    const handleRegSubmit = (e) => {
        e.preventDefault();
        messages.current.clear();
        if (validateValues()) {
            register(name, password).then(response => {
                if (response.ok) {
                    response.text().then(text =>
                        messages.current.show({sticky: true, severity: 'success', detail: text})
                    );
                } else response.text().then(text =>
                    messages.current.show({sticky: true, severity: 'error', detail: text})
                );
            });
        }
    };


    const handleLoginChange = (e) => {
        const newLogin = e.target.value;
        setName(newLogin);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
    };

    return (
        <div className="w-100">
            <LoginHeader/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-sm">
                        <Messages ref={messages}/>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" className="form-control" name="username"
                                       value={name}
                                       autoComplete="off"
                                       onChange={handleLoginChange}/>
                            {!loginValid && loginValid !== null &&
                            <small style={{color: "#BF0B10"}}>Login can't be empty and can contain only latin letters,
                                numbers, dashes and underscores</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Password</label>
                            <Password id="password" className="form-control" name="password"
                                      feedback={false}
                                      value={password}
                                      onChange={handlePasswordChange}/>
                            {!passwordValid && passwordValid !== null &&
                            <small style={{color: "#BF0B10"}}>Password must be at least 4 characters long</small>}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-sm d-flex justify-content-center">
                        <input className="col btn btn-primary mr-3" type="button" value="Login"
                               onClick={handleLoginSubmit}/>
                        <input className="col btn btn-secondary ml-3" type="button" value="Register"
                               onClick={handleRegSubmit}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
