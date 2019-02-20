import React, {Component} from 'react';
import '../App.css';
import SockJsClient from "react-stomp";
import Card from "../components/Card";

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
        } catch(e) {
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
        const wsSourceUrl ="http://localhost:8083/handler";
        return (
            <div className="App">
                <SockJsClient url={ wsSourceUrl } topics={["/topic/"+localStorage.getItem("gameId")]}
                              onMessage={ this.onMessageReceive } ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                              debug={ false }/>

                <h1>Created Game Id: {localStorage.getItem("gameId")}</h1>

                <div className="battle-ground">
                    <div className="p1-data">
                        <h4>Player1</h4>
                        <Card messages={ this.state.messages }
                              onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>
                    </div>
                    <div className="p1-data">
                        <h4>Player2</h4>
                        <Card messages={ this.state.messages }
                              onSendMessage={ this.sendMessage } connected={ this.state.clientConnected }/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;