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
            messages: []
        };
    }

    onMessageReceive = (msg, topic) => {
        console.log(msg);
        this.setState(prevState => ({
            messages: [...prevState.messages, msg]
        }));
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
                this.setState({ messages: [response.body] });
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
                                    <Card messages={this.state.messages}
                                          onSendMessage={this.sendMessage}
                                          connected={this.state.clientConnected}/>
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
                                    <Card messages={this.state.messages}
                                          onSendMessage={this.sendMessage}
                                          connected={this.state.clientConnected}/>
                                    <div className="play-buttons">
                                        <button className="btn btn-secondary btn-circle btn-xl">P</button>
                                        <button className="btn btn-secondary btn-circle btn-xl">I</button>
                                        <button className="btn btn-secondary btn-circle btn-xl">R</button>
                                    </div>
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