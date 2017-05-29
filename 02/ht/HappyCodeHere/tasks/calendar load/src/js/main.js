var url = 'https://cdn.rawgit.com/HappyCodeHere/js--base-course/02/02/ht/HappyCodeHere/tasks/calendar/dist/index.html';
var newUrl = '';



var button = document.querySelector('button');
button.addEventListener('click', handleButtonClick);


function handleButtonClick() {
  console.log('clicked');

  let id, showControls, allowAddEvents, allowRemoveEvents, className, title;


  id = document.getElementById('id').value;
  showControls = document.getElementById('change-date').checked || '';
  allowAddEvents = document.getElementById('add-events').checked || '';
  allowRemoveEvents = document.getElementById('delete-events').checked || '';
  className = document.getElementById('classes').value;
  title = document.getElementById('title').value;


  console.dir(showControls);

  newUrl = `${url}?id=${id}&showControls=${showControls}&allowAddEvents=${allowAddEvents}&allowRemoveEvents=${allowRemoveEvents}&className=${className}&title=${title}`;

  console.log(newUrl);

  var iframe = document.querySelector('iframe');
  iframe.src = newUrl;

  var copy = document.getElementById('copy-code');
  copy.innerText = newUrl;

}
