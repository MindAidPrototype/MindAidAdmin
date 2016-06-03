const addNewSection = function () {
  const aboutSections = document.getElementsByClassName('aboutSection')
  const indexOfNewSection = Array.from(aboutSections).length - 1
  document.getElementsByClassName('hide')[0].className = ''
  document.getElementById('newSection').classList.add('hide')
  document.getElementById('addParagraphButton').addEventListener('click', function () {
    addNewParagraph('aboutSection', indexOfNewSection) //eslint-disable-line
  })
  document.getElementById('saveNewSection').addEventListener('click', function () {
    const inputFields = Array.from(aboutSections[indexOfNewSection].children)
    const newData = {
      subtitle: inputFields[0].value,
      paragraph: inputFields.map(function(inputObj) {return inputObj.value}).slice(1)
    }
    updatePageContent('/about/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const createEditAboutSection = function (i) {
  const sectionBeingEdited = document.getElementsByClassName('aboutSection')[i]
  // save data before changes are made
  const paragraphs = Array.from(sectionBeingEdited.getElementsByTagName('p'))
  const oldData = {
    subtitle: sectionBeingEdited.children[0].innerHTML,
    paragraph: paragraphs.map(function(para){ return para.innerHTML })
  }
  const newParagraphButton = document.createElement('button')
  newParagraphButton.innerHTML = 'New paragraph'
  newParagraphButton.addEventListener('click', function () {
    //func defined in scripts.js
    addNewParagraph('aboutSection', i) //eslint-disable-line
  })
  document.getElementsByClassName('buttonsContainer')[i].appendChild(newParagraphButton)
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line

  sectionBeingEdited.innerHTML = ''
  const subtitleInput = document.createElement('input')
  subtitleInput.value = oldData.subtitle
  sectionBeingEdited.appendChild(subtitleInput)
  //create specific input fields and populate with current paragraphs
  var paragraphInput
  oldData.paragraph.forEach(function (oldPara) {
    paragraphInput = document.createElement('textarea')
    paragraphInput.value = oldPara
    sectionBeingEdited.appendChild(paragraphInput)
  })

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[3]
  saveButton.addEventListener('click', function () {
    //array of input field objects
    const inputFields = Array.from(sectionBeingEdited.children)
    const newData = {
      subtitle: inputFields[0].value,
      paragraph: inputFields.map(function (inputObj) { return inputObj.value}).slice(1)
    }
  updatePageContent('/about/', newData, oldData) //eslint-disable-line
  })
}

if(document.getElementsByClassName('editButton').length) {
  const editButton = Array.from(document.getElementsByClassName('editButton'))
  editButton.forEach(function (el, i) {
    el.addEventListener('click', function () {
      createEditAboutSection(i) //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('deleteButton').length) {
  const deleteButton = Array.from(document.getElementsByClassName('deleteButton'))
  deleteButton.forEach(function (el, i) {
    el.addEventListener('click', function () {
      const sectionBeingDeleted = document.getElementsByClassName('aboutSection')[i]
      const oldData = {
        subtitle: sectionBeingDeleted.children[0].innerHTML,
        paragraph: Array.from(sectionBeingDeleted.children).map(function(pTag) {return pTag.innerHTML}).slice(1)
      }
      updatePageContent('/about/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
