const logout = () => {
  console.log('logging out')
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log('responsetext: ', xhr.responseText)
      window.location.href = '/login'
    }
  }
  xhr.open('post', '/logout')
  xhr.send()
}

document.getElementById('logout').addEventListener('click', logout)

const editContent = (index) => {
  // changing title and paragraph to text boxes with correct content
  const title = document.getElementsByClassName('aboutParagraph')[index].children[0].innerHTML
  const paragraph = document.getElementsByClassName('aboutParagraph')[index].children[1].innerHTML
  // document.getElementsByClassName('aboutParagraph')[index].innerHTML = ''
  const titleText = document.createElement('input')
  titleText.classList.add('titleInput')
  titleText.value = title
  paragraph.className = 'paragraphInput'
  const paragraphText = document.createElement('input')
  paragraphText.value = paragraph
  document.getElementsByClassName('aboutParagraph')[index].appendChild(titleText)
  document.getElementsByClassName('aboutParagraph')[index].appendChild(paragraphText)

  // changing buttons from edit and delete to save and cancel with correct onclick event changes
  document.getElementsByClassName('aboutEditButton')[index].innerHTML = 'save'
  document.getElementsByClassName('aboutDeleteButton')[index].innerHTML = 'cancel'
  document.getElementsByClassName('aboutEditButton')[index].removeEventListener('click', editContent)
  document.getElementsByClassName('aboutEditButton')[index].addEventListener('click', saveContent)
  document.getElementsByClassName('aboutDeleteButton')[index].removeEventListener('click', deleteContent)
  document.getElementsByClassName('aboutDeleteButton')[index].addEventListener('click', cancelContent)
}

const deleteContent = () => {
  console.log('deleting content')
}

const saveContent = () => {
  console.log('hi ivan')
  //console.log(document.getElementsByClassName('titleInput')[0].value)
  // const xhr = new XMLHttpRequest()
  // xhr.onreadystatechange = () => {
  //   if(xhr.readyState === 4 && xhr.status === 200) {
  //     // location.reload()
  //   }
  // }
  // xhr.open('post', '/about/save')
  // xhr.send(JSON.stringify({
  //   index: 0,
  //   title: document.getElementsByClassName('titleInput')[0].value,
  //   paragraph: document.getElementsByTagName('input')[1].value
  // }))
}

const cancelContent = () => {
  console.log('cancelling content')
  location.reload()
}

if(document.getElementsByClassName('aboutEditButton').length) {
  const aboutEditButton = Array.from(document.getElementsByClassName('aboutEditButton'))
  aboutEditButton.forEach((el, i) => {
    el.addEventListener('click', () => { editContent(i) })
  })
}

if(document.getElementsByClassName('aboutDeleteButton').length) {
  document.getElementsByClassName('aboutDeleteButton')[0].addEventListener('click', deleteContent)
}
