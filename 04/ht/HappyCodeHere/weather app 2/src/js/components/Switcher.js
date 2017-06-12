

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
