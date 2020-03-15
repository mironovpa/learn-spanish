import React from "react";

import Login from "./login/login";

import './header.scss';
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Header extends React.Component {
    state = {
        currentOnline: 0,
        screenWidth: window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth,
        intervalID: null
    }
    componentDidMount() {
        const intervalID = setInterval(() => {
            fetch(`${this.props.serverURL}online`)
                .then((res) => {
                    return res.text();
                })
                .then((text) => {
                    this.setState({currentOnline: +text});
                })
        }, 10000);
        this.setState({intervalID});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    getCurrentOnlineTemplate = () => {
        const {screenWidth, currentOnline} = this.state;
        if(screenWidth > 500) {
            return (<span>JETZT ONLINE: {currentOnline}</span>);
        } else {
            return (<span>ONLINE: {currentOnline}</span>);
        }
    }

    getLoginTemplate = () => {
        const {loginStatus, userData} = this.props;
        if(loginStatus) {
            // const screenWidth = window.innerWidth
            //     || document.documentElement.clientWidth
            //     || document.body.clientWidth;
            const {screenWidth} = this.state;
            if(screenWidth > 991) {
                return <span>Servus, <strong>{userData.login}</strong>! Punkte: <strong>{userData.points}</strong></span>;
            } else {
                return <span><i className="fas fa-user-graduate"></i> <strong>{userData.login} ({userData.points }Pts.)</strong></span>;
            }

        } else {
            return (
                <React.Fragment>
                    <button className="header_login_button" type="button" data-toggle="modal" data-target="#login_modal">ANMELDEN</button>
                    <Login/>
                </React.Fragment>
            )
        }
    }
    render() {
        return (
            <div className="header">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-12 col-sm-0 col-md-4 header_logo text-center"><NavLink to="/"><span>Let's Learn Spanish!</span></NavLink></div>
                        {/*<WordsFilter/>*/}
                        <div className="col-4 col-sm-5 col-md-4 header_online">
                            <div className="row justify-content-center">
                                {this.getCurrentOnlineTemplate()}
                            </div>
                        </div>
                        <div className="col-8 col-sm-7 col-md-4 header_login">
                            <div className="row justify-content-end pr-3 pr-sm-1 pr-md-2">
                                {this.getLoginTemplate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.loginStatus,
        userData: state.userData,
        serverURL: state.serverURL
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

