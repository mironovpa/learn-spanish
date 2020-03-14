import React from "react";
import "./footer.scss";

import {NavLink} from "react-router-dom";
import {connect} from "react-redux";

class Footer extends React.Component {
    userLogout = () => {
        const {resetLoginData, setLoginStatusFalse} = this.props;
        resetLoginData();
        setLoginStatusFalse();
        window.localStorage.removeItem(`token`);
    };
    logoutTemplate = () => {
        const {loginStatus} = this.props;
        if (loginStatus) {
            return (
                    <li className="footer_navigation_ul_li">
                        <NavLink to="/logout" exact activeClassName="footer_active_link" onClick={this.userLogout}>Logout</NavLink>
                    </li>
                )
        } else {
            return null;
        }
    }

    render() {

        return (
            <div className="container mt-4">
                <div className="row footer align-items-center">
                    <div className="col-sm-6 col-12">
                        <nav>
                            <ul className="footer_navigation_ul">
                                <li className="footer_navigation_ul_li"><NavLink to="/" exact activeClassName="footer_active_link">Home</NavLink></li>
                                <li className="footer_navigation_ul_li"><NavLink to="/about" exact activeClassName="footer_active_link">About</NavLink></li>
                                <li className="footer_navigation_ul_li"><NavLink to="/feedback" exact activeClassName="footer_active_link">Feedback</NavLink></li>
                                {this.logoutTemplate()}
                            </ul>
                        </nav>
                    </div>
                    <div className="col-sm-4 col-12 footer_copyrights">&copy; ALL RIGHTS RESERVED 2020</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginStatus: state.loginStatus
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLoginStatusFalse: () => {
            dispatch({type: "SET_LOGIN_STATUS_FALSE"});
        },
        resetLoginData: () => {
            dispatch({type: "RESET_LOGIN_DATA"});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
