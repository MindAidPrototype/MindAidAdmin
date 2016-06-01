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

const updateArray = (pagePath, identifier, newData, oldData) => { //eslint-disable-line
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  if (oldData && newData) {
    xhr.open('post', pagePath + 'save')
    xhr.send(JSON.stringify({
      identifier,
      oldData,
      newData
    }))
    console.log(JSON.stringify({
      identifier,
      oldData,
      newData
    }))
  } else if (oldData) {
    xhr.open('post', pagePath + 'delete')
    xhr.send(JSON.stringify({
      identifier,
      oldData
    }))
  } else {
    xhr.open('post', pagePath + 'savenew')
    xhr.send(JSON.stringify({
      identifier,
      newData
    }))
  }
}

const cancelContent = () => { //eslint-disable-line
  location.reload()
}

const createSaveAndCancelButtons = (i) => { //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].children[0].classList.add('hide')
  document.getElementsByClassName('buttonsContainer')[i].children[1].classList.add('hide')
  const saveButton = document.createElement('button')
  saveButton.innerHTML = 'save'
  document.getElementsByClassName('buttonsContainer')[i].appendChild(saveButton)
  const cancelButton = document.createElement('button')
  cancelButton.innerHTML = 'cancel'
  cancelButton.addEventListener('click', cancelContent) //eslint-disable-line
  document.getElementsByClassName('buttonsContainer')[i].appendChild(cancelButton)
}

const createAddbutton = function(sectionBeingAppendedTo, i, innerhtml) { //eslint-disable-line
  const addButton = document.createElement('button')
  addButton.innerHTML = innerhtml
  addButton.addEventListener('click', function() {

    const div = document.createElement('div')
    const newLinkName = document.createElement('p')
    newLinkName.innerHTML = 'Link name: '
    const newLinkNameInput = document.createElement('input')
    newLinkName.appendChild(newLinkNameInput)
    div.appendChild(newLinkName)

    const newLink = document.createElement('p')
    newLink.innerHTML = 'Link: '
    const newLinkInput = document.createElement('input')
    newLink.appendChild(newLinkInput)
    div.appendChild(newLink)

    sectionBeingAppendedTo.getElementsByClassName('links')[0].appendChild(div)
  })
  document.getElementsByClassName('buttonsContainer')[i].appendChild(addButton)
}

const addNewParagraph = (classname, i) => { //eslint-disable-line
  const newInput = document.createElement('input')
  document.getElementsByClassName(classname)[i].appendChild(newInput)
}
