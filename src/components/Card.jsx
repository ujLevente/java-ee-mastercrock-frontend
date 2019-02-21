import React, {Component} from "react";


var p1Image = "001.png";
export default class Card extends Component {

    onSendMessage = (stat) => {
        const selfMessage = {
            gameId: localStorage.getItem("gameId"),
            selectedStat : stat
        };
        var sendStatus = this.props.onSendMessage(stat, selfMessage);
        return sendStatus;
    };

    render() {
        return (
            <div>
                <img src={`/cardImages/${p1Image}`} alt="" height="299" width="193"/>
                <div className="play-buttons">
                    <button
                        onClick={() => this.onSendMessage("power")}
                        className="btn btn-secondary btn-circle btn-xl">P</button>
                    <button
                        onClick={() => this.onSendMessage("intelligence")}
                        className="btn btn-secondary btn-circle btn-xl">I</button>
                    <button
                        onClick={() => this.onSendMessage("reflex")}
                        className="btn btn-secondary btn-circle btn-xl">R</button>
                </div>
            </div>
        )
    }
}