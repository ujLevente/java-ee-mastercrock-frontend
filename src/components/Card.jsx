import React, {Component} from "react";



export default class Card extends Component {

    onSendMessage = (msg) => {
        const selfMessage = {
            gameId: localStorage.getItem("gameId")
        };
        var sendStatus = this.props.onSendMessage(msg, selfMessage);
        return sendStatus;
    };

    render() {
        return (
            <div>
                <img alt="" height="299" width="193"/>
                <button
                onClick={() => this.onSendMessage("leeeeeel")}
                >KÜLDJED</button>
            </div>
        )
    }
}