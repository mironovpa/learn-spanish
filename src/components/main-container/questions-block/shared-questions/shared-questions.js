import React from "react";

import "./shared-questions.scss";

export default class SharedQuestions extends React.Component {
    render() {
        return (
            <div className="question_box">
                <span className="question_box_text">{this.props.questionText}</span>
            </div>
        )
    }
}
