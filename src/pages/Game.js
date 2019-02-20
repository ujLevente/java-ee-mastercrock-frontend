import React, {Component} from 'react';
import '../App.css';
import Card from "../components/Card";
import ScoreBoard from "../components/ScoreBoard";

class Game extends Component {
 float
    render() {
        return (
            <div className="container battle-container">
                <div className="row align-items-center justify-content-around">
                    <div className="p1-data col mx-auto text-center">
                        <h4>Player1</h4>
                        <Card/>
                        <div className="play-buttons">
                            <button className="btn btn-secondary btn-circle btn-xl">P</button>
                            <button className="btn btn-secondary btn-circle btn-xl">I</button>
                            <button className="btn btn-secondary btn-circle btn-xl">R</button>
                        </div>
                    </div>
                    <div className="scores col-6 mx-auto text-center">
                        <ScoreBoard/>
                    </div>
                    <div className="p2-data col mx-auto text-center">
                        <h4>Player2</h4>
                        <Card/>
                        <div className="play-buttons">
                            <button className="btn btn-secondary btn-circle btn-xl">P</button>
                            <button className="btn btn-secondary btn-circle btn-xl">I</button>
                            <button className="btn btn-secondary btn-circle btn-xl">R</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Game;