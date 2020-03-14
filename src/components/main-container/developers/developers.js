import React from "react";

export default class Developers extends React.Component {
    render() {
        return (
            <div className="mt-5 p-3">
                <h2>This web-application was built using React library.</h2>
                <p>Here you can see which libraries and packages were used in this application.</p>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>React libraries:</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Redux</li>
                            <li className="list-group-item">React-Redux</li>
                            <li className="list-group-item">React-Dom</li>
                            <li className="list-group-item">React-Router-Dom</li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <h3>Bootstrap:</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Grid system</li>
                            <li className="list-group-item">Alerts</li>
                            <li className="list-group-item">Buttons</li>
                            <li className="list-group-item">Collapse</li>
                            <li className="list-group-item">Forms</li>
                            <li className="list-group-item">Modal</li>
                            <li className="list-group-item">Utilities</li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <h3>Server-Side</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Language: Node JS</li>
                            <li className="list-group-item">MySQL</li>
                            <li className="list-group-item">MD5</li>
                            <li className="list-group-item">Node-Cron</li>
                        </ul>
                    </div>
                    <div className="col-sm-4">
                        <h3>Other features:</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Simple login system</li>
                            <li className="list-group-item">Current online players</li>
                            <li className="list-group-item">Top players</li>
                            <li className="list-group-item">Questions filter</li>
                        </ul>
                    </div>
                </div>


            </div>
        )
    }
}
