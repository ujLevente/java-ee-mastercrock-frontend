import React, {Component} from 'react';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joinRequest: false,
            joinGameId : "",
            username: "",
            usernameIsSet : false,
            gameCreated: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    createGame() {
        this.setState({gameCreated : true});
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


    setUsername(){
        localStorage.setItem("username", this.state.username);
        this.setState({usernameIsSet : true})
    }

    handleUsernameChange(event){
        this.setState({username: event.target.value});
    }


    handleChange(event) {
        this.setState({joinGameId: event.target.value});
    }

    render() {
        return (
            <div className="App">
                {(!this.state.usernameIsSet) ?
                <div>
                    <input type="text" placeholder="Please give a username"
                           defaultValue={this.state.username}
                           onChange={this.handleUsernameChange}
                    />
                    <button
                        onClick={() => this.setUsername()}
                    >
                        OK
                    </button>
                </div>
                    :
                <div>
                    {(!this.state.joinRequest) ?
                        <div>
                            {(!this.state.gameCreated) ?
                                <div>
                                    <button
                                        onClick={() => this.createGame()}
                                    >Create game
                                    </button>
                                    < button
                                        onClick={() => this.joinRequest()}
                                    >Join to existing game game
                                    </button>
                                </div>
                                :
                                <h1>Created Game Id: {localStorage.getItem("gameId")}</h1>
                            }
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

                }
            </div>
        )
    }
}
export default Home;