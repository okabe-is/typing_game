import React from 'react';
import './App.css';
import Timer from "../components/Timer";

function App() {

    const finishHandler = () => {
        console.log("game start!");
    };

    return (
        <div className="App">
            <h1>Type Your Fruit</h1>
            <Timer time_s={3} finish={finishHandler}/>
        </div>
    );
}

export default App;
