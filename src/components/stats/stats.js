import React from "react";
import "./stats.scss";
export default class Stats extends React.Component {
    state = {
        stats: {
            overall: [
                {name: "Test", score: 9999}
            ],
            today: [
                {name: "Test", score: 9999}
            ]
        },
        loadingState: "loading",
        isStatsOpened: true,
        loadDataIntervalID: null
    };

    loadStatsData = () => {
        fetch(`http://127.0.0.1:3001/stats`)
            .then((res) => {
                return res.text();
            })
            .then((text) => {
                const serverStats = JSON.parse(text);
                this.setState({
                    stats: {
                        overall: serverStats[0],
                        today: serverStats[1]
                    }
                })
                this.setState({loadingState: "loaded"});
            })
            .catch((err => {
                this.setState({loadingState: "failed"});
                console.error(`Error while loading stats!`, err);
            }))
    };

    componentDidMount() {
        const loadDataIntervalID = setInterval(this.loadStatsData, 1000);
        this.setState({loadDataIntervalID});
    }
    componentWillUnmount() {
        clearInterval(this.state.loadDataIntervalID);
    }

    toggleMainFilter = (event) => {
        const {isStatsOpened} = this.state;
        const cList = document.getElementById("stats_title").classList;
        if(isStatsOpened && cList.contains("collapsed")) this.setState({isStatsOpened: false})
        else if(!isStatsOpened && !cList.contains("collapsed")) this.setState({isStatsOpened: true})
    }
    getStatsTemplate = (source, right = false) => {
        const template = [];
        if(source) {
            function getTextColor (id) {
                if(id === 0) return {
                    color: "gold",
                    textShadow: "2px 2px 2px #000000",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                };
                if(id === 1) return {
                    color: "silver",
                    textShadow: "2px 2px 2px #000000",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                };
                if(id === 2) return {
                    color: "#CD7F32",
                    textShadow: "2px 2px 2px #000000",
                    fontWeight: "bold",
                    textTransform: "uppercase"
                };
                return {
                    color: "black"
                };
            }
            for(let i = 0; i < source.length; i++) {
                template.push(
                    <div className={`row p-1 ${(right) ? 'ml-sm-1' : ''} justify-content-around stats_row`} key={`row-${i}`} style={getTextColor(i)}>
                        <div className={`col-sm-2 col-2 p-0 font-weight-bold`}>№{i+1}</div>
                        <div className="col-sm-8 col-8 p-0">{source[i].name}</div>
                        <div className="col-sm-2 col-2 p-0">{source[i].score} P.</div>
                    </div>
                )
            }
            return template;
        }
    }

    render() {
        const {loadingState, isStatsOpened, stats} = this.state;

        if(loadingState === "loading") {
            return (
                <div><span>Loading...</span></div>
            )
        } else if(loadingState === "failed") {
            return (
                <div><span>Error while loading statistics!</span></div>
            )
        } else {
            const openStatsIcon = (isStatsOpened) ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>;
            return (
                <div className="row mt-3 stats text-center">
                    <div className="col-sm-12 font-weight-bold">
                        <div className="row stats_title" href="#stats_main" data-toggle="collapse" id="stats_title" role="button" aria-expanded="true" onClick={this.toggleMainFilter}>
                            <div className="col-sm-6">
                                <div className="p-1">TOP 10 Studenten</div>
                            </div>
                            <div className="col-sm-6">
                                <div className="p-1">TOP 10 Studenten HEUTE <span style={{position: "absolute", float: "right", right: 2 + "%"}}>{openStatsIcon}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 collapse show" id="stats_main">
                        <div className="row">
                            <div className="col-sm-6 col-12">
                                <div className="d-flex flex-column stats_left">
                                    <div>{this.getStatsTemplate(stats.overall)}</div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-12 mt-5 mt-sm-0">
                                <div className="d-flex flex-column stats_right">
                                    <div>{this.getStatsTemplate(stats.today, true)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }
}
