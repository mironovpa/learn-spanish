import React from "react";
import "./dictionary-questions.scss"
import {connect} from "react-redux";
class ButtonAnswers extends React.Component {
    state = {
        trueAnswer: { spanish: null, german: null },
        shuffledArray: [
            { spanish: null, german: null},
            { spanish: null, german: null},
            { spanish: null, german: null},
            { spanish: null, german: null}
        ],
        isLoading: true,
        answerClicked: false,
        mark: 5
    };
    componentDidMount() {
        console.log("button answers mounted!");
        const {answersArray} = this.props;
        const shuffledArray = [...this.shuffleArray(answersArray)];
        this.setState({
            shuffledArray,
            isLoading: false
        })
    }

    shuffleArray = (array) => {
        let newArray = [...array];
        for(let i = 0; i < newArray.length; i++) {
            let newElID = null;
            do { newElID = Math.floor(Math.random()*newArray.length) } while(newElID === i)
            let oldElement = newArray[newElID];
            newArray[newElID] = newArray[i];
            newArray[i] = oldElement;
        }
        return newArray;
    };
    callNextQuestion = async () => {
        await this.props.resetQuestionComponent();
        await this.props.setQuestionComponentWithFilterID();
    }
    resetBtnClasses = (node) => {
        node.classList.remove("btn-warning");
        node.classList.remove("btn-danger");
        node.classList.remove("btn-info");
    }
    onClickAnswerButton = (event, answer, buttonID) => {
        const {answersArray} = this.props;
        const {answerClicked} = this.state;
        if(answerClicked === false) {
            this.setState({answerClicked: true})
            const buttonNodes = document.querySelectorAll(`#button_answers_node button`);
            for(let i = 0; i < 4; i++) {
                if(buttonNodes[i].textContent === answersArray[3].spanish) {
                    this.resetBtnClasses(buttonNodes[i]);
                    buttonNodes[i].classList.add('btn-success');
                }
                else buttonNodes[i].classList.add("btn-danger")
            }
            const node = document.getElementById("button_answers_mark_text");
            event.target.appendChild(node);
            if(answersArray[3].spanish === answer) {
                node.classList.add(`button_answers_mark_text_green`);
                node.innerText = `+${this.state.mark}`;
            }
            else {
                node.classList.add(`button_answers_mark_text_red`);
                node.innerText = `-${this.state.mark}`;
            }
            node.style.display = `block`;
            node.style.animation = `mark_smoke_up_buttons 0.7s linear forwards`;
            setTimeout(() => {
                this.callNextQuestion().then(() => null);
            }, 1100);
            // setTimeout(() => {
            //     this.props.resetQuestionComponent();
            //     this.props.setQuestionComponentWithFilterID();
            // }, 1000);

        }
    }

    render() {
        const {shuffledArray, isLoading} = this.state;
        if(isLoading) {
            return <div>Идет загрузка!</div>;
        } else {
            return (
                <div className="row justify-content-around button_answers" id="button_answers_node" style={{position: "relative"}}>
                    <div id="button_answers_mark_text" className="button_answers_mark_text">+5</div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-success btn-block btn-lg" onClick={(event) => this.onClickAnswerButton(event, shuffledArray[0].spanish, 0)}>{shuffledArray[0].spanish}</button>
                    </div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-danger btn-block btn-lg" onClick={(event) => this.onClickAnswerButton(event, shuffledArray[1].spanish, 1)}>{shuffledArray[1].spanish}</button>
                    </div>
                    <div className="w-100"></div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-warning btn-block btn-lg" onClick={(event) => this.onClickAnswerButton(event, shuffledArray[2].spanish, 2)}>{shuffledArray[2].spanish}</button>
                    </div>
                    <div className="col-sm-6 mb-1">
                        <button className="btn btn-info btn-block btn-lg" onClick={(event) => this.onClickAnswerButton(event, shuffledArray[3].spanish, 3)}>{shuffledArray[3].spanish}</button>
                    </div>
                </div>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAnswers);
