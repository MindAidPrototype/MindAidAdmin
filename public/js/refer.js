
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
    updateArray('/refer/', newData.identifier, newData.data, oldData.data) //eslint-disable-line
  })

  if(oldData.identifier === 'community' || oldData.identifier === 'selfReferral') {
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
      updateArray('/refer/', oldData.identifier, null, oldData.data) //eslint-disable-line
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
  const newSection = document.getElementsByClassName('newSection')[i]
  const newInputFields = document.getElementsByClassName('newInput')[i]
  const newInputClasses = Array.from(newInputFields.classList)
  document.getElementsByClassName('newSection')[i].classList = 'newSection'
  document.getElementsByClassName('newSectionButton')[i].classList.add('hide')
  document.getElementsByClassName('saveNewButton')[i].addEventListener('click', () => {
    const newData = getNewData(newInputFields)
    updateArray('/refer/', newData.identifier, newData.data) //eslint-disable-line
  })

  if (newInputClasses.indexOf('community') > -1 || newInputClasses.indexOf('selfReferral') > -1 ){
    newSection.getElementsByClassName('addLinkButton')[0].addEventListener('click', function() {
      const div = createLinkInputsDiv() // eslint-disable-line
      newSection.getElementsByClassName('links')[0].appendChild(div)
    })
  }

  document.getElementsByClassName('cancelNewSection')[i].addEventListener('click', cancelContent) //eslint-disable-line
}

const getOldData = function(i) {
  var data = {}
  const sectionBeingEdited = document.getElementsByTagName('section')[i]
  const details = getIdentifierAndPropNames(sectionBeingEdited)
  if (details.identifier === 'national' || details.identifier === 'school') {
    details.properties.forEach(function(el, j) {
      data[el] = sectionBeingEdited.children[j].children[0].innerHTML
    })
  } else if (details.identifier === 'community' || details.identifier === 'selfReferral') {
    details.properties.forEach(function(prop, j) {
      if (prop === 'links') {
        const linksDiv = Array.from(sectionBeingEdited.getElementsByClassName('links')[0].children)
        data[prop] = linksDiv.map(function(div) {
          return { name: div.children[0].children[0].innerHTML,
            link: div.children[1].children[0].innerHTML }
        })
      } else {
        data[prop] = sectionBeingEdited.children[j].children[0].innerHTML
      }
    })
  }
  return {
    identifier: details.identifier,
    data
  }
}
const getIdentifierAndPropNames = function(sectionBeingEdited) {
  const classes = Array.from(sectionBeingEdited.classList)
  if (classes.indexOf('national') > -1) {
    return {
      identifier: 'national',
      properties: ['section','phone','link','advice']
    }
  } else if (classes.indexOf('school') > -1) {
    return {
      identifier: 'school',
      properties: ['name','position','description','email', 'phone']
    }
  } else if (classes.indexOf('community') > -1) {
    return {
      identifier: 'community',
      properties: ['name','position','description','email', 'phone', 'links']
    }
  } else if (classes.indexOf('selfReferral') > -1) {
    return {
      identifier: 'selfReferral',
      properties: ['serviceName','description','email', 'links']
    }
  }
}

const getNewData = function(sectionBeingEdited) {
  var data = {}
  const details = getIdentifierAndPropNames(sectionBeingEdited)
  if (details.identifier === 'national' || details.identifier === 'school') {
    details.properties.forEach(function(el, i) {
      data[el] = sectionBeingEdited.children[i].lastChild.value
    })
  } else if (details.identifier === 'community' || details.identifier === 'selfReferral') {
    details.properties.forEach(function(prop, j) {
      if (prop === 'links') {
        const linksDiv = Array.from(sectionBeingEdited.getElementsByClassName('links')[0].children)
        data[prop] = linksDiv.map(function(div) {
          return { name: div.children[0].lastChild.value,
            link: div.children[1].lastChild.value }
        })
      } else {
        data[prop] = sectionBeingEdited.children[j].lastChild.value
      }
    })
  }
  return {
    identifier: details.identifier,
    data
  }
}

const createAddbutton = function(sectionBeingAppendedTo, i, innerhtml) { //eslint-disable-line
  const addButton = document.createElement('button')
  addButton.innerHTML = innerhtml
  addButton.addEventListener('click', function() {
    const div = createLinkInputsDiv()
    sectionBeingAppendedTo.getElementsByClassName('links')[0].appendChild(div)
  })
  document.getElementsByClassName('buttonsContainer')[i].appendChild(addButton)
}

const createLinkInputsDiv = function () {
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

  return div

}
