const login = () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      parseInt(xhr.responseText) ? window.location.href = '/' :
      document.getElementById('loginResponse').innerHTML = xhr.responseText
    }
  }
  xhr.open('post', '/authenticate')
  xhr.send(JSON.stringify({
    username: username,
    password: password
  }))
}

document.getElementById('loginButton').addEventListener('click', login)
