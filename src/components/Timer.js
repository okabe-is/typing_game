import React, {Component} from 'react';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countdown: props.time_s * 1000, //このmsまでカウントダウンする
            time_ms: 0, // START後の経過時間 単位は ms
            startAt: 0, // STOPしても経過時間を正しく計測するために使用
            isOn: props.isOn, // カウントダウン中ならTrueとなるフラグ
        }
    }

    componentDidMount() {
        console.log("componentdidMount " + this.props.time_s + " s");
        if(this.props.isOn){
            this.startTimer();
        }
    }

    startTimer = () => {
        console.log("start");
        this.setState({
            //経過時間を蓄積するための処理
            startAt: Date.now(),
            isOn: true,

        })
        // 多重クリックを考慮
        clearInterval(this.timer);

        this.timer = setInterval(
            () => {

                //経過時間
                let spent_time = Date.now() - this.state.startAt;

                this.setState({
                    time_ms: spent_time < this.state.countdown ? spent_time : this.state.countdown,
                });

                // 経過時間が目標値となったらカウントダウンを止める
                if (this.state.time_ms >= this.state.countdown) {
                    clearInterval(this.timer);
                    this.props.finish();
                }
            }, 1);
    }

    render() {

        let rest_of_time = this.state.countdown - this.state.time_ms;

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