const loginButton = document.getElementById('loginButton')

const login = () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      parseInt(xhr.responseText) ? window.location.href = '/' : failure()
    }
  }
  xhr.open('post', '/authenticate')
  xhr.send(JSON.stringify({
    username,
    password
  }))
}

const failure = () => {
  loginButton.innerHTML = 'try again'
  loginButton.addEventListener('click', () => { location.reload() })
  document.getElementById('loginResponse').innerHTML = 'Unrecognised user'
}

loginButton.addEventListener('click', login)
