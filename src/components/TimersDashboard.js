import React, { Component } from 'react';
import uuid from 'uuid';
import EditableTimerList from './EditableTimerList';
import AddTimer from './AddTimer';
import * as client from '../сlient';

class TimersDashboard extends Component {
  state = {
    timers: []
  };

  componentDidMount() {
    client.getTimers().then(timers => this.setState({ timers }));
  }

  handleCreateFormSubmit = timer => {
    if (timer.id) {
      this.updateTimer(timer);
    } else {
      this.createTimer(timer);
    }
  };

  handleTrashClick = id => this.deleteTimer(id);

  handleStartClick = timerId => {
    this.startTimer(timerId);
  };

  handleStopClick = timerId => {
    this.stopTimer(timerId);
  };

  updateTimer = timer => {
    this.setState({
      timers: this.state.timers.map(t => {
        if (t.id === timer.id) {
          return Object.assign({}, t, {
            title: timer.title,
            project: timer.project
          });
        } else {
          return t;
        }
      })
    });

    client.updateTimer(timer);
  };

  createTimer = timer => {
    const timers = this.state.timers;
    const timerId = uuid.v4();
    const newTimer = {
      title: timer.title || 'Timer',
      project: timer.project || '',
      id: timerId,
      elapsed: 0
    };
    this.setState({
      timers: [...timers, newTimer]
    });

    client.createTimer(newTimer);
  };

  deleteTimer = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    });

    client.deleteTimer({ id: timerId });
  };

  startTimer = timerId => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now
          });
        } else {
          return timer;
        }
      })
    });

    client.startTimer({ id: timerId, start: now });
  };

  stopTimer = timerId => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    });

    client.stopTimer({ id: timerId, stop: now });
  };

  render() {
    const { timers } = this.state;
    return (
      <div className="timersDashboard">
        <EditableTimerList
          timers={timers}
          onFormSubmit={this.handleCreateFormSubmit}
          onTrashClick={this.handleTrashClick}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
        <AddTimer onFormSubmit={this.handleCreateFormSubmit} />
      </div>
    );
  }
}

export default TimersDashboard;
