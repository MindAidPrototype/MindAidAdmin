const addNewSection = function () {
  const listenSections = document.getElementsByClassName('listenSection')
  const indexOfNewSection = Array.from(listenSections).length - 1
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('saveNewSection').addEventListener('click', function () {
    const inputFields = Array.from(listenSections[indexOfNewSection].children)
    const newData = { question: inputFields[0].value }
    updatePageContent('/listen/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const createEditSection = function (i) {
  const sectionBeingEdited = document.getElementsByClassName('listenSection')[i]
  // save data before changes are made
  const oldData = { question: sectionBeingEdited.children[0].innerHTML }

  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line

  sectionBeingEdited.innerHTML = ''
  const input = document.createElement('input')
  input.value = oldData.question
  sectionBeingEdited.appendChild(input)

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[2]
  saveButton.addEventListener('click', function () {
    //array of input field objects
    const inputFields = Array.from(sectionBeingEdited.children)
    const newData = {
      question: inputFields[0].value
    }
    updatePageContent('/listen/', newData, oldData) //eslint-disable-line
  })
}

if(document.getElementsByClassName('editButton').length) {
  const editButton = Array.from(document.getElementsByClassName('editButton'))
  editButton.forEach(function (el, i) {
    el.addEventListener('click', function () {
      createEditSection(i)
    })
  })
}

if(document.getElementsByClassName('deleteButton').length) {
  const deleteButton = Array.from(document.getElementsByClassName('deleteButton'))
  deleteButton.forEach(function (el, i) {
    el.addEventListener('click', function () {
      const sectionBeingDeleted = document.getElementsByClassName('listenSection')[i]
      const oldData = { question: sectionBeingDeleted.children[0].innerHTML }
      updatePageContent('/listen/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
