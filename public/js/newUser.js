function createNewUser() {
  const user = document.getElementById('newUsername').value
  const pass = document.getElementById('newPassword').value
  const xhr = new XMLHttpRequest()
  xhr.open('post', '/createNewUser')
  xhr.send(JSON.stringify({
    user,
    pass
  }))
}

document.getElementById('newUserButton').addEventListener('click', createNewUser)
