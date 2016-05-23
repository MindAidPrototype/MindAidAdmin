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

const editContent = () => {
  // changing title and paragraph to text boxes with correct content
  const title = document.getElementsByClassName('aboutParagraph')[0].children[0].innerHTML
  const paragraph = document.getElementsByClassName('aboutParagraph')[0].children[1].innerHTML
  document.getElementsByClassName('aboutParagraph')[0].innerHTML = ''
  const titleText = document.createElement('input')
  titleText.value = title
  const paragraphText = document.createElement('input')
  paragraphText.value = paragraph
  document.getElementsByClassName('aboutParagraph')[0].appendChild(titleText)
  document.getElementsByClassName('aboutParagraph')[0].appendChild(paragraphText)

  // changing buttons from edit and delete to save and cancel with correct onclick event changes
  document.getElementsByClassName('aboutEditButton')[0].innerHTML = 'save'
  document.getElementsByClassName('aboutDeleteButton')[0].innerHTML = 'cancel'
  document.getElementsByClassName('aboutEditButton')[0].removeEventListener('click', editContent)
  document.getElementsByClassName('aboutEditButton')[0].addEventListener('click', saveContent)
  document.getElementsByClassName('aboutDeleteButton')[0].removeEventListener('click', deleteContent)
  document.getElementsByClassName('aboutDeleteButton')[0].addEventListener('click', cancelContent)
}

const deleteContent = () => {
  console.log('deleting content')
}

const saveContent = () => {
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      location.reload()
    }
  }
  xhr.open('post', '/about/save')
  xhr.send(JSON.stringify({
    index: 0,
    title: document.getElementsByTagName('input')[0].value,
    paragraph: document.getElementsByTagName('input')[1].value
  }))
}

const cancelContent = () => {
  console.log('cancelling content')
  location.reload()
}

if(document.getElementsByClassName('aboutEditButton').length) {
  document.getElementsByClassName('aboutEditButton')[0].addEventListener('click', editContent)
}

if(document.getElementsByClassName('aboutDeleteButton').length) {
  document.getElementsByClassName('aboutDeleteButton')[0].addEventListener('click', deleteContent)
}
