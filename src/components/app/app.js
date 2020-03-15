import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Header from "../header/header";
import MainContainer from "../main-container/main-container";
import Footer from "../footer/footer";
import {connect} from "react-redux";

class App extends React.Component {
    componentDidMount() {
        const {setLoginData, setLoginStatusTrue, loginStatus} = this.props;
        if(loginStatus === false) {
            const token = window.localStorage.getItem(`token`);
            if(token) {
                fetch(`${this.props.serverURL}checklogin`, {
                    method: 'POST',
                    body: JSON.stringify(token)
                })
                    .then((response) => {return response.json()})
                    .then((data) => {
                        const {status, name, email, points} = data;
                        if(status === true) {
                            setLoginData(name, email, points);
                            setLoginStatusTrue();
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/">
                        <MainContainer/>
                    </Route>
                </Switch>
                <Footer/>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loginStatus: state.loginStatus,
        userData: state.loginData,
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
