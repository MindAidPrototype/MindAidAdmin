const deleteContent = (oldData, path) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', path)
  xhr.send(JSON.stringify({
    oldData
  }))
}

const saveContent = (oldData, path) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', path)
  const send = JSON.stringify({
    oldData,
    newData: {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: document.getElementsByTagName('textarea')[0].value
    }
  })
  console.log(send)
  xhr.send(send)
}

const cancelContent = () => { //eslint-disable-line
  location.reload()
}

const editContent = (i, path) => { //eslint-disable-line
  const input = document.createElement('input')
  const textArea = document.createElement('textarea')
  const oldData = {
    subtitle: document.getElementsByClassName('aboutParagraph')[i].children[0].innerHTML,
    paragraph: document.getElementsByClassName('aboutParagraph')[i].children[1].innerHTML
  }
  input.value = oldData.subtitle
  textArea.value = oldData.paragraph
  document.getElementsByClassName('aboutParagraph')[i].innerHTML = ''
  document.getElementsByClassName('aboutParagraph')[i].appendChild(input)
  document.getElementsByClassName('aboutParagraph')[i].appendChild(textArea)
  document.getElementsByClassName('buttonsContainer')[i].children[0].style.visibility = 'hidden'
  document.getElementsByClassName('buttonsContainer')[i].children[1].style.visibility = 'hidden'
  const saveButton = document.createElement('button')
  saveButton.innerHTML = 'save'
  saveButton.addEventListener('click', () => { saveContent(oldData, path) }) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(saveButton)
  console.log(oldData)
  const cancelButton = document.createElement('button')
  cancelButton.innerHTML = 'cancel'
  cancelButton.addEventListener('click', cancelContent) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(cancelButton)
}
