import React, {Component} from 'react';
import '../App.css';
import Socketing from "../components/Socketing";

class Game extends Component {

    render() {
        return (
            <div className="App">
                <div className="battle-ground">
                    <div className="p1-data">
                        <h4>Player1</h4>
                        <Socketing/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;