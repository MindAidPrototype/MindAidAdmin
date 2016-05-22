console.log('finding the script file')

const logout = () => {
  console.log('logging out')
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log('responsetext: ', xhr.responseText)
      window.location.href = '/login'
    }
  }
  xhr.open('post', '/logout')
  xhr.send()
}

document.getElementById('logout').addEventListener('click', logout)
