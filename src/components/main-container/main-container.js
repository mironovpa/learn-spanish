import React from "react";

import "./main-container.scss";

import {Switch, Route, Redirect} from "react-router-dom";

import QuestionBlock from "./questions-block/question-block";
import QuestionFilter from "./questions-filter/question-filter";
import About from "./about/about";
import Feedback from "./feedback/feedback";
import Stats from "../stats/stats";
import Developers from "./developers/developers";

export default class MainContainer extends React.Component {
    render() {
        return (
            <div className="container main_container">
                <Switch>
                    <Route path="/" exact>
                        <QuestionFilter/>
                        <QuestionBlock/>
                        <Stats/>
                    </Route>
                    <Route path="/about" exact>
                        <About/>
                    </Route>
                    <Route path="/feedback" exact>
                        <Feedback/>
                    </Route>
                    <Route path="/developers" exact>
                        <Developers/>
                    </Route>
                    <Route path="/logout" exact>
                        <Redirect to='/'/>
                    </Route>

                </Switch>

            </div>
        )
    }
}
