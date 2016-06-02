const addNewSection = function () {
  const learnSections = document.getElementsByClassName('learnSection')
  const indexOfNewSection = Array.from(learnSections).length - 1
  document.getElementsByClassName('hide')[0].className = ''
  document.getElementById('newSection').classList.add('hide')
  document.getElementById('addParagraphButton').addEventListener('click', function () {
    addNewParagraph('learnSection', indexOfNewSection) //eslint-disable-line
  })
  document.getElementById('saveNewSection').addEventListener('click', function () {
    const inputFields = Array.from(learnSections[indexOfNewSection].children)
    const newData = {
      category: inputFields[0].value,
      subtitle: inputFields[1].value,
      link: inputFields[2].value,
      thingsToKnow: inputFields.map(function (inputObj) {return inputObj.value}).slice(3)
    }
    updatePageContent('/learn/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const createEditSection = function (i) {
  const sectionBeingEdited = document.getElementsByClassName('learnSection')[i]
  // save data before changes are made
  const paragraphs = Array.from(sectionBeingEdited.getElementsByTagName('p'))
  const oldData = {
    category: sectionBeingEdited.children[0].innerHTML,
    subtitle: sectionBeingEdited.children[1].innerHTML,
    link: sectionBeingEdited.children[2].innerHTML,
    thingsToKnow: paragraphs.map(function(para) {return para.innerHTML}),
  }
  const newParagraphButton = document.createElement('button')
  newParagraphButton.innerHTML = 'New paragraph'
  newParagraphButton.addEventListener('click', function () {
    //func defined in scripts.js
    addNewParagraph('learnSection', i) //eslint-disable-line
  })
  document.getElementsByClassName('buttonsContainer')[i].appendChild(newParagraphButton)
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line

  sectionBeingEdited.innerHTML = ''
  const categoryInput = document.createElement('input')
  categoryInput.value = oldData.category
  sectionBeingEdited.appendChild(categoryInput)

  const subtitle = document.createElement('input')
  subtitle.value = oldData.subtitle
  sectionBeingEdited.appendChild(subtitle)

  const link = document.createElement('input')
  link.value = oldData.link
  sectionBeingEdited.appendChild(link)

  var paragraphInput
  oldData.thingsToKnow.forEach(function (oldPara) {
    paragraphInput = document.createElement('input')
    paragraphInput.value = oldPara
    sectionBeingEdited.appendChild(paragraphInput)
  })

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[3]
  saveButton.addEventListener('click', function () {
    //array of input field objects
    const inputFields = Array.from(sectionBeingEdited.children)
    const newData = {
      category: inputFields[0].value,
      subtitle: inputFields[1].value,
      link: inputFields[2].value,
      thingsToKnow: inputFields.map(function (inputObj) {return inputObj.value}).slice(3)
    }
    updatePageContent('/learn/', newData, oldData) //eslint-disable-line
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
      const sectionBeingDeleted = document.getElementsByClassName('learnSection')[i]
      const oldData = {
        category: sectionBeingDeleted.children[0].innerHTML,
        subtitle: sectionBeingDeleted.children[1].innerHTML,
        link: sectionBeingDeleted.children[2].innerHTML,
        thingsToKnow: Array.from(sectionBeingDeleted.children).map(function (pTag) {return pTag.innerHTML}).slice(3)
      }
      console.log(oldData, '<oldData')
      updatePageContent('/learn/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
