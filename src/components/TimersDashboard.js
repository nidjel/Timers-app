import React, { Component } from 'react';
import EditableTimerList from './EditableTimerList';
import AddTimer from './AddTimer';
import getTimers from '../Client';

class TimersDashboard extends Component {
  constructor(props) {
    super(props);
    this.timerTickIntervals = {};
  }

  state = {
    timers: [
      {
        id: 1,
        title: 'Do something',
        project: 'project',
        time: 0
      },
      {
        id: 2,
        title: 'Do something else',
        project: 'project 2',
        time: 0
      }
    ]
  };

  componentDidMount() {
    getTimers().then(timers => console.log(timers));
  }

  handleUpdateCreateTimer = timer => {
    if (timer.id) {
      this.updateTimer(timer);
    } else {
      this.createTimer(timer);
    }
  };

  handleDeleteTimer = id => this.deleteTimer(id);

  handleStartStopTimer = id => {
    if (this.timerTickIntervals[id]) {
      this.stopTimer(id);
    } else {
      this.startTimer(id);
    }
  };

  updateTimer = timer => {
    const timers = this.state.timers;
    const oldTimerIndex = timers.findIndex(t => t.id === timer.id);
    const newTimer = Object.assign({}, timers[oldTimerIndex], timer);
    this.setState({
      timers: [
        ...timers.slice(0, oldTimerIndex),
        newTimer,
        ...timers.slice(oldTimerIndex + 1)
      ]
    });
  };

  createTimer = timer => {
    const timers = this.state.timers;
    const timerId = Math.ceil(Math.random() * 10000);
    const newTimer = {
      title: timer.title || 'title',
      project: timer.project || 'project',
      id: timerId,
      time: 0
    };
    this.setState({
      timers: [...timers, newTimer]
    });
  };

  deleteTimer = id => {
    const timers = this.state.timers;
    const oldTimerIndex = timers.findIndex(t => t.id === id);
    this.setState({
      timers: [
        ...timers.slice(0, oldTimerIndex),
        ...timers.slice(oldTimerIndex + 1)
      ]
    });
    clearInterval(this.timerTickIntervals[id]);
    delete this.timerTickIntervals[id];
  };

  startTimer = id => {
    const doTimerTick = () => {
      const timers = this.state.timers;
      const timerIndex = timers.findIndex(t => t.id === id);
      const oldTimer = timers[timerIndex];
      const newTimer = {
        ...oldTimer,
        time: oldTimer.time + 1
      };
      this.setState({
        timers: [
          ...timers.slice(0, timerIndex),
          newTimer,
          ...timers.slice(timerIndex + 1)
        ]
      });
    };
    doTimerTick();
    this.timerTickIntervals[id] = setInterval(doTimerTick, 1000);
  };

  stopTimer = id => {
    clearInterval(this.timerTickIntervals[id]);
    delete this.timerTickIntervals[id];
    this.setState({});
  };

  render() {
    const { timers } = this.state;
    return (
      <div className="timersDashboard">
        <EditableTimerList
          timers={timers}
          startTimerIds={Object.keys(this.timerTickIntervals)}
          onUpdateCreateTimer={this.handleUpdateCreateTimer}
          onDeleteTimer={this.handleDeleteTimer}
          onStartTimer={this.handleStartStopTimer}
        />
        <AddTimer onUpdateCreateTimer={this.handleUpdateCreateTimer} />
      </div>
    );
  }
}

export default TimersDashboard;
