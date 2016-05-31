const addNewSection = () => {
  const listenSections = document.getElementsByClassName('listenSection')
  const indexOfNewSection = Array.from(listenSections).length - 1
  document.getElementsByClassName('hider')[0].className = ''
  document.getElementById('newSection').classList.add('hider')
  document.getElementById('saveNewSection').addEventListener('click', () => {
    const inputFields = Array.from(listenSections[indexOfNewSection].children)
    const newData = { newQuestion: inputFields[0].value }
    updatePageContent('/listen/', newData) //eslint-disable-line
  })
  document.getElementById('cancelNewSection').addEventListener('click', cancelContent) //eslint-disable-line
}

if(document.getElementById('newSection')) {
  document.getElementById('newSection').addEventListener('click', addNewSection)
}
