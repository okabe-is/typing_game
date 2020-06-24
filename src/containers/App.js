import React, {Component} from 'react';
import './App.css';
import Timer from "../components/Timer";
import SimpleTypingGame from "../components/game/SimpleTypingGame";
import gameContext from "../context/gameContext";

class App extends Component {

    state = {
        isStarted: false,
        isGameOver: false,
        isHighestScore: false,
    }

    static contextType = gameContext;

    endCountdownHandler = () => {
        this.setState({
            isStarted: true,
            isGameOver: false,
        })
    };


    endGameHandler = () => {

        let isHighestScore = false;
        if (this.context.highest_score < this.context.current_game_score) {
            this.context.highest_score = this.context.current_game_score;
            isHighestScore = true;
        }

        this.setState({
            isStarted: false,
            isGameOver: true,
            isHighestScore: isHighestScore,
        })
    }

    render() {

        const score_style = {
            color : this.state.isHighestScore? "red" : "black"
        }

        return (
            <div className="App">
                <h1>Type Fruit in 10 sec</h1>
                <h3>HIGH SCORE : {this.context.highest_score}</h3>
                {/*at first, display START Button.*/}
                {this.state.isStarted ||
                <Timer time_s={3}
                       autoStart={false}
                       finish={this.endCountdownHandler}/>}

                {/*after countdown, start game.*/}
                {this.state.isStarted &&
                <div>
                    <Timer time_s={10}
                           autoStart={true}
                           finish={this.endGameHandler}/>
                    <SimpleTypingGame/>
                </div>
                }

                {/*after game-over, display score*/}
                {this.state.isGameOver &&
                <div>
                    {this.state.isHighestScore ?
                        <p style={score_style}> HIGH SCORE!</p> : null}
                    <h2 style={score_style}>Your
                        Score: {this.context.current_game_score}</h2>
                </div>}
                <div className="reposCard">
                    <a href="https://github.com/okabe-is/typing_game"><img
                        src="https://gh-card.dev/repos/okabe-is/typing_game.svg"/>
                    </a>
                </div>
            </div>
        );

    }

}

export default App;
