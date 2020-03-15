import React from "react";

import DictionaryQuestions
    from "../components/main-container/questions-block/dictionary-questions/dictionary-questions";
import InsertWordQuestions
    from "../components/main-container/questions-block/insertword-questions/insertword-questions";
import MannlichWeiblichQuestions
    from "../components/main-container/questions-block/mannlicweiblich-questions/mannlichweiblich-questions";
import MuyMuchoQuestions from "../components/main-container/questions-block/muymucho-questions/muymucho-questions";
import SerEstarQuestions from "../components/main-container/questions-block/serestar-questions/serestar-questions";
import VerbConjugationQuestions
    from "../components/main-container/questions-block/verbconjugation-questions/verbconjugation-questions";

import {dictionary} from "../questions/dictionary";
import {insertWord} from "../questions/insert-word";
import {mannlichWeiblich} from "../questions/mannlich-weiblich";
import {muyMucho} from "../questions/muy-mucho";
import {serEstar} from "../questions/ser-estar";
import {verbConjugation} from "../questions/verb-conjugation";

const initialState = {
    filterSettings: [
        {id: 0, name: "Ubersetzung mit 4 Antwortmoglichkeiten", filter: true},
        {id: 1, name: "Ubersetzung und Antwort selbst schreiben", filter: true},
        {id: 2, name: "Verstandniss und richtiges Wort schreiben", filter: true},
        {id: 3, name: "Weiblich oder Mannlich", filter: true},
        {id: 4, name: "Muy oder Mucho Frage", filter: true},
        {id: 5, name: "Ser oder Estar", filter: true},
        {id: 6, name: "Verb Konjugation", filter: true}
    ],
    dictionary,
    insertWord,
    mannlichWeiblich,
    muyMucho,
    serEstar,
    verbConjugation,
    currentQuestionComponent: null,
    loginStatus: false,
    userData: {
        login: null,
        email: null,
        points: null
    },
    serverURL: `https://learn-spain-server.herokuapp.com/`
}


export default function reducer(state = initialState, action) {
    switch(action.type) {
        case "TOGGLE_FILTER_ELEMENT": {
            let filterSettings = [...state.filterSettings];
            filterSettings[action.id].filter = action.newState;
            return {
                ...state,
                filterSettings
            };
        }
        case "SET_QUESTION_COMPONENT_WITH_FILTER_ID": {
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
            return {
                ...state,
                currentQuestionComponent: null
            }
        }
        case "SET_LOGIN_STATUS_TRUE": {
            return {
                ...state,
                loginStatus: true
            }
        }
        case "SET_LOGIN_STATUS_FALSE": {
            return {
                ...state,
                loginStatus: false
            }
        }
        case "SET_LOGIN_DATA": {
            return {
                ...state,
                userData: {
                    login: action.login,
                    email: action.email,
                    points: action.points
                }
            }
        }
        case "RESET_LOGIN_DATA": {
            return {
                ...state,
                userData: {
                    login: null,
                    email: null,
                    points: null
                }
            }
        }
        case "SET_USER_POINTS": {
            if(state.loginStatus) {
                return {
                    ...state,
                    userData: {
                        ...state.userData,
                        points: action.points
                    }
                }
            } else {
                return {...state};
            }

        }
        default: return state;
    }
}
