import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app/app";


////////// STORE STUFF  //////////////////
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {dictionary} from "./questions/dictionary";
import {insertWord} from "./questions/insert-word";
import {mannlichWeiblich} from "./questions/mannlich-weiblich";
import {muyMucho} from "./questions/muy-mucho";
import {serEstar} from "./questions/ser-estar";
import {verbConjugation} from "./questions/verb-conjugation";
import DictionaryQuestions from "./components/main-container/questions-block/dictionary-questions/dictionary-questions";
import InsertWordQuestions from "./components/main-container/questions-block/insertword-questions/insertword-questions";
import MannlichWeiblichQuestions
    from "./components/main-container/questions-block/mannlicweiblich-questions/mannlichweiblich-questions";
import MuyMuchoQuestions from "./components/main-container/questions-block/muymucho-questions/muymucho-questions";
import SerEstarQuestions from "./components/main-container/questions-block/serestar-questions/serestar-questions";
import VerbConjugationQuestions
    from "./components/main-container/questions-block/verbconjugation-questions/verbconjugation-questions";

const initialState = {
    filterSettings: [
        {id: 0, name: "Ubersetzung mit 4 Antwortmoglichkeiten", filter: false},
        {id: 1, name: "Ubersetzung und Antwort selbst schreiben", filter: false},
        {id: 2, name: "Verstandniss und richtiges Wort schreiben", filter: false},
        {id: 3, name: "Weiblich oder Mannlich", filter: false},
        {id: 4, name: "Muy oder Mucho Frage", filter: false},
        {id: 5, name: "Ser oder Estar", filter: false},
        {id: 6, name: "Verb Konjugation", filter: true}
    ],
    dictionary,
    insertWord,
    mannlichWeiblich,
    muyMucho,
    serEstar,
    verbConjugation,
    currentQuestionComponent: null
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case "GET_FILTER_ARRAY": {
            console.log("GET_FILTER_ARRAY"); return state;
        }
        case "TOGGLE_FILTER_ELEMENT": {
            console.log("TOGGLE_FILTER_ELEMENT", action.id);
            let filterSettings = [...state.filterSettings];
            filterSettings[action.id].filter = action.newState;
            console.log(filterSettings.map(el => el.filter))
            return {
                ...state,
                filterSettings
            };
        }
        case "SET_QUESTION_COMPONENT_WITH_FILTER_ID": {
            console.log("SET_QUESTION_COMPONENT_WITH_FILTER_ID");
            const filterSettings = [...state.filterSettings];
            const availableFilterIDs = filterSettings.filter(el => el.filter).map(el => el.id);
            let currentQuestionComponent = null;
            switch(availableFilterIDs[Math.floor(Math.random()*availableFilterIDs.length)]) {
                case 0: currentQuestionComponent = <DictionaryQuestions type="0"/>; break;
                case 1: currentQuestionComponent = <DictionaryQuestions type="1"/>; break;
                case 2: currentQuestionComponent = <InsertWordQuestions/>; break;
                case 3: currentQuestionComponent = <MannlichWeiblichQuestions/>; break;
                case 4: currentQuestionComponent = <MuyMuchoQuestions/>; break;
                case 5: currentQuestionComponent = <SerEstarQuestions/>; break;
                case 6: currentQuestionComponent = <VerbConjugationQuestions/>; break;
                default: currentQuestionComponent = null;
            }
            return {
                ...state,
                currentQuestionComponent
            }
        }
        case "RESET_QUESTION_COMPONENT": {
            console.log("RESET_QUESTION_COMPONENT");
            return {
                ...state,
                currentQuestionComponent: null
            }
        }
        default: return state;
    }
}


const store = createStore(reducer);
///////////////////////////////
// import store from './redux/store'

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

export {store}
