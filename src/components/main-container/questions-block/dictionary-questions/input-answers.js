import React from "react";
import {connect} from "react-redux";
import {callNextQuestion,replaceAllLettersToEnglish, resetMarkNodeStyle} from "../../../../services/shared";

class InputAnswers extends React.Component {
    state = {
        question: {
            spanish: null,
            german: null
        },
        errors: 0,
        positiveMark: 20,
        negativeMark: 5,
        sendButtonDisabled: false
    }
    componentDidMount() {
        this.setState({
            question: this.props.question
        })
    };
    onAnswerSubmitted = (event) => {
        event.preventDefault();
        const {question, sendButtonDisabled} = this.state;
        if(!sendButtonDisabled) {
            const node = document.getElementById("input_answers_mark_text");
            resetMarkNodeStyle(node);
            node.style.display = `block`;
            if(replaceAllLettersToEnglish(event.target[0].value.toLowerCase()) === replaceAllLettersToEnglish(question.spanish.toLowerCase())) {
                this.setState({sendButtonDisabled: true});
                node.innerText = `+${this.state.positiveMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.replace(`input_answers_mark_text_red`, `input_answers_mark_text_green`);
                setTimeout(() => {
                    callNextQuestion().then(() => null);
                }, 1500);
            } else {
                node.innerText = `-${this.state.negativeMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.add(`input_answers_mark_text_red`);
                this.setState((state) => {
                    let {errors} = state;
                    return {
                        ...state,
                        errors: errors + 1
                    }
                }, () => {
                    if(this.state.errors === 3) {
                        this.setState({sendButtonDisabled: true});
                        document.getElementById("input_answers_input_area").style.color = "green";
                        document.getElementById("input_answers_input_area").value = question.spanish;
                        setTimeout(() => {
                            callNextQuestion().then(() => null);
                        }, 1500);
                    }
                });
            }
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onAnswerSubmitted}>
                    <div className="form-row justify-content-around align-items-start">
                        <div className="col-sm-10" id="input_answers_col" style={{position: "relative"}}>
                            <div className="input_answers_mark_text" id="input_answers_mark_text"><span>+20</span></div>
                            <input type="text" className="form-control" id="input_answers_input_area" placeholder="Schreiben Sie Ihre Antwort hier!"/>
                            <small className="form-text text-muted">
                                Fehler: {this.state.errors}/3
                            </small>
                        </div>
                        <button type="submit" className="btn btn-primary col-sm-1">Enter</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resetQuestionComponent: () => {
            dispatch({type: "RESET_QUESTION_COMPONENT"});
        },
        setQuestionComponentWithFilterID: () => {
            dispatch({type: "SET_QUESTION_COMPONENT_WITH_FILTER_ID"});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputAnswers);
