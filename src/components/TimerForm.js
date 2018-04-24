import React, { Component } from 'react';

class TimerForm extends Component {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit({
      id: this.props.timerData && this.props.timerData.id,
      ...this.state.fields
    });
    this.props.onFormClose();
  };

  render() {
    const { onFormClose, timerData } = this.props;
    const { title, project } = this.state.fields;
    return (
      <form onChange={this.handleChange} className="timerForm">
        <p>Title</p>
        <input type="text" name="title" value={title} />
        <p>Project</p>
        <input type="text" name="project" value={project} />
        <div>
          <button type="submit" onClick={this.handleSubmit}>
            {timerData ? 'Update' : 'Create'}
          </button>
          <button onClick={onFormClose}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default TimerForm;
