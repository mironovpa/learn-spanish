import React from "react";
import {connect} from "react-redux";

import "./login.scss";

class Login extends React.Component {
    state = {
        loginData: {
            login: null,
            email: null
        }
    }
    onLoginValueChange = (event) => {
        const login = event.target.value;
        const MAX_LENGTH = 20;
        if(login.length > 20) event.target.value = login.slice(0, MAX_LENGTH);
        this.setState((state) => {
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    login: login.slice(0, MAX_LENGTH)
                }
            }
        });
    }
    onEMailValueChange = (event) => {
        const email = event.target.value;
        const MAX_LENGTH = 20;
        if(email.length > 20) event.target.value = email.slice(0, MAX_LENGTH);
        this.setState((state) => {
            return {
                ...state,
                loginData: {
                    ...state.loginData,
                    email: email.slice(0, MAX_LENGTH)
                }
            }
        });
    };
    removeModal = () => {
        document.querySelector(`body`).classList.remove(`modal-open`);
        document.getElementsByClassName(`modal-backdrop fade show`)[0].remove();
    }
    onLoginDone = () => {
        const {loginData} = this.state;
        if(loginData.login.length <= 24 && loginData.email.length <= 24) {
            fetch(`${this.props.serverURL}login`, {
                method: 'POST',
                body: JSON.stringify(loginData)
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const {status, reason, login, email, points} = data;
                const {setLoginStatusTrue, setLoginData} = this.props;
                if(status === "ok") {
                    this.removeModal();
                    document.getElementById("login_input_email").classList.remove("login_input_email_false");
                    setLoginStatusTrue();
                    setLoginData(login, email, points);
                    window.localStorage.setItem(`token`, `${data.token}`);
                } else {
                    if(reason === "EMAIL_INCORRECT") {
                        document.getElementById("login_input_email").value = '';
                        document.getElementById("login_input_email").classList.add("login_input_email_false");
                        document.getElementById("login_input_email").placeholder = 'EMAIL IST FALSCH!';
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    render() {
        const {email, login} = this.state.loginData;
        return (
            <div className="modal fade" id="login_modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ANMELDEN</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <small>Geben Sie Ihre Name als Login und E-Mail als Passwort ein.</small>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="login_label_name">Name</span>
                                </div>
                                <input type="text" className="form-control" placeholder="" aria-label=""
                                       aria-describedby="login_label_name" id="login_input_name" onChange={this.onLoginValueChange}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="login_label_email">eMail</span>
                                </div>
                                <input type="text" className="form-control" placeholder="" aria-label=""
                                       aria-describedby="login_label_email" id="login_input_email" onChange={this.onEMailValueChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                            <button type="button" className="btn btn-primary" disabled={(!email || !login)} onClick={this.onLoginDone}>Anmelden</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        serverURL: state.serverURL
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginStatusTrue: () => {
            dispatch({type: "SET_LOGIN_STATUS_TRUE"});
        },
        setLoginData: (login, email, points) => {
            dispatch({type: "SET_LOGIN_DATA", login, email, points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
