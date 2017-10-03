import React, { Component } from 'react';
import getTimers from './Client.js'
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
  constructor(props) {
    super(props)
    this.timerTickIntervals = {}
  }
  
  state = {
    timers: [
      {
        id: 1,
        title: 'Do something',
        project: 'project',
        time: 0,
      },
      {
        id: 2,
        title: 'Do something else',
        project: 'project 2',
        time: 0,
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
  handleStartStopTimer = (id) => {
    if (this.timerTickIntervals[id]) {
      this.stopTimer(id)
    } else {
      this.startTimer(id)
    }
  }

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
    const timerId = Math.ceil(Math.random() * 10000)
    const newTimer = {
      title: timer.title || 'title',
      project: timer.project || 'project',
      id: timerId,
      time: 0
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
    clearInterval(this.timerTickIntervals[id])
    delete this.timerTickIntervals[id]
  }
  
  startTimer = (id) => {
    const doTimerTick = () => {
      const timers = this.state.timers
      const timerIndex = timers.findIndex(t => t.id === id)
      const oldTimer = timers[timerIndex]
      const newTimer = {
        ...oldTimer,
        time: oldTimer.time + 1
      }
      this.setState({
        timers: [
          ...timers.slice(0, timerIndex),
          newTimer,
          ...timers.slice(timerIndex + 1)
        ]
      })
    }
    doTimerTick()
    this.timerTickIntervals[id] = setInterval(doTimerTick, 1000)
  }
  
  stopTimer = (id) => {
    clearInterval(this.timerTickIntervals[id])
    delete this.timerTickIntervals[id]
    this.setState({})
  }

  render() {
    const {timers} = this.state
    return (
      <div className='timersDashboar'>
        <EditableTimerList 
          timers={timers}
          startsTimersIds={Object.keys(this.timerTickIntervals)}
          onUpdateCreateTimer={this.handleUpdateCreateTimer} 
          onDeleteTimer={this.handleDeleteTimer} 
          onStartTimer={this.handleStartStopTimer} 
        />
        <AddTimer onUpdateCreateTimer={this.handleUpdateCreateTimer} />
      </div>
    )
  }
}

class EditableTimerList extends Component {
  render() {
    const {timers, onUpdateCreateTimer, onDeleteTimer, onStartTimer, startsTimersIds} = this.props
    return (
      <div>
        {timers.map((t, i) => (
          <EditableTimer 
            key={i} 
            timerData={t}
            isTimerStart={startsTimersIds.includes(t.id.toString())}
            onUpdateCreateTimer={onUpdateCreateTimer} 
            onDeleteTimer={onDeleteTimer}
            onStartTimer={onStartTimer}
          />
        ))}
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
    const {timerData, onUpdateCreateTimer, onDeleteTimer, onStartTimer, isTimerStart} = this.props
    const {isFormOpen} = this.state
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
    )
  }
}

class Timer extends Component {
  render() {
    const {timerData: {id, title, project, time}, onEditTimer, onDeleteTimer, onStartTimer, isTimerStart} = this.props
    return (
      <div className='timer'>
        <h3>{title}</h3>
        <p>{project}</p>
        <span>{time}</span>
        <div>
          <button onClick={() => onDeleteTimer(id)} >delete</button>
          <button onClick={onEditTimer} >edit</button>
        </div>
        <button onClick={() => onStartTimer(id)} >{isTimerStart ? 'Stop' : 'Start'}</button>
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
      <form onChange={this.handleChange} className='timerForm'>
        <p>Title</p>
        <input type='text' name='title' value={title} />
        <p>Project</p>
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
      <div className='addTimerBlock'>
        {isFormOpen ? (
          <EditTimerForm 
            onCancelForm={this.handleCancelClick} 
            onUpdateCreateTimer={onUpdateCreateTimer} 
          />
        ) : (
          <button className='addTimerButton' onClick={this.handleAddClick} >Add Timer</button>
        )}
      </div>
    )
  }
}

export default App;
