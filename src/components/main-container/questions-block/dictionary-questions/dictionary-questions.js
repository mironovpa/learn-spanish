import React from "react";
import SharedQuestions from "../shared-questions/shared-questions";
import ButtonAnswers from "./button-answers";
import InputAnswers from "./input-answers";
import {connect} from "react-redux";

class DictionaryQuestions extends React.Component {
    state = {
        allAnswersArray: null,
    }
    getRandomQuestion = () => {
        const {dictionary} = this.props;
        return dictionary[Math.floor(Math.random()*dictionary.length)]
    }
    getRandomNotPhraseQuestion = () => {
        const {dictionary} = this.props;
        const dictionaryWithoutPhrases = dictionary.filter((el) => el.speech !== "phrase");
        return dictionaryWithoutPhrases[Math.floor(Math.random()*dictionaryWithoutPhrases.length)]
    }
    getAllAnswersArray = () => {
        const randomQuestion = this.getRandomQuestion();
        const {dictionary} = this.props;
        const dictionaryWithSameSpeech = dictionary.filter((el) => randomQuestion.speech === el.speech);
        let answersArray = [];
        for(let i = 0; i < 3; i++) {
            do { answersArray[i] = dictionaryWithSameSpeech[Math.floor(Math.random()*dictionaryWithSameSpeech.length)]; }
            while (answersArray[i].german === randomQuestion.german);
        }
        answersArray.push(randomQuestion);
        console.log(randomQuestion);
        console.log(answersArray);
        return(answersArray);
    }
    componentDidMount() {
    }

    render() {
        console.log("DICTIONARY-QUESTIONS WAS RERENDERED!");
        if(+this.props.type) {
            let question = this.getRandomNotPhraseQuestion();
            return (
                <div>
                    <SharedQuestions questionText={<span>Ubersetzen und schreiben Sie: <strong>{question.german}</strong></span>}/>
                    <InputAnswers question={question}/>
                </div>
            )
        } else {
            let answersArray = this.getAllAnswersArray();
            return (
                <div>
                    <SharedQuestions questionText={<span>Ubersetzen Sie: <strong>{answersArray[3].german}</strong></span>}/>
                    <ButtonAnswers answersArray={answersArray}/>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        dictionary: state.dictionary
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryQuestions);
