import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Segment, Header, TextArea, Divider } from 'semantic-ui-react';

import { addTask } from '../actions/tasks';

const transitions = ['Low', 'Medium', 'High']

const options = transitions.map(name => ({ key: name, text: name, value: name }))

class AddTasks extends React.Component {

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    onSubmit = (ev) => {
        ev.preventDefault();
        let data = {};
        ev.target.querySelectorAll('[name]').forEach(el => {
            (el.getAttribute('name') !== 'priority') ? (data[el.getAttribute('name')] = el.value) : (data[el.getAttribute('name')] = el.innerText);
        })
        this.props.addTask(data);
        ev.target.reset();
    }

    render() {
        return (
            <Form inverted onSubmit={this.onSubmit}>
                <Header inverted as='h3' color='grey'>
                    Add new task:
                </Header>
                <Divider inverted />                  
                <Form.Group widths='equal'>
                    <Form.Input fluid name='title' placeholder='Title' />  
                    <Form.Select
                    placeholder='Priority'
                    name='priority'
                    onChange={this.handleChange}
                    options={options}
                    />
                    <Form.Input
                    placeholder='Date'
                    name='date'
                    type='date'
                    />
                </Form.Group>
                <TextArea name='description' autoHeight placeholder='Description' widths='90%' />
                <Segment inverted clearing>
                    <Button floated='right'>Add</Button>
                </Segment>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.todoReduser.tasks
});

const mapDispatchToProps = (dispatch) => ({
    addTask: taskItem => dispatch(addTask(taskItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks);