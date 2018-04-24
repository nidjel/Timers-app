import React, { Component } from 'react';
import TimerForm from './TimerForm';

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
    const { onFormSubmit } = this.props;
    return (
      <div className="addTimerBlock">
        {isFormOpen ? (
          <TimerForm
            onFormClose={this.handleCancelClick}
            onFormSubmit={onFormSubmit}
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
