let task = new Task();
task.start();

function Task() {
	let form = document.createElement('form');
		form.id = `message`;
	let title = document.createElement('h1');
		title.id = `title`;
		title.innerText = `Заполните форму`;
		form.appendChild(title);
	let inName = document.createElement('input');
		inName.id = `name`;
		inName.placeholder = `Your name`;
		form.appendChild(inName);
	let inAge = document.createElement('input');
		inAge.id = `age`;
		inAge.placeholder = `Your age`;
		form.appendChild(inAge);
	let button = document.createElement('input');
		button.disabled = true;
		button.type = `submit`;
		button.value = `Отправить`;
		button.id = `button`;
		form.appendChild(button);
	let self = this;

	function eventMessage() { //events of form
		let str=``;
		inAge.oninput = function() {
			if (this.value == ``) {str=``;return};
			let last = this.value[this.value.length-1];
			if (!isNaN(last) && last != ` `) {str = this.value} else {this.value = str}
		}
		inName.onblur = inAge.onblur = checkInput;
		inName.onfocus = inAge.onfocus = function() {
			if (this.classList.contains(`stop`)) {
				this.classList.remove(`stop`);
			}
		}
		form.onsubmit = function() {return false};
		button.onclick = function() {
			self.name = inName.value;
			self.age = +inAge.value;
			stop();
		};
	}

	function checkInput() { //check field input
		if (this.value.trim()==``) {
			this.classList.add('stop');
			button.disabled = true;
		} else {
			button.disabled = false;
			if (this.classList.contains('stop')) {
				this.classList.remove('stop');
			}
		}
	}

	function clearInput(){ // clear inputs
		inName.value = ``;
		inAge.value = ``;
	}

	function hiddenAll(value) { // show/hide page's elements
		let allElem = document.body.children;
		allElem.forEach = [].forEach;
		allElem.forEach(function(elem) {
			if (elem.tagName != `SCRIPT`) {
				value ? elem.classList.add(`hid`) : elem.classList.remove(`hid`);
			}
		});
		document.body.style.background = value ? `#eee` : ``;
	}

	this.start = function() { //create and show message
		clearInput();
		if (!document.querySelector(`#message`)) {
			hiddenAll(true);
			document.body.appendChild(form);
			eventMessage();
			offsetInCenter(form)
		}
	}
	function offsetInCenter(elem) { // fix element on the center of screen
		elem.style.position = 'fixed';
		let coor = elem.getBoundingClientRect();
		let left = document.documentElement.clientWidth/2-coor.width/2;
		if (left<0) {left=0};
		let top = document.documentElement.clientHeight/2-coor.height/2;
		if (top<0) {top=0};
		elem.style.left = `${left}px`;
		elem.style.top = `${top}px`;
	}
	function stop() { // send form
		form.parentNode.removeChild(form);
		hiddenAll(false);
		document.onmousedown = null;
		self.str = self.age>=18 ? `Привествую, ${self.name}. Уж ${self.age} лет прошло.` : `Здарова, ${self.name}. Как твои ${self.age}?`;
		setTimeout(result.bind(null, self), 300);
	}

	function result(obj) { // show result message
		let div = document.createElement('div');
		div.innerText = obj.str;
		div.className = `result`;
		document.body.appendChild(div);
		offsetInCenter(div);
		div.style.transform = 'scale3d(1.1, 1.1, 1.1)';
		setTimeout(function() {div.style.transform = 'scale3d(1, 1, 1)';}, 100);
		document.onclick = function(e) {
			if (!e.target.closest(`.result`)) {return}
			e.target.parentNode.removeChild(e.target);
		}
	}
};