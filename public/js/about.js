const editContent = (i) => {
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
  saveButton.addEventListener('click', () => { saveContent(i) })
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

const saveContent = i => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', '/about/save')
  xhr.send(JSON.stringify({
    index: i,
    data: {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: document.getElementsByTagName('textarea')[0].value
    }
  }))
}

const cancelContent = () => {
  location.reload()
}

const addNewSection = () => {
  document.getElementById('newSection').innerHTML = ''
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('saveNewSection').addEventListener('click', () => {saveContent('new')})
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent)
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
