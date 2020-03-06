import React from "react";

import WordsFilter from "./words-filter/words-filter";

import './header.scss';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-sm-4"><span>Let's Learn Spanish!</span></div>
                        <WordsFilter/>
                        <div className="col-sm-2 header_login">
                            <div className="row justify-content-center">
                                <span>Login</span>
                            </div>
                        </div>
                        <div className="col-sm-2 header_online">
                            <div className="row justify-content-center">
                                <span>JETZT ONLINE: 25</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
