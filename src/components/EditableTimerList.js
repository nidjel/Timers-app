import React, { Component } from 'react';
import EditableTimer from './EditableTimer';

class EditableTimerList extends Component {
  render() {
    const {
      timers,
      onUpdateCreateTimer,
      onDeleteTimer,
      onStartTimer,
      startTimerIds
    } = this.props;
    return (
      <div>
        {timers.map((t, i) => (
          <EditableTimer
            key={i}
            timerData={t}
            isTimerStart={startTimerIds.includes(t.id.toString())}
            onUpdateCreateTimer={onUpdateCreateTimer}
            onDeleteTimer={onDeleteTimer}
            onStartTimer={onStartTimer}
          />
        ))}
      </div>
    );
  }
}

export default EditableTimerList;
