import React from "react";
import SharedQuestions from "../shared-questions/shared-questions";
import {connect} from "react-redux";
import {callNextQuestion, replaceAllLettersToEnglish, resetMarkNodeStyle} from "../../../../services/shared";
import "./insertword-questions.scss"

class InsertWordQuestions extends React.Component {
    state = {
        question: {
            sentence: null,
            answer: null
        },
        positiveMark: 20,
        negativeMark: 5,
        errors: 0,
        sendButtonDisabled: false
    }
    getRandomQuestion = () => {
        const {insertWord} = this.props;
        return insertWord[Math.floor(Math.random()*insertWord.length)]
    };
    componentDidMount() {
        console.log("Insert Word Did Mount!");
        console.log(this.getRandomQuestion());
        const question = this.getRandomQuestion();
        let helpString = "";
        for(let i = 0; i < question.answer.length; i++) {
            (question.answer[i] === " ") ? helpString+= ` ` :  helpString+= `_`
        }
        question.sentence = question.sentence.replace(/\*/, helpString);
        this.setState({question});
    }

    onAnswerSubmitted = (event) => {
        event.preventDefault();
        const {question, sendButtonDisabled} = this.state;
        if(!sendButtonDisabled) {
            const node = document.getElementById("insert_word_mark_text");
            resetMarkNodeStyle(node);
            node.style.display = `block`;
            if(replaceAllLettersToEnglish(event.target[0].value.toLowerCase()) === replaceAllLettersToEnglish(question.answer.toLowerCase())) {
                this.setState({sendButtonDisabled: true});
                node.innerText = `+${this.state.positiveMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.replace(`insert_word_mark_text_red`,`insert_word_mark_text_green`);
                setTimeout(() => {
                    callNextQuestion().then(() => null);
                }, 1500);
            } else {
                node.innerText = `-${this.state.negativeMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.add(`insert_word_mark_text_red`);
                this.setState((state) => {
                    let {errors} = state;
                    return {
                        ...state,
                        errors: errors + 1
                    }
                }, () => {
                    if(this.state.errors === 3) {
                        this.setState({sendButtonDisabled: true});
                        document.getElementById("insert_word_input_area").style.color = "green";
                        document.getElementById("insert_word_input_area").value = question.answer;
                        setTimeout(() => {
                            callNextQuestion().then(() => null);
                        }, 1500);
                    }
                });
            }
        }
    }

    render() {
        const {question} = this.state;
        return (
            <div>
                <SharedQuestions questionText={<span>Fugen Sie richtiges Wort ein: <br/><strong>{question.sentence}</strong></span>}/>
                <div>
                    <form onSubmit={this.onAnswerSubmitted}>
                        <div className="form-row justify-content-around align-items-start">
                            <div className="col-sm-10" id="input_answers_col" style={{position: "relative"}}>
                                <div className="insert_word_mark_text" id="insert_word_mark_text"><span>+20</span></div>
                                <input type="text" className="form-control" id="insert_word_input_area" placeholder="Schreiben Sie Ihre Antwort hier!"/>
                                <small className="form-text text-muted">
                                    Fehler: {this.state.errors}/3
                                </small>
                            </div>
                            <button type="submit" className="btn btn-primary col-sm-1">Enter</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        insertWord: state.insertWord
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertWordQuestions);
