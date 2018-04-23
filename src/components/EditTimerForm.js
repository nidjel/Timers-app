import React, { Component } from 'react';

class EditTimerForm extends Component {
  state = {
    fields: {
      title: '',
      project: ''
    }
  };

  componentDidMount() {
    const { title = '', project = '' } = this.props.timerData || {};

    this.setState({
      fields: {
        title,
        project
      }
    });
  }

  handleChange = e => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  handleUpdateCreateButtonClick = e => {
    e.preventDefault();
    this.props.onUpdateCreateTimer({
      id: this.props.timerData && this.props.timerData.id,
      ...this.state.fields
    });
    this.props.onCancelForm();
  };

  render() {
    const { onCancelForm, timerData } = this.props;
    const { title, project } = this.state.fields;
    return (
      <form onChange={this.handleChange} className="timerForm">
        <p>Title</p>
        <input type="text" name="title" value={title} />
        <p>Project</p>
        <input type="text" name="project" value={project} />
        <div>
          <button type="submit" onClick={this.handleUpdateCreateButtonClick}>
            {timerData ? 'Update' : 'Create'}
          </button>
          <button onClick={onCancelForm}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default EditTimerForm;
