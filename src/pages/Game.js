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
            currentRound: {},
            fetching: false
        };
    }

    onMessageReceive = (msg, topic) => {
        console.log("MESSAGE: " + msg);
        console.log(this.state.currentRound);

        fetch("http://localhost:8083/get-next-round/" + localStorage.getItem("gameId") + "/" + msg)
            .then(response => response.json())
            .then(respData => {
                this.setState({currentRound: respData})
            })
    };

    sendMessage = (msg, selfMsg) => {
        try {
            this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
            return true;
        } catch (e) {
            return false;
        }
    };

    componentWillMount() {
        console.log("ANYUD2");
        this.setState({fetching: true});

        fetch("http://localhost:8083/current/" + localStorage.getItem("gameId"))
            .then(response => response.json())
            .then(respData => {
                console.log(respData);
                this.setState({currentRound: respData});
                console.log(this.state.currentRound);
                this.setState({fetching: false})
            })
            .catch(error => {
                console.log('Error fetching and parsing: ', error)
            });

    }

    render() {

        if (this.state.fetching) {
            return <h1>LOADING</h1>;

        } else {
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
                                        <h4>{this.state.currentRound.playerOne.name}</h4>
                                        <Card currentRound={this.state.currentRound.p1FirstCard}
                                              onSendMessage={this.sendMessage}
                                              connected={this.state.clientConnected}/>

                                    </div>
                                    <div className="scores col-6 mx-auto text-center">
                                        <ScoreBoard/>
                                    </div>
                                    <div className="p2-data col mx-auto text-center">
                                        <h4>{this.state.currentRound.playerTwo.name}</h4>
                                        <Card currentRound={this.state.currentRound.p2FirstCard}
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
}

export default Game;