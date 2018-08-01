import React, {Component} from 'react';
import injectSheet from 'react-jss';

const styles = {
  '@keyframes eee': {
    from: {
      width: '200px',
      animationTimingFunction: 'cubic-bezier(1,1.68,.49,.62)'
    },
    to: {
      width: '100%',
    }
  },
  blabla: {
    textAlign: 'center',
    margin: 'auto',
    border: '5px solid red',
    backgroundColor: props => {console.log(props)},
  },
  click: {
    animation: 'eee 1s'
  }
};

class Main extends Component {
  render () {
    return <div className={this.props.classes.blabla} onClick={e => {
      const elem = e.target;
      elem.classList.add(this.props.classes.click);
      setTimeout(_ => {elem.classList.remove(this.props.classes.click)}, 1000);
    }}>12345Classes</div>
  }
}

export default injectSheet(styles)(Main);
