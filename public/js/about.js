
const addNewSection = () => {
  document.getElementById('newSection').innerHTML = ''
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('saveNewSection').addEventListener('click', () => {
    const newData = {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: document.getElementsByTagName('textarea')[0].value
    }
    updatePageContent('/about/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const createEditAboutSection = (i) => {
  // save data before changes are made
  const oldData = {
    subtitle: document.getElementsByClassName('aboutParagraph')[i].children[0].innerHTML,
    paragraph: document.getElementsByClassName('aboutParagraph')[i].children[1].innerHTML
  }
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line

  //create specific input fields
  const input = document.createElement('input')
  const textArea = document.createElement('textarea')
  input.value = oldData.subtitle
  textArea.value = oldData.paragraph
  document.getElementsByClassName('aboutParagraph')[i].innerHTML = ''
  document.getElementsByClassName('aboutParagraph')[i].appendChild(input)
  document.getElementsByClassName('aboutParagraph')[i].appendChild(textArea)

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[2]
  saveButton.addEventListener('click', () => {
    const newData = {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: document.getElementsByTagName('textarea')[0].value
    }
  updatePageContent('/about/', newData, oldData) //eslint-disable-line
  })
}

if(document.getElementsByClassName('aboutEditButton').length) {
  const aboutEditButton = Array.from(document.getElementsByClassName('aboutEditButton'))
  aboutEditButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      createEditAboutSection(i) //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('aboutDeleteButton').length) {
  const aboutDeleteButton = Array.from(document.getElementsByClassName('aboutDeleteButton'))
  aboutDeleteButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      const oldData = {
        subtitle: document.getElementsByClassName('aboutParagraph')[i].children[0].innerHTML,
        paragraph: document.getElementsByClassName('aboutParagraph')[i].children[1].innerHTML
      }
      updatePageContent('/about/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
