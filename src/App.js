import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TimersDashboar />
      </div>
    );
  }
}

class TimersDashboar extends Component {
  state = {
    timers: [
      {
        id: 1,
        title: 'Do something',
        project: 'project',
        time:'12:00:00',
      },
      {
        id: 2,
        title: 'Do something else',
        project: 'project 2',
        time:'00:00:00',
      }
    ]
  }

  handleUpdateCreateTimer = (timer) => {
    if (timer.id) {
      this.updateTimer(timer)
    } else {
      this.createTimer(timer) 
    }
  }
  handleDeleteTimer = (id) => this.deleteTimer(id)

  updateTimer = (timer) => {
    const timers = this.state.timers
    const oldTimerIndex = timers.findIndex(t => t.id === timer.id)
    const newTimer = Object.assign({}, timers[oldTimerIndex], timer)
    this.setState({
      timers: [
        ...timers.slice(0, oldTimerIndex),
        newTimer,
        ...timers.slice(oldTimerIndex + 1)
      ]
    })
  }
  
  createTimer = (timer) => {
    const timers = this.state.timers
    const newTimer = {
      id: timers[timers.length - 1].id + 1,
      ...timer
    }
    this.setState({
      timers: [
        ...timers,
        newTimer
      ]
    })
  }
  
  deleteTimer = (id) => {
    const timers = this.state.timers
    const oldTimerIndex = timers.findIndex(t => t.id === id)
    this.setState({
      timers: [
        ...timers.slice(0, oldTimerIndex),
        ...timers.slice(oldTimerIndex + 1)
      ]
    })
  }

  render() {
    const {timers} = this.state
    return (
      <div>
        <EditableTimerList timers={timers} onUpdateCreateTimer={this.handleUpdateCreateTimer} onDeleteTimer={this.handleDeleteTimer} />
        <AddTimer onUpdateCreateTimer={this.handleUpdateCreateTimer} />
      </div>
    )
  }
}

class EditableTimerList extends Component {
  render() {
    const {timers, onUpdateCreateTimer, onDeleteTimer} = this.props
    return (
      <div>
        {timers.map((t, i) => <EditableTimer key={i} timerData={t} onUpdateCreateTimer={onUpdateCreateTimer} onDeleteTimer={onDeleteTimer} />)}
      </div>
    )
  }
}

class EditableTimer extends Component {
  state = {
    isFormOpen: false
  }
  
  handleEditClick = () => this.openForm()
  handleCancelForm = () => this.closeForm()

  openForm = () => this.setState({isFormOpen: true})
  closeForm = () => this.setState({isFormOpen: false})

  render() {
    const {timerData, onUpdateCreateTimer, onDeleteTimer} = this.props
    const {isFormOpen} = this.state
    return (
      <div>
        {isFormOpen ? (
          <EditTimerForm timerData={timerData} onCancelForm={this.handleCancelForm} onUpdateCreateTimer={onUpdateCreateTimer} />
        ) : (
          <Timer timerData={timerData} onEditTimer={this.handleEditClick} onDeleteTimer={onDeleteTimer} />
        )}
      </div>
    )
  }
}

class Timer extends Component {
  render() {
    const {timerData: {id, title, project, time}, onEditTimer, onDeleteTimer} = this.props
    return (
      <div>
        <h2>{title}</h2>
        <h3>{project}</h3>
        <span>{time}</span>
        <div>
          <button onClick={() => onDeleteTimer(id)} >delete</button>
          <button onClick={onEditTimer} >edit</button>
        </div>
        <button>Start</button>
      </div>
    )
  }
}

class EditTimerForm extends Component {
  state = {
    fields: {
      title: '',
      project: '',
    }
  }

  componentDidMount() {
    const {title = '', project = ''} = this.props.timerData || {}
    
    this.setState({
      fields: {
        title,
        project,
      }
    })
  }

  handleChange = (e) => {
    this.setState(
      {
        fields: {
          ...this.state.fields,
          [e.target.name]: e.target.value
        }
      }
    )
  }
  handleUpdateCreateButtonClick = (e) => {
    e.preventDefault()
    this.props.onUpdateCreateTimer({
      id: this.props.timerData && this.props.timerData.id,
      ...this.state.fields
    })
    this.props.onCancelForm()
  }
  
  render() {
    const {onCancelForm, timerData} = this.props
    const {title, project} = this.state.fields
    return (
      <form onChange={this.handleChange} >
        <span>Title</span>
        <input type='text' name='title' value={title} />
        <span>Project</span>
        <input type='text' name='project' value={project} />
        <div>
          <button type='submit' onClick={this.handleUpdateCreateButtonClick} >{timerData ? 'Update' : 'Create'}</button>
          <button onClick={onCancelForm} >Cancel</button>
        </div>
      </form>
    )
  }
}

class AddTimer extends Component {
  state = {
    isFormOpen: false,
  }

  handleAddClick = () => this.openForm()
  handleCancelClick = () => this.closeForm()

  openForm = () => this.setState({isFormOpen: true})
  closeForm = () => this.setState({isFormOpen: false})

  render() {
    const {isFormOpen} = this.state
    const {onUpdateCreateTimer} = this.props
    return (
      <div>
        {isFormOpen ? (
          <EditTimerForm onCancelForm={this.handleCancelClick} onUpdateCreateTimer={onUpdateCreateTimer} />
        ) : (
          <button onClick={this.handleAddClick} >Add Timer</button>
        )}
      </div>
    )
  }
}

export default App;
