const addNewSection = () => {
  const aboutSections = document.getElementsByClassName('aboutSection')
  const indexOfNewSection = Array.from(aboutSections).length - 1
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('addParagraphButton').addEventListener('click', () => {
    addNewParagraph('aboutSection', indexOfNewSection) //eslint-disable-line
  })
  document.getElementById('saveNewSection').addEventListener('click', () => {
    const inputFields = Array.from(aboutSections[indexOfNewSection].children)
    const newData = {
      subtitle: inputFields[0].value,
      paragraph: inputFields.map(inputObj => inputObj.value).slice(1)
    }
    updatePageContent('/about/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const createEditAboutSection = (i) => {
  const sectionBeingEdited = document.getElementsByClassName('aboutSection')[i]
  // save data before changes are made
  const paragraphs = Array.from(sectionBeingEdited.getElementsByTagName('p'))
  const oldData = {
    subtitle: sectionBeingEdited.children[0].innerHTML,
    paragraph: paragraphs.map(para => para.innerHTML )
  }
  const newParagraphButton = document.createElement('button')
  newParagraphButton.innerHTML = 'New paragraph'
  newParagraphButton.addEventListener('click', () => {
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
  let paragraphInput
  oldData.paragraph.forEach(oldPara => {
    paragraphInput = document.createElement('input')
    paragraphInput.value = oldPara
    sectionBeingEdited.appendChild(paragraphInput)
  })

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[3]
  saveButton.addEventListener('click', () => {
    //array of input field objects
    const inputFields = Array.from(sectionBeingEdited.children)
    const newData = {
      subtitle: inputFields[0].value,
      paragraph: inputFields.map(inputObj => inputObj.value).slice(1)
    }
  updatePageContent('/about/', newData, oldData) //eslint-disable-line
  })
}

if(document.getElementsByClassName('editButton').length) {
  const editButton = Array.from(document.getElementsByClassName('editButton'))
  editButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      createEditAboutSection(i) //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('deleteButton').length) {
  const deleteButton = Array.from(document.getElementsByClassName('deleteButton'))
  deleteButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      const sectionBeingDeleted = document.getElementsByClassName('aboutSection')[i]
      const oldData = {
        subtitle: sectionBeingDeleted.children[0].innerHTML,
        paragraph: Array.from(sectionBeingDeleted.children).map(pTag => pTag.innerHTML).slice(1)
      }
      updatePageContent('/about/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
