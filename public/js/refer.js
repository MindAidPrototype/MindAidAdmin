
const createEditSection = (i, sectionBeingEdited) => {
  const oldData = storeOldData(i)
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line
  const pTags = Array.from(sectionBeingEdited.children)
  pTags.forEach(function(pTag) {
    pTag.children[0].style.display = 'none'
    const input = document.createElement('input')
    input.value = pTag.children[0].innerHTML
    pTag.appendChild(input)
  })

  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[2]
  saveButton.addEventListener('click', () => {
    const newData = storeNewData(sectionBeingEdited, 1)
    console.log(newData.newData)
    console.log(oldData.oldData)
    updateArray('/refer/', newData.identifier, newData.newData, oldData.oldData) //eslint-disable-line
  })
}

if(document.getElementsByClassName('editButton').length) {
  const editButton = Array.from(document.getElementsByClassName('editButton'))

  editButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      const sectionBeingEdited = document.getElementsByTagName('section')[i]
      createEditSection(i, sectionBeingEdited) //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('deleteButton').length) {
  const deleteButton = Array.from(document.getElementsByClassName('deleteButton'))
  deleteButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      const oldData = storeOldData(i)
      updateArray('/refer/', oldData.identifier, null, oldData.oldData) //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('newSectionButton')) {
  const newSectionButton = Array.from(document.getElementsByClassName('newSectionButton'))
  newSectionButton.forEach(function(el, i) {
    el.addEventListener('click', function() {
      addNewSection(i)
    })
  })
}

const addNewSection = function (i) {
  document.getElementsByClassName('newSection')[i].classList = 'newSection'
  document.getElementsByClassName('saveButton')[i].addEventListener('click', () => {
    const newSection = document.getElementsByClassName('newInput')[i]
    const newData = storeNewData(newSection, 0)
    console.log(newData.identifier, newData.newData, "<<<<newSec")
    updateArray('/refer/', newData.identifier, newData.newData) //eslint-disable-line
  })
}

const storeOldData = function(i) {
  const sectionBeingEdited = document.getElementsByTagName('section')[i]
  const classes = Array.from(sectionBeingEdited.classList)
  var oldData ={}, identifier
  if (classes.indexOf('national') > -1) {
    identifier = 'national'
    oldData = {
      section: sectionBeingEdited.children[0].children[0].innerHTML,
      phone: sectionBeingEdited.children[1].children[0].innerHTML,
      link: sectionBeingEdited.children[2].children[0].innerHTML,
      advice: sectionBeingEdited.children[3].children[0].innerHTML
    }
  } else if (classes.indexOf('school') > -1) {
    identifier = 'school'
    const properties = ['name','postion','description','email', 'phone']
    properties.forEach(function(el, j) {
      oldData[el] = sectionBeingEdited.children[j].children[0].innerHTML
    })
  }
  console.log(oldData, '<<<<<<old')
  return {
    identifier,
    oldData
  }
}

const storeNewData = function(sectionBeingEdited, child) {
  const classes = Array.from(sectionBeingEdited.classList)
  var newData = {}, identifier
  if (classes.indexOf('national') > -1) {
    identifier = 'national'
    newData = {
      section: sectionBeingEdited.children[0].children[child].value,
      phone: sectionBeingEdited.children[1].children[child].value,
      link: sectionBeingEdited.children[2].children[child].value,
      advice: sectionBeingEdited.children[3].children[child].value
    }
  } else if (classes.indexOf('school') > -1) {
    identifier = 'school'
    const properties = ['name','postion','description','email', 'phone']
    properties.forEach(function(el, i) {
      newData[el] = sectionBeingEdited.children[i].children[child].value
    })
  }
  console.log(newData, '<<<<<<new')
  return {
    identifier,
    newData
  }
}
