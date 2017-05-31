var url = 'https://cdn.rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/buildRawGit/index.html';
var newUrl = '';

var button = document.querySelector('button');
button.addEventListener('click', handleButtonClick);


function handleButtonClick() {
  event.preventDefault();

  let id, showControls, allowAddEvents, allowRemoveEvents, className, title;

  id = document.getElementById('id').value;
  showControls = document.getElementById('change-date').checked || '';
  allowAddEvents = document.getElementById('add-events').checked || '';
  allowRemoveEvents = document.getElementById('delete-events').checked || '';
  className = document.getElementById('classes').value;

  title = document.getElementById('title').value;

  newUrl = `${url}?id=${id}&showControls=${showControls}&allowAddEvents=${allowAddEvents}&allowRemoveEvents=${allowRemoveEvents}&className=${className}&title=${title}`;

  var iframe = document.querySelector('iframe');
  iframe.src = newUrl;

  var copy = document.getElementById('copy-code');
  copy.innerText = newUrl;
  copy.parentNode.style.display = 'block';
  copy.focus();
  copy.select();


  // fetch(newUrl).then((data) => {
  //   console.log(data);
  //   // document.write(JSON.stringify(data.body))
  //   return data.text();
  // }).then(data2 => {
  //   console.log(data2)
  //   // document.write(data2)
  //   var div = document.createElement('div');
  //   div.innerHTML = data2;
  //   document.body.appendChild(div);
  // })
}
