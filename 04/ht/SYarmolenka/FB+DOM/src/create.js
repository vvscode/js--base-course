import React, {Component} from 'react';
import {Calendar} from './nativeCode';
import {Form, Label, Input} from 'semantic-ui-react';

class Create extends Component {
  state = {customClass: this.props.config.customClass};
  componentDidMount() {
    const conf = {...this.props.config, el: document.querySelector('#cal')};
    new Calendar(conf);
    document.querySelector('#cal').addEventListener('click', e => e.stopPropagation(), true);
    document.querySelector('#cal').addEventListener('dblclick', e => e.stopPropagation(), true);
  };
  render () {
    const month = (_ => new Array(12).fill(1).map((el, i) => ({key: el + i, value: el + i, text: new Date(2018, el + i - 1).toLocaleString(`en`, {month: 'long'}).toUpperCase()})))();
    const year = (_ => new Array(100).fill(1970).map((el, i) => ({key: el + i, value: el + i, text: el + i})))();
    return (
      <div className='calWrap'>
        <Form className='formMenu blackBorder'>
          <Label className='confLabel' ribbon>Configure</Label>
          <Form.Checkbox
            toggle
            label='Allow change month'
            defaultChecked={this.props.config.changeMonth}
            onChange={(e, data) => this.props.changeConfig('changeMonth', data.checked)}
          />
          <Form.Checkbox
            toggle
            label='Allow add tasks'
            defaultChecked={this.props.config.addTask}
            onChange={(e, data) => this.props.changeConfig('addTask', data.checked)}
          />
          <Form.Checkbox
            toggle
            label='Allow remove tasks'
            defaultChecked={this.props.config.removeTask}
            onChange={(e, data) => this.props.changeConfig('removeTask', data.checked)}
          />
          <Form.Checkbox
            toggle
            label='Show month/year'
            defaultChecked={this.props.config.showDate}
            onChange={(e, data) => this.props.changeConfig('showDate', data.checked)}
          />
          <Form.Checkbox
            toggle
            label='Work with BOM/DOM'
            defaultChecked={this.props.config.message === 'DOM'}
            onChange={(e, data) => this.props.changeConfig('message', (_ => data.checked ? 'DOM' : 'BOM')())}
          />
          <Form.Checkbox
            toggle
            label='Storage Local/Server'
            defaultChecked={this.props.config.storage === 'server'}
            onChange={(e, data) => this.props.changeConfig('storage', (_ => data.checked ? 'server' : 'local')())}
          />
          <Form.Group>
            <Form.Select options={month} defaultValue={this.props.config.month} placeholder='Month' onChange={(e,data) => this.props.changeConfig('month', data.value)} />
            <Form.Select options={year} defaultValue={this.props.config.year} placeholder='Year' onChange={(e,data) => this.props.changeConfig('year', data.value)} />
          </Form.Group>
          <Input placeholder='CSS Class' value={this.state.customClass} onChange={e => {this.setState({customClass: e.target.value}); this.props.changeConfig('customClass', e.target.value);}} />
        </Form>
        <textarea className='code blackBorder' value={`<script src="https://syarmolenka.github.io/calendar/nativeCode.js"></script>
<script>
  (function() {
    const id = 'calendar' + Math.round(Math.random()*1000000);
    const div = document.createElement('div');
    div.id = id;
    document.body.appendChild(div);
    const link = document.createElement('link');
    link.setAttribute('rel', "stylesheet");
    link.setAttribute('href', "https://syarmolenka.github.io/calendar/calendar.css");
    document.head.appendChild(link);
    new Calendar({
      el: document.querySelector('#'+id),
      showDate: ${this.props.config.showDate},
      changeMonth: ${this.props.config.changeMonth},
      addTask: ${this.props.config.addTask},
      removeTask: ${this.props.config.removeTask},
      message: '${this.props.config.message}',
      storage: '${this.props.config.storage}',
      customClass: '${this.state.customClass}',
      month: ${this.props.config.month},
      year: ${this.props.config.year}
    })
  }) ();
</script>`} onChange={_ => 0}></textarea>
        <div id='cal' className='smallCal blackBorder'></div>
      </div>
    );
  };
};

export default Create;
