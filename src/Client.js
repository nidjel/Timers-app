function getTimers() {
  return fetch('/api/timers', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(checkStatus)
    .then(res => res.json());
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

export default getTimers;
