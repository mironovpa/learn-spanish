import React from "react";
import SharedQuestions from "../shared-questions/shared-questions";
import {connect} from "react-redux";
import "./mannlichweiblich-questions.scss";
import {callNextQuestion, updateDatabasePoints} from "../../../../services/shared";

class MannlichWeiblichQuestions extends React.Component {
    state = {
        question: {
            sentence: null,
            answer: null
        },
        mark: 5,
        answerClicked: false
    }
    componentDidMount() {
        this.setState({question: this.getRandomQuestion()});
    }
    getRandomQuestion = () => {
        const {mannlichWeiblich} = this.props;
        return mannlichWeiblich[Math.floor(Math.random()*mannlichWeiblich.length)]
    }

    resetBtnClasses = (node) => {
        node.classList.remove("btn-warning");
        node.classList.remove("btn-info");
    }
    onButtonClicked = (event, answer) => {
        if(!this.state.answerClicked) {
            this.setState({answerClicked: true});
            const {question, mark} = this.state;
            const buttonNodes = document.querySelectorAll(`.mannlich_weiblich_answers button`);
            for(let i = 0; i < buttonNodes.length; i++) {
                this.resetBtnClasses(buttonNodes[i]);
                (buttonNodes[i].innerText.toLowerCase() === question.answer.toLowerCase()) ? buttonNodes[i].classList.add("btn-success") : buttonNodes[i].classList.add("btn-danger");
            }
            const node = document.getElementById("mannlich_weiblich_answers_mark_text");
            event.target.appendChild(node);
            if(answer.toLowerCase() === question.answer.toLowerCase()) {
                node.classList.add(`mannlich_weiblich_answers_mark_text_green`);
                node.innerText = `+${mark}`;
                updateDatabasePoints(this.state.mark);
            } else {
                node.classList.add(`mannlich_weiblich_answers_mark_text_red`);
                node.innerText = `-${mark}`;
                updateDatabasePoints(-this.state.mark);
            }
            node.style.display = `block`;
            node.style.animation = `mark_smoke_up_buttons 0.7s linear forwards`;
            setTimeout(callNextQuestion, 1500);
        }
    }
    render() {
        const {question} = this.state;
        return (
            <div>
                <SharedQuestions questionText={<span>Wahlen Sie richtigen Artikel: <strong>{question.sentence}</strong></span>}/>
                <div className="row justify-content-around mannlich_weiblich_answers">
                    <div id="mannlich_weiblich_answers_mark_text" className="mannlich_weiblich_answers_mark_text">+5</div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-info btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "el") }}>EL</button>
                    </div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-warning btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "la") }}>LA</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mannlichWeiblich: state.mannlichWeiblich
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserPoints: (points) => {
            dispatch({type: "SET_USER_POINTS", points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MannlichWeiblichQuestions);
