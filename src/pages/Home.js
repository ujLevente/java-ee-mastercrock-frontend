import React, {Component} from 'react';
import '../App.css';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {

            return (
            <div className="container">
                <div>
                    <Link to="/game">
                        <button className="btn btn-dark">Start new game</button>
                    </Link>
                    <button className="btn btn-dark">Join a game</button>
                </div>
            </div>
        )
    }
}

export default Home;