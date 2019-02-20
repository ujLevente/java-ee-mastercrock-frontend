import React, {Component} from "react";

var p1Image = "001.png";
export default class Card extends Component {
    render() {
        return (
            <div>
                <img src={`/cardImages/${p1Image}`} alt="" height="299" width="193"/>
            </div>
        )
    }
}