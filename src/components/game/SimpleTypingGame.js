import React, {Component} from "react";
import CharDumb from "./CharDumb";
import NumberUtil from "../../NumberUtil"; //#TODO Is relative path right way..?

import "./SimpleTypingGame.css"

const quiz_list = ["apple", "avocado", "banana", "coconut", "durian", "plums",
    "guava", "lemon", "lychee", "orange", "papaya", "pineapple", "prunes"
];

class SimpleTypingGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            quiz: quiz_list[0],
            correct_num: 0
        }
        this.inputField = React.createRef();
    }

    inputHandler = (event) => {

        // check correctness
        const isCorrect = this.state.quiz === event.target.value.toLowerCase();

        const num = isCorrect ? this.state.correct_num + 1 : this.state.correct_num
        // escalate score
        this.props.scoreChange(num);

        this.setState({
            inputText: event.target.value,
            correct_num: num,
        });

        // switch quiz 1sec after
        if (isCorrect) {
            setTimeout(() => {
                this.setState({
                    inputText: "",
                    quiz: quiz_list[NumberUtil.getRandomInt(quiz_list.length)],
                })
            }, 1000)
        }

    }

    componentDidMount() {
        this.inputField.current.focus()
    }

    render() {

        // generate quiz character components
        const quiz_chars = this.state.quiz.split('').map((char, index) => {

            return <CharDumb char={char}
                             key={index}
                             inputChar={this.state.inputText.split('')[index]}/>
        });

        return (
            <div>
                <input type="text"
                       ref={this.inputField}
                       onChange={this.inputHandler}
                       value={this.state.inputText}
                       style={{fontSize: "16px"}}
                />
                <div className="targetText">
                    {quiz_chars}
                </div>
                <p className="Score">SCORE: {this.state.correct_num}</p>
            </div>
        );
    }

}

export default SimpleTypingGame