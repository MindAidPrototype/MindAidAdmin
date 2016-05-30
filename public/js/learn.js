if(document.getElementsByClassName('deleteButton').length) {
  const deleteButton = Array.from(document.getElementsByClassName('deleteButton'))
  deleteButton.forEach((el, i) => {
    el.addEventListener('click', () => {
      console.log('clicked')
      const sectionBeingDeleted = document.getElementsByClassName('learnSection')[i]
      const oldData = {
        category: sectionBeingDeleted.children[0].innerHTML,
        things_to_know: Array.from(sectionBeingDeleted.children).map(pTag => pTag.innerHTML).slice(1)
      }
      console.log(oldData)
      updatePageContent('/learn/', null, oldData) //eslint-disable-line
    })
  })
}
