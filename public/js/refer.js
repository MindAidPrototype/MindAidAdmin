
const createEditSection = (i, sectionBeingEdited) => {
  const oldData = getOldData(i)
  // func defined in script.js
  createSaveAndCancelButtons(i) //eslint-disable-line
  const pTags = Array.from(sectionBeingEdited.getElementsByTagName('p'))
  pTags.forEach(function(pTag) {
    pTag.children[0].style.display = 'none'
    const input = document.createElement('input')
    input.value = pTag.children[0].innerHTML
    pTag.appendChild(input)
  })

  const saveButton = document.getElementsByClassName('buttonsContainer')[i].children[2]
  saveButton.addEventListener('click', () => {
    const newData = getNewData(sectionBeingEdited)
    updateArray('/refer/', newData.identifier, newData.newData, oldData.oldData) //eslint-disable-line
  })

  if(oldData.identifier === 'community') {
    createAddbutton(sectionBeingEdited, i, 'add another link') //eslint-disable-line
  }
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
      const oldData = getOldData(i)
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
  document.getElementsByClassName('newSectionButton')[i].classList.add('hide')
  document.getElementsByClassName('saveNewButton')[i].addEventListener('click', () => {
    const newSection = document.getElementsByClassName('newInput')[i]
    const newData = getNewData(newSection)
    updateArray('/refer/', newData.identifier, newData.newData) //eslint-disable-line
  })
  document.getElementsByClassName('cancelNewSection')[i].addEventListener('click', cancelContent) //eslint-disable-line
}

const getOldData = function(i) {
  const sectionBeingEdited = document.getElementsByTagName('section')[i]
  const classes = Array.from(sectionBeingEdited.classList)
  var properties, oldData ={}, identifier
  if (classes.indexOf('national') > -1) {
    identifier = 'national'
    properties = ['section','phone','link','advice']
    properties.forEach(function(el, j) {
      oldData[el] = sectionBeingEdited.children[j].children[0].innerHTML
    })
  } else if (classes.indexOf('school') > -1) {
    identifier = 'school'
    properties = ['name','position','description','email', 'phone']
    properties.forEach(function(el, j) {
      oldData[el] = sectionBeingEdited.children[j].children[0].innerHTML
    })
  } else if (classes.indexOf('community') > -1) {
    identifier = 'community'
    properties = ['name','position','description','email', 'phone', 'links']
    properties.forEach(function(prop, j) {
      if (properties[j] === 'links') {
        oldData[prop] = Array.from(sectionBeingEdited.children[j].children).map(function(child) {
          return { name: child.children[0].children[0].innerHTML,
            link: child.children[1].children[0].innerHTML }
        })
      } else {
        oldData[prop] = sectionBeingEdited.children[j].children[0].innerHTML
      }
    })
    console.log(oldData)
  }
  return {
    identifier,
    oldData
  }
}

const getNewData = function(sectionBeingEdited) {
  const classes = Array.from(sectionBeingEdited.classList)
  var properties, newData = {}, identifier
  if (classes.indexOf('national') > -1) {
    identifier = 'national'
    properties = ['section','phone','link','advice']
    properties.forEach(function(el, i) {
      newData[el] = sectionBeingEdited.children[i].lastChild.value
    })
  } else if (classes.indexOf('school') > -1) {
    identifier = 'school'
    properties = ['name','position','description','email', 'phone']
    properties.forEach(function(el, i) {
      newData[el] = sectionBeingEdited.children[i].lastChild.value
    })
  } else if (classes.indexOf('community') > -1) {
    identifier = 'community'
    properties = ['name','position','description','email', 'phone', 'links']
    properties.forEach(function(prop, j) {
      if (prop === 'links') {
        const linksDiv = Array.from(sectionBeingEdited.getElementsByClassName('links')[0].children)
        newData[prop] = linksDiv.map(function(div) {
          return { name: div.children[0].lastChild.value,
            link: div.children[1].lastChild.value }
        })
      } else {
        newData[prop] = sectionBeingEdited.children[j].lastChild.value
      }
    })
    console.log(newData.links, '<<<<<<<')
  }
  return {
    identifier,
    newData
  }
}
