import React, {Component} from 'react';
import {render} from 'react-dom';
import App from './app';
import {HashRouter} from 'react-router-dom';
import {handleArray} from './logic';
import {getHistory, setHistory} from './storage';
import happyImage from './components/main/canvas/happy.png';
import sadImage from './components/main/canvas/sad.png';

const happy = new Image();
happy.src = happyImage;
const sad = new Image();
sad.src = sadImage;

const AppContext = React.createContext();

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.history = [];
    this.maxSpeed = 1000;
    getHistory().then(history => {
      this.history.push(history);
      this.setState({arr: history, field: [history.length, history[0].length]});
    }).catch(_ => {
      const arr = new Array(10).fill(0).map(z => new Array(10).fill(0));
      this.history = [arr];
      this.setState({arr: arr, field: [arr.length, arr[0].length]});
    }).then(_ => this.defineSizeOfCell());
  };
  state = {
    field: [10, 10],
    start: false,
    speed: 500,
  };
  componentDidUpdate () {
    this.defineSizeOfCell();
    this.history.push(this.state.arr);
    setHistory(this.state.arr);
  };
  cycleOfGame () {
    const nextStep = handleArray(this.state.arr);
    if (nextStep === this.state.arr) {
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({start: false});
      return;
    };
    this.setState({arr: nextStep})
  };
  defineSizeOfCell () {
    const sizeX = Math.floor(window.screen.width / this.state.arr[0].length);
    const sizeY = Math.floor(window.screen.height / this.state.arr.length * .75);
    const minSize = sizeX < sizeY ? sizeX : sizeY;
    const cell = minSize > 10 ? minSize : 10;
    this.setState(state => {
      if (cell !== state.cell) return {cell: cell};
    });
  };
  render () {
    return (
      <AppContext.Provider value={{
        arr: this.state.arr,
        field: this.state.field,
        start: this.state.start,
        speed: this.state.speed,
        cell: this.state.cell,
        changeArrItem: (x, y) => {
          this.setState(state => {
            const newArray = state.arr.slice().map(el => el.slice());
            newArray[y][x] = newArray[y][x] ? 0 : 1;
            return {arr: newArray};
          });
        },
        changeField: (arr) => {
          this.setState({field: arr});
          this.setState(state => {
            let newArray = state.arr.slice().map(el => el.slice());
            if (state.arr.length > state.field[0]) {
              newArray.splice(state.field[0], state.arr.length);
            };
            if (state.arr.length < state.field[0]) {
              const addArray = new Array(state.field[0] - state.arr.length).fill(0).map(elem => new Array(state.arr[0].length).fill(0));
              newArray = [...newArray, ...addArray];
            };
            if (state.arr[0].length > state.field[1]) {
              newArray = newArray.map(elem => {
                elem.splice(state.field[1], state.arr[0].length);
                return elem;
              });
            };
            if (state.arr[0].length < state.field[1]) {
              newArray = newArray.map(elem => {
                const addArray = new Array(state.field[1] - state.arr[0].length).fill(0);
                return [...elem, ...addArray];
              });
            };
            return {arr: newArray};
          });
        },
        startGame: () => {
          if (!this.timer) {
            const timeout = _ => {
              if (this.timer) clearInterval(this.timer);
              this.cycleOfGame();
              if (this.state.start) this.timer = setTimeout(timeout, this.maxSpeed - this.state.speed);
            };
            this.timer = setTimeout(timeout, this.maxSpeed - this.state.speed);
          } else {
              clearInterval(this.timer);
              this.timer = 0;
          };
          this.setState(state => ({start: !state.start}));
        },
        prevItem: () => {
          if (this.history.length > 2 && !this.state.start) {
            const index = (JSON.stringify(this.state.arr) === JSON.stringify(this.history[this.history.length - 2])) ? 3 : 2;
            const lastItem = this.history[this.history.length - index];
            this.setState({arr: lastItem});
            this.history.splice(index * -1, index);
          }
        },
        nextItem: () => {
          if (!this.state.start) this.cycleOfGame();
        },
        changeSpeed: (value) => {
          this.setState({speed: value});
        }
      }}>
        <App />
      </AppContext.Provider>
    );
  };
};

render(
  <HashRouter hashType='noslash'>
    <AppProvider />
  </HashRouter>,
document.querySelector('#root'));

export {AppContext, happy, sad};
