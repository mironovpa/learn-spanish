import React from "react";

import "./question-filter.scss"

import { connect } from 'react-redux'

class QuestionFilter extends React.Component {
    state = {
        isMainFilterOpened: false
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("COMPONENT WAS UPDATED")
    }

    toggleMainFilter = (event) => {
        const cList = document.getElementById("question_filter_first_row").classList;
        if(this.state.isMainFilterOpened && cList.contains("collapsed")) this.setState({isMainFilterOpened: false})
        else if(!this.state.isMainFilterOpened && !cList.contains("collapsed")) this.setState({isMainFilterOpened: true})
    }
    checkBoxChange = (event, id) => {
        this.props.toggleFilterElement(id, event.target.checked);
        const newState = this.props.filterSettings;
        console.log(newState.filter(el => el.filter).map(el => el.filter));
    }
    render() {
        const {filterSettings} = this.props;
        console.log(filterSettings.map((el) => el.filter))
        const openFilterIcon = (this.state.isMainFilterOpened) ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>;
        let choosedFilters = filterSettings.filter((el) => el.filter);
        if(choosedFilters.length === 0) choosedFilters = `Keine Aufgabe wurden gewahlt`;
        else if(choosedFilters.length === filterSettings.length) choosedFilters = `ALLE`;
        else if(choosedFilters.map(el => el.name).toString().length > 40) {
            choosedFilters = `${choosedFilters.slice(0, 1).map(el => ` ${el.name}`).toString()} und ${choosedFilters.length - 1} weitere`;
        } else {
            choosedFilters = choosedFilters.map(el => ` ${el.name}`).toString();
        }
        return (
            <div className="row question_filter">
                <div className="col-sm-12">
                    <div className="row question_filter_first_row" href="#question_filter_main" id="question_filter_first_row" data-toggle="collapse" role="button" aria-expanded="false" onClick={this.toggleMainFilter}>
                        <div className="col-sm-3 text-center question_filter_title">
                            <span>Filter</span>
                        </div>
                        <div className="col-sm-8 question_filter_params">
                            {choosedFilters}
                        </div>
                        <div className="col-sm-1">
                            {openFilterIcon}
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 question_filter_main collapse" id="question_filter_main">
                    <div className="row custom-control custom-checkbox">

                        <div className="col-sm-5">
                            <h5>Ubersetzung/Verstandniss</h5>
                            <ul>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-0" defaultChecked={filterSettings[0].filter} onChange={(event) => {this.checkBoxChange(event, 0)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-0">{filterSettings[0].name}</label></li>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-1" defaultChecked={filterSettings[1].filter} onChange={(event) => {this.checkBoxChange(event, 1)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-1">{filterSettings[1].name}</label></li>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-2" defaultChecked={filterSettings[2].filter} onChange={(event) => {this.checkBoxChange(event, 2)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-2">{filterSettings[2].name}</label></li>
                            </ul>
                        </div>
                        <div className="col-sm-5">
                            <h5>50/50</h5>
                            <ul>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-3" defaultChecked={filterSettings[3].filter} onChange={(event) => {this.checkBoxChange(event, 3)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-3">{filterSettings[3].name}</label></li>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-4" defaultChecked={filterSettings[4].filter} onChange={(event) => {this.checkBoxChange(event, 4)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-4">{filterSettings[4].name}</label></li>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-5" defaultChecked={filterSettings[5].filter} onChange={(event) => {this.checkBoxChange(event, 5)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-5">{filterSettings[5].name}</label></li>
                            </ul>
                        </div>
                        <div className="col-sm-5">
                            <h5>Anderes</h5>
                            <ul>
                                <li><input type="checkbox" className="custom-control-input" id="filter-id-6" defaultChecked={filterSettings[6].filter} onChange={(event) => {this.checkBoxChange(event, 6)}}/>
                                    <label className="custom-control-label" htmlFor="filter-id-6">{filterSettings[6].name}</label></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterSettings: state.filterSettings
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleFilterElement: (id, newState) => {
            dispatch({type: "TOGGLE_FILTER_ELEMENT", id, newState});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFilter);
