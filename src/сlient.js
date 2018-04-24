export function getTimers() {
  return fetch('/api/timers', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(checkStatus)
    .then(res => res.json());
}

export function createTimer(data) {
  return fetch('/api/timers', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus);
}

export function updateTimer(data) {
  return fetch('/api/timers', {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus);
}

export function deleteTimer(data) {
  return fetch('/api/timers', {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus);
}

export function startTimer(data) {
  return fetch('/api/timers/start', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus);
}

export function stopTimer(data) {
  return fetch('/api/timers/stop', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(checkStatus);
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    var err = new Error(res.statusText);
    err.response = res;
    throw err;
  }
}
