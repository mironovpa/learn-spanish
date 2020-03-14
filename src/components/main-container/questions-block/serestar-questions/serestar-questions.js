import React from "react";
import {connect} from "react-redux";
import {callNextQuestion, updateDatabasePoints} from "../../../../services/shared";
import SharedQuestions from "../shared-questions/shared-questions";
import "./serestar-questions.scss";

class SerEstarQuestions extends React.Component {
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
        const {serEstar} = this.props;
        return serEstar[Math.floor(Math.random()*serEstar.length)]
    }

    resetBtnClasses = (node) => {
        node.classList.remove("btn-warning");
        node.classList.remove("btn-info");
    }
    onButtonClicked = (event, answer) => {
        if(!this.state.answerClicked) {
            this.setState({answerClicked: true});
            const {question, mark} = this.state;
            const buttonNodes = document.querySelectorAll(`.ser_estar_answers button`);
            for(let i = 0; i < buttonNodes.length; i++) {
                this.resetBtnClasses(buttonNodes[i]);
                (buttonNodes[i].innerText.toLowerCase() === question.answer.toLowerCase()) ? buttonNodes[i].classList.add("btn-success") : buttonNodes[i].classList.add("btn-danger");
            }
            const node = document.getElementById("ser_estar_answers_mark_text");
            event.target.appendChild(node);
            if(answer.toLowerCase() === question.answer.toLowerCase()) {
                node.classList.add(`ser_estar_answers_mark_text_green`);
                node.innerText = `+${mark}`;
                updateDatabasePoints(mark);
            } else {
                node.classList.add(`ser_estar_answers_mark_text_red`);
                node.innerText = `-${mark}`;
                updateDatabasePoints(-mark);
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
                <SharedQuestions questionText={<span>Wahlen Sie zwischen <strong>"Ser"</strong> und <strong>"Estar"</strong>:<br/> <strong>{question.sentence}</strong></span>}/>
                <div className="row justify-content-around ser_estar_answers">
                    <div id="ser_estar_answers_mark_text" className="ser_estar_answers_mark_text">+5</div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-info btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "ser") }}>SER</button>
                    </div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-warning btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "estar") }}>ESTAR</button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        serEstar: state.serEstar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserPoints: (points) => {
            dispatch({type: "SET_USER_POINTS", points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SerEstarQuestions);
