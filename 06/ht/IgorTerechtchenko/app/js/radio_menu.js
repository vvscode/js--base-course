export default function RadioMenu(el, bus) {
  this.el = el;
  this.bus = bus;
  this.radioMenuWrapper = document.createElement('div');
  this.radioMenuWrapper.className = 'radioMenu';
  this.el.appendChild(this.radioMenuWrapper);
  this.currentSelection;
}

RadioMenu.prototype = {
  render: function() {
    this.radioMenuWrapper.innerHTML = 
    `<form>
          <fieldset>
              <legend>select request method</legend>
              <div>
                  <input type="radio" class="XHRButton" value="xhr" name="queryMethod" />
                  <label for="XHR">XHR</label>
              </div>
              <div>
                  <input type="radio" class="fetchButton" value="fetch" name="queryMethod" checked />
                  <label for="fetch">fetch</label>
              </div>
          </fieldset>
      </form>`
    this.radioMenuWrapper.addEventListener('click', (e) => {
      if(e.target.value) {
        if(e.target.value !== this.currentSelection) {
          this.bus.trigger('radioOptionSwitch', e.target.value);
          this.currentSelection = e.target.value;
        }
      }
    });
  },
}
