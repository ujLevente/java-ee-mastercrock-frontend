import React, {Component} from 'react';
import '../App.css';
import SockJsClient from "react-stomp";
import Card from "../components/Card";
import ScoreBoard from "../components/ScoreBoard";

class Game extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            currentRound: {}
        };
    }

    onMessageReceive = (msg, topic) => {
        this.setState({currentRound : msg});
        /*this.setState(prevState => ({
            currentRound : msg
            //currentRound: [...prevState.currentRound, msg]
        }));*/
        console.log(this.state.currentRound);
    };

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch (e) {
            return false;
        }
    };

    /*componentWillMount() {
        fetch("http://localhost:8083/history")
            .then((response) => {
                this.setState({ currentRound: [response.body] });
            })
            .catch(error => {
                console.log('Error fetching and parsing: ' , error)
            });
    }*/

    render() {
        const wsSourceUrl = "http://localhost:8083/handler";
        return (
            <div className="App">
                <SockJsClient url={wsSourceUrl} topics={["/topic/" + localStorage.getItem("gameId")]}
                              onMessage={this.onMessageReceive} ref={(client) => {
                    this.clientRef = client
                }}
                              onConnect={() => {
                                  this.setState({clientConnected: true})
                              }}
                              onDisconnect={() => {
                                  this.setState({clientConnected: false})
                              }}
                              debug={false}/>

                <h1>Created Game Id: {localStorage.getItem("gameId")}</h1>

                <div className="battle-ground">
                    <div className="p1-data">
                        <div className="container battle-container">
                            <div className="row align-items-center justify-content-around">
                                <div className="p1-data col mx-auto text-center">
                                    <h4>Player1</h4>
                                    <Card currentCard={this.state.currentRound.p1FirstCard}
                                          onSendMessage={this.sendMessage}
                                          connected={this.state.clientConnected}/>

                                </div>
                                <div className="scores col-6 mx-auto text-center">
                                    <ScoreBoard/>
                                </div>
                                <div className="p2-data col mx-auto text-center">
                                    <h4>Player2</h4>
                                    <Card currentCard={this.state.currentRound.p2FirstCard}
                                          onSendMessage={this.sendMessage}
                                          connected={this.state.clientConnected}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;