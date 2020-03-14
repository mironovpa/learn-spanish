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
        return(answersArray);
    }
    componentDidMount() {
    }

    render() {
        if(+this.props.type) {
            let question = this.getRandomNotPhraseQuestion();
            return (
                <div>
                    <SharedQuestions questionText={<span>Geben Sie richtige Übersetzung für das Wort ein: <br/><strong>{question.german}</strong></span>}/>
                    <InputAnswers question={question}/>
                </div>
            )
        } else {
            let answersArray = this.getAllAnswersArray();
            return (
                <div>
                    <SharedQuestions questionText={<span>Wählen Sie richtige Übersetzung für das Wort: <br/><strong>{answersArray[3].german}</strong></span>}/>
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
