const loginButton = document.getElementById('loginButton')

const login = function () {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
      parseInt(xhr.responseText) ? window.location.href = '/' :
      document.getElementById('loginResponse').innerHTML = xhr.responseText
      parseInt(xhr.responseText) ? window.location.href = '/' : failure()
    }
  }
  xhr.open('post', '/authenticate')
  xhr.send(JSON.stringify({
    username,
    password
  }))
}

const failure = function () {
  loginButton.innerHTML = 'try again'
  loginButton.addEventListener('click', function () { location.reload() })
  document.getElementById('loginResponse').innerHTML = 'Unrecognised user'
}

loginButton.addEventListener('click', login)
