import React from "react";

export default class Feedback extends React.Component {
    state = {
        formData: {
            name: null,
            text: null
        },
        messageSent: false
    };
    onNameInputChanged = (event) => {
        const value = event.target.value;
        this.setState((state) => {
            return {
                ...state,
                formData: {
                    name: value,
                    text: state.formData.text
                }
            }
        })
    };
    onTextInputChanged = (event) => {
        const value = event.target.value;
        this.setState((state) => {
            return {
                ...state,
                formData: {
                    name: state.formData.name,
                    text: value
                }
            }
        })
    };

    onFeedbackSent = (event) => {
        event.preventDefault();
        const {name, text} = this.state.formData;
        fetch(`http://127.0.0.1:3001/feedback`, {
            method: "POST",
            body: JSON.stringify({name, text})
        })
            .then((response) => {
            return response.json();
        })
            .then((data) => {
                if(data.status === true) {
                    document.getElementById("feedback_name").value = null;
                    document.getElementById("feedback_text").value = null;
                    this.setState({formData: {name: null, text: null}});
                    this.setState({messageSent: true});
                }
            })

    };
    render() {
        const {name, text} = this.state.formData;
        const alertTemplate = (this.state.messageSent) ? (<div className="alert alert-success" role="alert">Ihre Nachricht wurde geschickt! Vielen Dank!</div>) : null;
        return (
            <div className="mt-5 p-4">
                {alertTemplate}
                <div>
                    <p>If you think, that you have a good suggestion, advice for me or did you find a bug, mistake or error somewhere on web-site, feel free to leave a feedback here!</p>
                    <p>Just type your name (or nickname up to you), your message and click button "send"!</p>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="feedback_name">Name</label>
                        <input type="text" className="form-control" id="feedback_name"
                               placeholder="Deine Name" onChange={this.onNameInputChanged}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback_text">Nachricht</label>
                        <textarea className="form-control" id="feedback_text" rows="3" onChange={this.onTextInputChanged}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" disabled={(!name || !text)} onClick={this.onFeedbackSent}>Send</button>
                </form>
            </div>

        )
    }
}
