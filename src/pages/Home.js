import React, {Component} from 'react';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinRequest: false,
            joinGameId : ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    createGame() {
        let idNum = parseInt(Math.random() * (9999 - 1000) + 1000);
        localStorage.setItem("gameId", idNum);
        fetch("http://localhost:8083/create-game/" + idNum)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }


    joinRequest(){
        this.setState({joinRequest: true});
    }

    joinGame() {
        let gameId = this.state.joinGameId;
        fetch("http://localhost:8083/join-game/" + this.state.joinGameId)
            .then(response => response.json())
            .then(respData => {
                if (respData.status) {
                    console.log(respData);
                    localStorage.setItem("gameId", gameId);
                } else {
                    alert("Wrong Game ID")
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleChange(event) {
        this.setState({joinGameId: event.target.value});
    }

    render() {
        return (
            <div className="App">
                {(!this.state.joinRequest) ?
                <div>
                    <input type="text" placeholder="Please give a username"/>
                    <button
                    onClick={() => this.createGame()}
                    >Create game</button>
                    <button
                    onClick={() => this.joinRequest()}
                    >Join to existing game game</button>
                </div>
                    :
                <div>
                    <input type="text" placeholder="Please provide game id"
                           defaultValue={this.state.joinGameId}
                           onChange={this.handleChange}/>
                    <button
                    onClick={() => this.joinGame()}
                    >
                        Join game
                    </button>
                </div>

                }
            </div>
        )
    }
}
export default Home;