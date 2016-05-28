const addNewSection = () => {
  const aboutSections = document.getElementsByClassName('aboutSection')
  const indexOfNewSection = Array.from(aboutSections).length - 1
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('addParagraphButton').addEventListener('click', () => {
    addNewParagraph(indexOfNewSection)
  })
  document.getElementById('saveNewSection').addEventListener('click', () => {
    const newData = {
      subtitle: document.getElementsByTagName('input')[0].value,
      paragraph: Array.from(aboutSections[indexOfNewSection].children).filter((inputObj,j) => j>0).map(inputObj => inputObj.value)
    }
    updatePageContent('/about/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

const addNewParagraph = (i) => {
  const newInput = document.createElement('input')
  document.getElementsByClassName('aboutSection')[i].appendChild(newInput)
}

const createEditAboutSection = (i) => {
  const aboutSection = document.getElementsByClassName('aboutSection')
  // save data before changes are made
  const paragraphs = Array.from(aboutSection[i].getElementsByTagName('p'))
  const oldData = {
    subtitle: aboutSection[i].children[0].innerHTML,
    paragraph: paragraphs.map(para => para.innerHTML )
  }
  const newParagraphButton = document.createElement('button')
  newParagraphButton.innerHTML = 'New paragraph'
  newParagraphButton.addEventListener('click', () => {addNewParagraph(i)})
  document.getElementsByClassName('buttonsContainer')[i].appendChild(newParagraphButton)
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line

  aboutSection[i].innerHTML = ''
  const subtitleInput = document.createElement('input')
  subtitleInput.value = oldData.subtitle
  aboutSection[i].appendChild(subtitleInput)
  //create specific input fields and populate with current paragraphs
  let paragraphInput
  oldData.paragraph.forEach(oldPara => {
    paragraphInput = document.createElement('input')
    paragraphInput.value = oldPara
    aboutSection[i].appendChild(paragraphInput)
  })

  //add event listener to save button
  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[3]
  saveButton.addEventListener('click', () => {
    //array of input field objects
    const input = Array.from(aboutSection[i].children)
    const newData = {
      subtitle: input[0].value,
      paragraph: input.filter((inputObj,j) => j>0).map(inputObj => inputObj.value)
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
        subtitle: document.getElementsByClassName('aboutSection')[i].children[0].innerHTML,
        paragraph: document.getElementsByClassName('aboutSection')[i].children[1].innerHTML
      }
      updatePageContent('/about/', null, oldData) //eslint-disable-line
    })
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
