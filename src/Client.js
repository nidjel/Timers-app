function getTimers() {
  fetch('/api/timers', {
    headers: {
      'Accept': 'application/json'
    },
  }).then(checkStatus)
    .then(res => res.json())
    .then(timers => this.setState({timers}))
}

function checkStatus (res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  } else {
    var err = new Error(res.statusText)
    err.response = res
    throw err
  }
}

export default getTimers