import React from "react";

import "./main-container.scss";

import QuestionBlock from "./questions-block/question-block";
import QuestionFilter from "./questions-filter/question-filter";

export default class MainContainer extends React.Component {
    render() {
        return (
            <div className="container main_container">
                <QuestionFilter/>
                <QuestionBlock/>
            </div>
        )
    }
}
