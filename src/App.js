import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path="/" render={() => {
                        return (
                            <div className="Home">
                                <Home/>
                            </div>)
                    }
                    }/>
                    <Route exact={true} path="/game" render={() => {
                        return (
                            <div className="Game">
                                <Game/>
                            </div>
                        )
                    }}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
