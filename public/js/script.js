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

const editContent = (i) => {
  // changing title and paragraph to text boxes with correct content
  const input = document.createElement('input')
  const textArea = document.createElement('textarea')
  input.value = document.getElementsByClassName('aboutParagraph')[i].children[0].innerHTML
  textArea.value = document.getElementsByClassName('aboutParagraph')[i].children[1].innerHTML
  document.getElementsByClassName('aboutParagraph')[i].innerHTML = ''
  document.getElementsByClassName('aboutParagraph')[i].appendChild(input)
  document.getElementsByClassName('aboutParagraph')[i].appendChild(textArea)
  document.getElementsByClassName('buttonsContainer')[i].children[0].style.visibility = 'hidden'
  document.getElementsByClassName('buttonsContainer')[i].children[1].style.visibility = 'hidden'
  const saveButton = document.createElement('button')
  saveButton.innerHTML = 'save'
  saveButton.addEventListener('click', saveContent)
  document.getElementsByClassName('buttonsContainer')[i].appendChild(saveButton)
  const cancelButton = document.createElement('button')
  cancelButton.innerHTML = 'cancel'
  cancelButton.addEventListener('click', cancelContent)
  document.getElementsByClassName('buttonsContainer')[i].appendChild(cancelButton)
}

const deleteContent = (i) => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', '/about/delete')
  xhr.send(JSON.stringify({
    index: i
  }))
}

const saveContent = () => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', '/about/save')
  xhr.send(JSON.stringify({
    index: 0,
    title: document.getElementsByTagName('input')[0].value,
    paragraph: document.getElementsByTagName('textarea')[0].value
  }))
}

const cancelContent = () => {
  console.log('cancelling content')
  location.reload()
}

const addNewSection = () => {
  document.getElementById('newSection').innerHTML = ''
  const input = document.createElement('input')
  const textArea = document.createElement('textarea')
  const aboutParagraph = document.createElement('div')
  aboutParagraph.classList.add('aboutParagraph')
  aboutParagraph.appendChild(input)
  aboutParagraph.appendChild(textArea)
  const editButton = document.createElement('button')
  editButton.innerHTML = 'save'
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'cancel'
  deleteButton.addEventListener('click',)
  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('buttonsContainer')
  buttonsContainer.appendChild(editButton)
  buttonsContainer.appendChild(deleteButton)
  document.getElementById('newSection').appendChild(aboutParagraph)
  document.getElementById('newSection').appendChild(buttonsContainer)
}

if(document.getElementsByClassName('aboutEditButton').length) {
  const aboutEditButton = Array.from(document.getElementsByClassName('aboutEditButton'))
  aboutEditButton.forEach((el, i) => {
    el.addEventListener('click', () => { editContent(i) })
  })
}

if(document.getElementsByClassName('aboutDeleteButton').length) {
  const aboutDeleteButton = Array.from(document.getElementsByClassName('aboutDeleteButton'))
  aboutDeleteButton.forEach((el, i) => {
    el.addEventListener('click', () => { deleteContent(i) })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
