const sendData = () => {
  const data = document.getElementById('input').value;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log('returned with', xhr.responseText)
    }
  }
  xhr.open('get', '/sendData/' + data);
  xhr.send();
}

document.getElementById('sendData').addEventListener('click', sendData);

const getData = () => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
      const array = JSON.parse(xhr.responseText).map(el => el.input);
      document.getElementById('container').innerHTML = array;
    }
  }
  xhr.open('get', '/getData');
  xhr.send();
}

document.getElementById('getData').addEventListener('click', getData);
