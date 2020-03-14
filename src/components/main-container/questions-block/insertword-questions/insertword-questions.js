import React from "react";
import SharedQuestions from "../shared-questions/shared-questions";
import {connect} from "react-redux";
import {
    callNextQuestion,
    replaceAllLettersToEnglish,
    resetMarkNodeStyle,
    updateDatabasePoints
} from "../../../../services/shared";
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
    };
    getRandomQuestion = () => {
        const {insertWord} = this.props;
        return insertWord[Math.floor(Math.random()*insertWord.length)]
    };
    componentDidMount() {
        let {answer, sentence} = this.getRandomQuestion();
        let helpString = "";
        for(let i = 0; i < answer.length; i++) {
            (answer[i] === " ") ? helpString+= ` ` :  helpString+= `_`
        }
        sentence = sentence.replace(/\*/, helpString);
        this.setState({question: { sentence, answer } });
    }
    onAnswerSubmitted = (event) => {
        event.preventDefault();
        const {question, sendButtonDisabled, positiveMark, negativeMark} = this.state;
        if(!sendButtonDisabled) {
            const node = document.getElementById("insert_word_mark_text");
            resetMarkNodeStyle(node);
            node.style.display = `block`;
            if(replaceAllLettersToEnglish(event.target[0].value.toLowerCase()) === replaceAllLettersToEnglish(question.answer.toLowerCase())) {
                this.setState({sendButtonDisabled: true});
                node.innerText = `+${positiveMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.replace(`insert_word_mark_text_red`,`insert_word_mark_text_green`);
                updateDatabasePoints(positiveMark);
                setTimeout(callNextQuestion, 1500);
            } else {
                node.innerText = `-${negativeMark}`;
                node.style.animation = `mark_smoke_up_input 0.7s linear forwards`;
                node.classList.add(`insert_word_mark_text_red`);
                updateDatabasePoints(-negativeMark);
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
                        setTimeout(callNextQuestion, 1500);
                    }
                });
            }
        }
    }

    render() {
        const {question, errors} = this.state;
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
                                    Fehler: {errors}/3
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
        setUserPoints: (points) => {
            dispatch({type: "SET_USER_POINTS", points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsertWordQuestions);
