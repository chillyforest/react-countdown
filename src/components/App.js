import React, { Component } from "react";

import CountDown from './CountDown';

import '../styles/App.css';

class App extends Component {
    render() {
        return (
            <div>
                <h1>Welcome to use my Countdown Timer</h1>
                <CountDown date={new Date('December 31, 2019 00:00:00')} />
            </div>
        );
    }
}

export default App;