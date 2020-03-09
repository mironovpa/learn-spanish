import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/app/app";


////////// STORE STUFF  //////////////////
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {dictionary} from "./questions/dictionary";
import {insertWord} from "./questions/insert-word";
import {muyMucho} from "./questions/muy-mucho";
import {serEstar} from "./questions/ser-estar";
import {verbConjugation} from "./questions/verb-conjugation";

const initialState = {
    filterSettings: [
        {id: 0, name: "Ubersetzung mit 4 Antwortmoglichkeiten", filter: false},
        {id: 1, name: "Ubersetzung und Antwort selbst schreiben", filter: false},
        {id: 2, name: "Verstandniss und richtiges Wort schreiben", filter: false},
        {id: 3, name: "Weiblich oder Mannlich", filter: true},
        {id: 4, name: "Muy oder Mucho Frage", filter: false},
        {id: 5, name: "Ser oder Estar", filter: false},
        {id: 6, name: "Verb Konjugation", filter: true}
    ],
    dictionary,
    insertWord,
    muyMucho,
    serEstar,
    verbConjugation
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case "GET_FILTER_ARRAY": console.log("GET_FILTER_ARRAY"); return state;
        case "TOGGLE_FILTER_ELEMENT":
            let filterSettings = [...state.filterSettings];
            filterSettings[action.id].filter = action.newState;
            console.log(filterSettings.map(el => el.filter))
            return {
                ...state,
                filterSettings
            }
        default: return state;
    }
}


const store = createStore(reducer);
store.dispatch({type: "TOGGLE_FILTER_ELEMENT", id: 0, newState: false})
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
