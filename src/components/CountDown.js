import React, { Component } from "react";

import '../styles/CountDown.css';

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateDiff: null,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const dateDiff = this.getDateDiff();
      if (dateDiff) {
        this.setState({dateDiff});
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  getDateDiff() {
    const { date } = this.props;
    // get diff between current date and goal date
    const diff = Date.parse(new Date(date)) - Date.parse(new Date());
    if (diff <= 0) {
      return null;
    }
    const dateDiff = {
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };

    let curDiff = Math.floor(diff / 1000);
    dateDiff.sec = curDiff % 60;
    curDiff = Math.floor(curDiff / 60);

    if (curDiff > 0) {
      dateDiff.min = curDiff % 60;
      curDiff = Math.floor(curDiff / 60);
    }

    if (curDiff > 0) {
      dateDiff.hour = curDiff % 24;
      curDiff = Math.floor(curDiff / 24);
    }

    if (curDiff > 0) {
      dateDiff.day = curDiff;
    }

    return dateDiff;
  }

  formatDisplay(value, digit) {
    let valString = value ? String(value) : 0;
    if (valString.length < digit) {
      return valString.padStart(digit - valString.length, '0');
    }
    return valString;
  }

  render() {
    const { date } = this.props;
    const { dateDiff } = this.state;
    return (
      <div className="countdown-container">
        <div className="countdown-enddate">
          <span>{'End date: '}</span>
          <span>{String(date)}</span>
        </div>
        {
          dateDiff &&
          (
            <div className="countdown-digits-container">
              <div className="countdown-digits">
                <span className="countdown-value">
                  {this.formatDisplay(dateDiff.day, 3)}
                </span>
                <span className="countdown-unit">
                  {dateDiff.day <= 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="countdown-digits">
                <span className="countdown-value">
                  {this.formatDisplay(dateDiff.hour, 3)}
                </span>
                <span className="countdown-unit">
                  {dateDiff.hour <= 1 ? 'hour' : 'hours'}
                </span>
              </div>
              <div className="countdown-digits">
                <span className="countdown-value">
                  {this.formatDisplay(dateDiff.min, 3)}
                </span>
                <span className="countdown-unit">
                  {dateDiff.min <= 1 ? 'min' : 'mins'}
                </span>
              </div>
              <div className="countdown-digits">
                <span className="countdown-value">
                  {this.formatDisplay(dateDiff.sec, 3)}
                </span>
                <span className="countdown-unit">
                  {dateDiff.sec <= 1 ? 'sec' : 'secs'}
                </span>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default CountDown;