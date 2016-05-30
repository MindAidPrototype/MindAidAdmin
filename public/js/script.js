const updatePageContent = (pagePath, newData, oldData) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  if (oldData && newData) {
    xhr.open('post', pagePath + 'save')
    xhr.send(JSON.stringify({
      oldData,
      newData
    }))
  } else if (oldData) {
    xhr.open('post', pagePath + 'delete')
    xhr.send(JSON.stringify({
      oldData
    }))
  } else {
    xhr.open('post', pagePath + 'savenew')
    xhr.send(JSON.stringify({
      newData
    }))
  }
}

const cancelContent = () => { //eslint-disable-line
  location.reload()
}

const createSaveAndCancelButtons = (i) => { //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].children[0].classList.add('hider')
  document.getElementsByClassName('buttonsContainer')[i].children[1].classList.add('hider')
  const saveButton = document.createElement('button')
  saveButton.innerHTML = 'save'
  document.getElementsByClassName('buttonsContainer')[i].appendChild(saveButton)
  const cancelButton = document.createElement('button')
  cancelButton.innerHTML = 'cancel'
  cancelButton.addEventListener('click', cancelContent) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(cancelButton)
}

const addNewParagraph = (classname, i) => { //eslint-disable-line
  const newInput = document.createElement('input')
  document.getElementsByClassName(classname)[i].appendChild(newInput)
}
