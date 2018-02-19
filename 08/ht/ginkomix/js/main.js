class Life extends RenderText(RenderCanvas(RenderSvg(Object))) {

	constructor(x,y,speed) {
		super();
		this.x = x;
		this.y = y;
		this.arrHistory = []
		this.numStep = 0;
		this.speed = speed || 5000;
		this.state = 1;
		this.square = 15;
		this.width = this.square*this.x;
		this.height = this.square*this.y;
		this.timer = null;
		this.stateChange= this.stateChange.bind(this); 
		this.backHistory = this.backHistory.bind(this);
		this.nextHistoru = this.nextHistoru.bind(this);
		this.start =  this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.changeSize =this.changeSize.bind(this);
		this.changeSpead = this.changeSpead.bind(this);
		this.changeCellCanvas = this.changeCellCanvas.bind(this);
		this.chandeCellSvg = this.chandeCellSvg.bind(this);

	}

	new() {

		Promise.resolve()
			.then(()=> {

			this.drawCanvas();
			this.drawRect();
			return this.rand();
		})
			.then((arr)=> {  
			this.pushToMainArr(arr);

			document.querySelector('#canvas').addEventListener('click',this.changeCellCanvas);
			document.querySelector('#svg').addEventListener('click',this.chandeCellSvg);
			document.querySelector('#speadInput').addEventListener('change',this.changeSpead);
			document.querySelector('#xSize').addEventListener('change',this.changeSize);
			document.querySelector('#ySize').addEventListener('change',this.changeSize);
			document.querySelector('#xSize').addEventListener('keyup',this.changeSize);
			document.querySelector('#ySize').addEventListener('keyup',this.changeSize);
			document.querySelector('#play').addEventListener('click',this.stateChange);
			this. historyRender();
			this.start();
		});
	}

	changeSpead() {
		this.speed =   document.querySelector('#speadInput').value*100;
	}

	changeCellCanvas(event) {
		if(this.state===1) {
			return;
		}
		let x = event.offsetX,
			y = event.offsetY,
			arrNow = this.arrHistory[this.numStep-1];
		for(let i =0;i<this.x;i++) {   
			for(let j =0;j<this.y;j++) {
				if(y>i*this.square && y<i*this.square+this.square && x>j*this.square && x<j*this.square+this.square) {
					console.log(arrNow[i][j]);
					if(arrNow[i][j] ===1) {
						arrNow[i][j] = 0;
					} else {
						arrNow[i][j] = 1; 
					}
					this.arrHistory.length = this.numStep;
					this.historyRender();
					return;
				}
			}
		}

	}

	chandeCellSvg(event) {
		let target = event.target;
		if(target.tagName!='rect' || this.state===1) {
			return;
		}
		let classArr = target.classList.value.split(' '),
			arrNow = this.arrHistory[this.numStep-1];
		for(let i = 1;i<=2;i++) {
			classArr[i] = classArr[i].substring(3);
		}
		if(arrNow[parseInt(classArr[1])][parseInt(classArr[2])] ===1) {
			arrNow[parseInt(classArr[1])][parseInt(classArr[2])] = 0;
		} else {
			arrNow[parseInt(classArr[1])][parseInt(classArr[2])] = 1; 
		}
		this.arrHistory.length = this.numStep;
		this.historyRender();
	}

	changeSize() {
		this.stop();
		let x = parseInt(document.querySelector('#xSize').value),
			y = parseInt(document.querySelector('#ySize').value);
		if(x<0 || x>20) {
			x=10;
			document.querySelector('#xSize').value = 10;
		}
		if(y<0 || y>20) {
			y=10;
			document.querySelector('#ySize').value = 10;
		}
		let arr = new Array(x).fill(1).map(i => new Array(y));
		var histArr = this.arrHistory[this.numStep-1] ;

		for(let i = 0;i<x;i++) {
			for(let j = 0;j<y;j++) {
				arr[i][j] = 0;
			}
		}
		if(x<this.x) {
			this.x =x;
		}
		if(y<this.y) {
			this.y=y;
		}
		for(let i = 0;i<this.x;i++) {
			for(let j = 0;j<this.y;j++) {

				arr[i][j] = histArr[i][j];
			}
		}
		this.x = x;
		this.y = y;
		this.width = this.square*this.y;
		this.height = this.square*this.x;
		this.numStep = 0;
		this.arrHistory = [];
		this.pushToMainArr(arr);
		this.drawCanvas();
		this.drawRect();



		this.historyRender();
		this.start();

	}

	backHistory() {
		if((this.numStep-1)<=0) {
			return;
		}

		this.numStep--;
		this.historyRender();

	}

	nextHistoru() {
		if((this.numStep)>=this.arrHistory.length) {
			return;
		}
		this.numStep++;
		this.historyRender();

	}

	rand() {

		return new Promise((resolve)=>{
			let arr = new Array(this.x).fill(1).map(i => new Array(this.y));
			for(var i = 0;i<this.x;i++) {
				for(var j = 0;j<this.y;j++) {
					arr[i][j] = 0;
				}
			}
			arr[1][2] = 1;
			arr[1][3] = 1;
			arr[1][4] = 1;
			//            	for(var i = 0;i<this.x;i++) {
			//            		for(var j = 0;j<this.y;j++) {
			//            		arr[i][j]	= Math.floor(Math.random() * (2) + 0);
			//            		}
			//            	}

			resolve(arr);

		})
	}

	stateChange() {

		if(this.state===0) {
			this.state=1;

			this.start();
			this.numStep = this.arrHistory.length;
			document.querySelector('.button-play').style.display = 'block';
			document.querySelector('.button-pause').style.display = 'none';
			return;

		} 
		if(this.state===1){
			this.state=0;
			this.stop();

			document.querySelector('.button-play').style.display = 'none';
			document.querySelector('.button-pause').style.display = 'block';
			return;
		}

	}

	start() {
		let self = this;
		document.querySelector('#left').removeEventListener('click',this.backHistory);            document.querySelector('#right').removeEventListener('click',this.nextHistoru);
		this.arrHistory.length = this.numStep;
		this.timer =  setTimeout(function tick() {
			self.step();
			self.timer = setTimeout(tick, self.speed);
		},  self.speed);

	}

	stop() {
		clearTimeout(this.timer);
		document.querySelector('#left').addEventListener('click',this.backHistory);
		document.querySelector('#right').addEventListener('click',this.nextHistoru);
	}

	step() {
		Promise.resolve()
			.then(()=> {

			return this.logics(this.arrHistory[this.numStep-1]);
		})
			.then((arrBuff)=> {

			this.pushToMainArr(arrBuff);
		})
			.then(()=> {

			this.renderText(this.arrHistory[this.numStep-1]);
			this.renderCanvas(this.arrHistory[this.numStep-1]);
			this.renderSvg(this.arrHistory[this.numStep-1]);

		});

	}

	historyRender() {
		this.renderText(this.arrHistory[this.numStep-1]);
		this.renderCanvas(this.arrHistory[this.numStep-1]);
		this.renderSvg(this.arrHistory[this.numStep-1]);
	}

	pushToMainArr(arrBuf) {
		return new Promise((resolve)=>{
			this.numStep++;
			let buf = new Array(this.x).fill(1).map(i => new Array(this.y));

			for(var i = 0;i<this.x;i++) {
				for(var j = 0;j<this.y;j++) {
					buf[i][j] = arrBuf[i][j];
				}

			}

			this.arrHistory.push(buf);
			resolve();
		});
	}

	logicLocal(x,y,arr) {
		var count = 0;

		for(var i = x-1;i<=x+1;i++) {
			for(var j = y-1 ; j<=y+1 ; j++) {

				if(i<0 || j<0 || i>=this.x || j>=this.y) {
					continue;
				}

				if(i ===x && j ===y) {
					continue;
				}
				if(arr[i][j]===1) {
					count++;
				}
			}

		}
		if(count===3) {
			return 1;
		}
		if(count===2) {
			if(arr[x][y]===1){
				return 1
			} else {
				return 0;
			}
		}
		if(count<2 || count>3) {
			return 0;
		}

	}

	logics(arr) {


		return new Promise((resolve)=>{

			var arrBuff = new Array(this.x).fill(1).map(i => new Array(this.y));
			for(var i = 0;i<arr.length;i++) {
				for(var j = 0;j<arr[0].length;j++) {
					arrBuff[i][j] = this.logicLocal(i,j,arr);

				}
			}

			resolve(arrBuff);


		});
	}
}

var life = new Life(10,10);
life.new();