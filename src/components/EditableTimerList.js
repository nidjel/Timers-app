import React, { Component } from 'react';
import EditableTimer from './EditableTimer';

class EditableTimerList extends Component {
  render() {
    const {
      timers,
      onFormSubmit,
      onTrashClick,
      onStartClick,
      onStopClick
    } = this.props;
    return (
      <div>
        {timers.map((t, i) => (
          <EditableTimer
            key={i}
            timerData={t}
            onFormSubmit={onFormSubmit}
            onTrashClick={onTrashClick}
            onStartClick={onStartClick}
            onStopClick={onStopClick}
          />
        ))}
      </div>
    );
  }
}

export default EditableTimerList;
