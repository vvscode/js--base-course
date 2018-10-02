export default function renderAuthor(content) {
  let author = document.querySelector('.content > .authorWrapper');
  let about = document.querySelector('.content > .aboutWrapper');
  if(author) {
    content.removeChild(author);
  }
  if(about) {
    content.removeChild(about);
  }
  var aboutWrapper = document.createElement('div');
  aboutWrapper.innerHTML = `
    <h1> Weather Map</h1>
    <h2> Description: </h2>
    <div> WeatherMap is a Single Page Application used to fetch weather at specified location. </div>
    <h2> Basic Usage: </h2>
    <div> Desired location can be entered by:</div>
    <ul>
      <li> Entering location name in the searchbar and press Enter, </li>
      <li> Setting url hash to '#city=[location name]', </li>
      <li> Setting url hash to '#coordinates=[location lat, location lng]', </li>
      <li> Scrolling the map. </li>
    </ul>
    <div> Last 5 entries are stored at local storage and displayed in the bottom left. </div>
    <div> You can go to their coordinates by clicking on them. </div>
    <div> You can add current map center coordinates to favourites by pressing button at the top right of the map. </div>
    <div> Different query methods can be used! Alter them by selecting 'XHR' or 'fetch' at the top lef. </div>
    `;
  aboutWrapper.className = 'aboutWrapper';
  content.appendChild(aboutWrapper);
}
