import React from 'react';
import { Form, Input, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { showChecked, toggleShowDone } from '../actions/tasks'

class Filter extends React.Component { 
    render () {
    return (
    <Form inverted label='Filter'>
        <Header inverted as='h3' color='grey'>
            Filter:
        </Header>
        <Divider inverted />
        <Form.Group widths='equal'>
            <Form.Checkbox checked={this.props.showChecked} onClick={this.props.toggleShowDone} label='Show completed'/>
            <Form.Input
            placeholder='Date From'
            name='date'
            type='date'
            />
            <Form.Input
            placeholder='Date To'
            name='date'
            type='date'
            />
        </Form.Group>
        <Input fluid size='small' icon='search' placeholder='Text search (title + description)' />
    </Form>
    )
}}

const mapStateToProps = state => ({
    tasks: state.todoReduser.tasks
});

const mapDispatchToProps = (dispatch) => ({
    showChecked: taskItem => dispatch(showChecked(taskItem)),
    toggleShowDone: done => dispatch(toggleShowDone(done))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);