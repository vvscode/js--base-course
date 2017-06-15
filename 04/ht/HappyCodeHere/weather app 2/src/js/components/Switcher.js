

class Switcher {
  constructor() {

  }

  renderSwitcher() {
    const text = `
      <div class="col-md-4 switcher">
        Request type: <span>Fetch</span>
        <label class="switch">
          <input type="checkbox" checked>
          <div class="slider round"></div>
        </label>
      </div>
    `
  }
}

export default Switcher;


// document.querySelector('.switcher input').addEventListener('change', (event) => {
//   const { checked } = event.target;
//   const requestType = document.querySelector('.switcher span');
//
//   if (checked) {
//     isFetchRequest = true;
//     requestType.innerHTML = 'Fetch';
//   } else {
//     isFetchRequest = false;
//     requestType.innerHTML = 'XHR';
//   }
// })
