const deleteContent = (i, path) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', path)
  xhr.send(JSON.stringify({
    index: i
  }))
}

const saveContent = (i, path) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', path)
  xhr.send(JSON.stringify({
    index: i,
    data: {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: document.getElementsByTagName('textarea')[0].value
    }
  }))
}

const cancelContent = () => { //eslint-disable-line
  location.reload()
}

const editContent = (i, path) => { //eslint-disable-line
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
  saveButton.addEventListener('click', () => { saveContent(i, path) }) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(saveButton)
  const cancelButton = document.createElement('button')
  cancelButton.innerHTML = 'cancel'
  cancelButton.addEventListener('click', cancelContent) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(cancelButton)
}
