import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react';
import {Route} from 'react-router';
import ReactCalendar from './calendar';
import Create from './create';
import About from './about';
import Test from './test';

class App extends Component {
  state = {
    menu: window.location.hash.slice(2),
    config: {
      changeMonth: true,
      addTask: true,
      removeTask: true,
      showDate: true,
      customClass: ''
    }
  };
  shouldComponentUpdate(prev, next) {
    return this.state.config.customClass === next.config.customClass;
  }
  handleItemClick = (e, obj) => {
    window.location.hash = obj.name;
    this.setState({
      menu: obj.name
    });
  };
  changeConfig = (key, value) => {
    this.setState({config: {...this.state.config, [key]: value}});
  };
  render() {
    return (
      <div>
        <Menu inverted widths={3}>
          <Menu.Item
            name='calendar'
            active={this.state.menu === 'calendar'}
            onClick={this.handleItemClick}
          >
            Calendar
          </Menu.Item>
          <Menu.Item
            name=''
            active={!this.state.menu}
            onClick={this.handleItemClick}
          >
            Create
          </Menu.Item>
          <Menu.Item
            name='about'
            active={this.state.menu === 'about'}
            onClick={this.handleItemClick}
          >
            About
          </Menu.Item>
        </Menu>
        <Route exact path='/' component={_ => <Create config={this.state.config} changeConfig={this.changeConfig}/>} />
        <Route path='/calendar' component={_ => <ReactCalendar config={this.state.config}/>} />
        <Route path='/about' component={About} />
        <Route path='/test' component={Test} />
      </div>
    );
  }
}

export default App;
