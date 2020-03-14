import React from "react";
import SharedQuestions from "../shared-questions/shared-questions";
import {connect} from "react-redux";
import {
    replaceAllLettersToEnglish,
    callNextQuestion,
    resetMarkNodeStyle,
    updateDatabasePoints
} from "../../../../services/shared";
import "./verbconjugation-questions.scss";

class VerbConjugationQuestions extends React.Component {
    state = {
        questionTitle: null,
        questionArray: [null],
        pronounsArray: ["Yo", "Tu", "El/Ella/Usted", "Nosotros", "Vosotros", "Elas/Ellas/Ustedes"],
        positiveMark: 20,
        negativeMark: 5,
        sendButtonDisabled: false,
        errors: 0
    }
    getRandomQuestion = () => {
        const {verbConjugation} = this.props;
        return verbConjugation[Math.floor(Math.random()*verbConjugation.length)]
    }
    createAnswersGridTemplate = () => {
        const {questionArray, pronounsArray} = this.state;
        if(questionArray) {
            const template = [];
            for(let i = 0; i < 6; i++) {
                template.push(
                    <div className="col-sm-2" key={`col-${i}`}>
                        <div className="row text-center">
                            <div className="col-sm-12 mb-1"><strong>{pronounsArray[i]}</strong></div>
                            <div className="col-sm-12 mb-1">
                                <input type="text" className="form-control text-center verb_conjugation_input" placeholder="Verb"/>
                            </div>
                        </div>
                    </div>
                )
            }
            return template;
        } else return null;

    }
    componentDidMount() {
        const randomQuestion = this.getRandomQuestion();
        this.setState({
            questionTitle: randomQuestion[0],
            questionArray: randomQuestion.slice(1)
        });
    }
    onButtonClicked = () => {
        if(!this.state.sendButtonDisabled) {
            const {questionArray, errors, positiveMark, negativeMark} = this.state;
            let trueAnswers = 0;
            const inputsNodeCollection = document.getElementsByClassName("verb_conjugation_input");
            const node = document.getElementById("conjugation_answers_mark_text");
            resetMarkNodeStyle(node);
            for(let i = 0; i < 6; i++) {
                if(replaceAllLettersToEnglish(inputsNodeCollection[i].value.toLowerCase()) === replaceAllLettersToEnglish(questionArray[i].toLowerCase())) {
                    trueAnswers++;
                    inputsNodeCollection[i].readOnly = true;
                    inputsNodeCollection[i].style.border = `2px solid green`;
                } else {
                    inputsNodeCollection[i].style.border = `1px solid red`;
                }
            }
            node.style.animation = `mark_smoke_up_buttons 0.7s linear forwards`;
            node.style.display = `block`;
            if(trueAnswers === 6) {
                this.setState({sendButtonDisabled: true});
                node.classList.replace(`conjugation_answers_mark_text_red`, `conjugation_answers_mark_text_green`);
                node.innerText = `+${positiveMark}`;
                updateDatabasePoints(positiveMark);
                setTimeout(callNextQuestion, 1500);
            } else {
                node.classList.add(`conjugation_answers_mark_text_red`);
                node.innerText = `-${negativeMark}`;
                updateDatabasePoints(-negativeMark);
                if(errors === 2) {
                    this.setState({sendButtonDisabled: true});
                    setTimeout(callNextQuestion, 1500);
                }
                this.setState((state) => {
                    return {
                        ...state,
                        errors: state.errors + 1
                    }
                })
            }
        }
    }
    render() {
        const {questionTitle, errors} = this.state;
        return (
            <div>
                <SharedQuestions questionText={<span>Konjugieren Sie das Verb <strong>{questionTitle}</strong></span>}/>
                <div className="row justify-content-around mb-2">
                    {this.createAnswersGridTemplate()}
                </div>
                <div className="row justify-content-around pl-3 pr-3 pl-sm-0 pr-sm-0">
                    <button className="btn btn-success btn-block col-sm-12" onClick={this.onButtonClicked}>
                        ANTWORTEN UBERPRUFEN | <small>VERSUCH: {errors}/3</small>
                        <div id="conjugation_answers_mark_text" className="conjugation_answers_mark_text">+5</div>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        verbConjugation: state.verbConjugation
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserPoints: (points) => {
            dispatch({type: "SET_USER_POINTS", points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerbConjugationQuestions);
