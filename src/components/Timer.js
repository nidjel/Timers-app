import React, { Component } from 'react';

class Timer extends Component {
  render() {
    const {
      timerData: { id, title, project, time },
      onEditTimer,
      onDeleteTimer,
      onStartTimer,
      isTimerStart
    } = this.props;
    return (
      <div className="timer">
        <h3>{title}</h3>
        <p>{project}</p>
        <span>{time}</span>
        <div>
          <button onClick={() => onDeleteTimer(id)}>Delete</button>
          <button onClick={onEditTimer}>Edit</button>
        </div>
        <button onClick={() => onStartTimer(id)}>
          {isTimerStart ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}

export default Timer;
