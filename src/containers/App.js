import React, {Component} from 'react';
import './App.css';
import Timer from "../components/Timer";
import SimpleTypingGame from "../components/game/SimpleTypingGame";

class App extends Component {

    state = {
        isStarted: false,
        isGameOver: false,
        score: 0,
    }

    endCountdownHandler = () => {
        this.setState({
            isStarted: true,
            isGameOver: false,
            score: 0,
        })
    };

    scoreChangeHandler = score => {
        this.setState({
                score: score,
            }
        )
    }

    endGameHandler = () => {
        this.setState({
            isStarted: false,
            isGameOver: true,
        })
    }

    render() {
        return (
            <div className="App">
                <h1>Type Fruit in 10 sec</h1>

                {/*at first, display START Button.*/}
                {this.state.isStarted ||
                <Timer time_s={3}
                       isOn={false}
                       finish={this.endCountdownHandler}/>}

                {/*after countdown, start game.*/}
                {this.state.isStarted &&
                <div>
                    <Timer time_s={10}
                           isOn={true}
                           finish={this.endGameHandler}/>
                    <SimpleTypingGame scoreChange={this.scoreChangeHandler}/>
                </div>
                }

                {/*after game-over, display score*/}
                {this.state.isGameOver &&
                <h2 style={{color: "red"}}>Your Score: {this.state.score}</h2>}
            </div>
        );

    }

}

export default App;
