import React, { Component } from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';

class EditableTimer extends Component {
  state = {
    isFormOpen: false
  };

  handleEditClick = () => this.openForm();
  handleFormClose = () => this.closeForm();

  openForm = () => this.setState({ isFormOpen: true });
  closeForm = () => this.setState({ isFormOpen: false });

  render() {
    const {
      timerData,
      onFormSubmit,
      onTrashClick,
      onStartClick,
      onStopClick
    } = this.props;
    const { isFormOpen } = this.state;
    return (
      <div>
        {isFormOpen ? (
          <TimerForm
            timerData={timerData}
            onFormClose={this.handleFormClose}
            onFormSubmit={onFormSubmit}
          />
        ) : (
          <Timer
            timerData={timerData}
            onEditClick={this.handleEditClick}
            onTrashClick={onTrashClick}
            onStartClick={onStartClick}
            onStopClick={onStopClick}
          />
        )}
      </div>
    );
  }
}

export default EditableTimer;
