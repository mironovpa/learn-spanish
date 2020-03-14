import React from "react";
import {callNextQuestion, updateDatabasePoints} from "../../../../services/shared";
import SharedQuestions from "../shared-questions/shared-questions";
import {connect} from "react-redux";
import "./muymucho-questions.scss";

class MuyMuchoQuestions extends React.Component {
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
        const {muyMucho} = this.props;
        return muyMucho[Math.floor(Math.random()*muyMucho.length)]
    }

    resetBtnClasses = (node) => {
        node.classList.remove("btn-warning");
        node.classList.remove("btn-info");
    }
    onButtonClicked = (event, answer) => {
        if(!this.state.answerClicked) {
            this.setState({answerClicked: true});
            const {question, mark} = this.state;
            const buttonNodes = document.querySelectorAll(`.muy_mucho_answers button`);
            for(let i = 0; i < buttonNodes.length; i++) {
                this.resetBtnClasses(buttonNodes[i]);
                (buttonNodes[i].innerText.toLowerCase() === question.answer.toLowerCase()) ? buttonNodes[i].classList.add("btn-success") : buttonNodes[i].classList.add("btn-danger");
            }
            const node = document.getElementById("muy_mucho_answers_mark_text");
            event.target.appendChild(node);
            if(answer.toLowerCase() === question.answer.toLowerCase()) {
                node.classList.add(`muy_mucho_answers_mark_text_green`);
                node.innerText = `+${mark}`;
                updateDatabasePoints(mark);
            } else {
                node.classList.add(`muy_mucho_answers_mark_text_red`);
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
                <SharedQuestions questionText={<span>Wahlen Sie zwischen <strong>"Muy"</strong> and <strong>"Mucho"</strong>:<br/> <strong>{question.sentence}</strong></span>}/>
                <div className="row justify-content-around muy_mucho_answers">
                    <div id="muy_mucho_answers_mark_text" className="muy_mucho_answers_mark_text">+5</div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-info btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "muy") }}>MUY</button>
                    </div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-warning btn-lg btn-block" onClick={(event) => { this.onButtonClicked(event, "mucho") }}>MUCHO</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        muyMucho: state.muyMucho
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setUserPoints: (points) => {
            dispatch({type: "SET_USER_POINTS", points});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MuyMuchoQuestions);
