import React from "react";
import "./footer.scss";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container mt-4">
                <div className="row footer align-items-center">
                    <div className="col-sm-6">
                        <nav>
                            <ul className="footer_navigation_ul">
                                <li className="footer_navigation_ul_li"><a href="/">About</a></li>
                                <li className="footer_navigation_ul_li"><a href="/">Feedback</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-sm-4">&copy; ALL RIGHTS RESERVED 2020</div>
                </div>
            </div>
        )
    }
}
