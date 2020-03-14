import React from "react";

import "./words-filter.scss"
export default class WordsFilter extends React.Component {
    state = {
        filterState: false
    };
    changeFilterState = () => {
        if(this.state.allWords) {
            this.setState({allWords: false});
        } else {
            this.setState({allWords: true});
        }
    }
    render() {
        let {allWords} = this.state;
        let filterText = (allWords) ? 'Alle Worte (A1/A2)' : 'Nur Notwendige Worte';
        return (
            <div className="col-sm-4 header_filter">
                <div className="row justify-content-end">
                    <div className="custom-control custom-switch">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                        <label className="custom-control-label" htmlFor="customSwitch1" onClick={this.changeFilterState}>{filterText}</label>
                    </div>
                </div>
            </div>
        )
    }
}
