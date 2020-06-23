import React, {Component} from 'react';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countdown: props.time_s * 1000, //target time(ms)
            elapsed_time: 0,
            isOn: false,
        }
    }

    componentDidMount() {
        if(this.props.autoStart){
            this.startTimer();
        }
    }

    startTimer = () => {
        this.setState({
            startAt: Date.now(),
            isOn: true,

        })
        // 多重クリックを考慮
        clearInterval(this.timer);

        this.timer = setInterval(
            () => {

                const elapsed_time = Date.now() - this.state.startAt;

                this.setState({
                    elapsed_time: elapsed_time < this.state.countdown ? elapsed_time : this.state.countdown,
                });

                // stop timer and escalate event to parent component
                if (this.state.elapsed_time >= this.state.countdown) {
                    clearInterval(this.timer);
                    this.props.finish();
                }
            }, 1);
    }

    render() {

        const rest_of_time = this.state.countdown - this.state.elapsed_time;

        return (
            <div>
                {this.state.isOn ||
                <button
                    onClick={this.startTimer}>
                    start</button>
                }
                {this.state.isOn &&
                <h3>{Math.ceil(rest_of_time / 1000)} </h3>
                }
            </div>
        );
    }
}

export default Timer;