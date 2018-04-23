import React, { Component } from 'react';
import EditTimerForm from './EditTimerForm';
import Timer from './Timer';

class EditableTimer extends Component {
  state = {
    isFormOpen: false
  };

  handleEditClick = () => this.openForm();
  handleCancelForm = () => this.closeForm();

  openForm = () => this.setState({ isFormOpen: true });
  closeForm = () => this.setState({ isFormOpen: false });

  render() {
    const {
      timerData,
      onUpdateCreateTimer,
      onDeleteTimer,
      onStartTimer,
      isTimerStart
    } = this.props;
    const { isFormOpen } = this.state;
    return (
      <div>
        {isFormOpen ? (
          <EditTimerForm
            timerData={timerData}
            onCancelForm={this.handleCancelForm}
            onUpdateCreateTimer={onUpdateCreateTimer}
          />
        ) : (
          <Timer
            timerData={timerData}
            onEditTimer={this.handleEditClick}
            onDeleteTimer={onDeleteTimer}
            onStartTimer={onStartTimer}
            isTimerStart={isTimerStart}
          />
        )}
      </div>
    );
  }
}

export default EditableTimer;
