import React, { Component } from 'react';
import EditTimerForm from './EditTimerForm';

class AddTimer extends Component {
  state = {
    isFormOpen: false
  };

  handleAddClick = () => this.openForm();
  handleCancelClick = () => this.closeForm();

  openForm = () => this.setState({ isFormOpen: true });
  closeForm = () => this.setState({ isFormOpen: false });

  render() {
    const { isFormOpen } = this.state;
    const { onUpdateCreateTimer } = this.props;
    return (
      <div className="addTimerBlock">
        {isFormOpen ? (
          <EditTimerForm
            onCancelForm={this.handleCancelClick}
            onUpdateCreateTimer={onUpdateCreateTimer}
          />
        ) : (
          <button className="addTimerButton" onClick={this.handleAddClick}>
            Add Timer
          </button>
        )}
      </div>
    );
  }
}

export default AddTimer;
