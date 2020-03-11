import React from "react";

import Header from "../header/header";
import MainContainer from "../main-container/main-container";
import Footer from "../footer/footer";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <MainContainer/>
                <Footer/>
            </div>
        )
    }
}
