import React, {Component} from 'react';
import '../App.css';

class ScoreBoard extends Component {

    render() {
        return (
            <div className="score-board">
                <div className="scores">
                    <h1>Scores</h1>
                    <h1>{this.props.p1Score} - {this.props.p2Score}</h1>
                </div>
            </div>
        )
    }
}

export default ScoreBoard;