import React, { Component } from 'react';
import { renderElapsedString } from '../utils';

class Timer extends Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    const {
      timerData: { id, title, project, elapsed, runningSince },
      onEditClick,
      onTrashClick,
      onStartClick,
      onStopClick
    } = this.props;
    return (
      <div className="timer">
        <h3>{title}</h3>
        <p>{project}</p>
        <span>{renderElapsedString(elapsed, runningSince)}</span>
        <div>
          <button onClick={() => onTrashClick(id)}>Delete</button>
          <button onClick={onEditClick}>Edit</button>
        </div>
        {!!runningSince ? (
          <button onClick={() => onStopClick(id)}>Stop</button>
        ) : (
          <button onClick={() => onStartClick(id)}>Start</button>
        )}
      </div>
    );
  }
}

export default Timer;
