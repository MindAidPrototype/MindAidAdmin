
const addNewSection = () => {
  document.getElementById('newSection').innerHTML = ''
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('saveNewSection').addEventListener('click', () => {saveContent('new', '/about/save')}) //eslint-disable-line
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

if(document.getElementsByClassName('aboutEditButton').length) {
  const aboutEditButton = Array.from(document.getElementsByClassName('aboutEditButton'))
  aboutEditButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      editContent(i, '/about/save') //eslint-disable-line
    })
  })
}

if(document.getElementsByClassName('aboutDeleteButton').length) {
  const aboutDeleteButton = Array.from(document.getElementsByClassName('aboutDeleteButton'))
  aboutDeleteButton.forEach((el, i) => {
    el.addEventListener('click', () => { deleteContent(i, '/about/delete') }) //eslint-disable-line
  })
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
