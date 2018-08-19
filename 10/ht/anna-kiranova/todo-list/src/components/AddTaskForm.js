import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions/task';

import { Form, Input, Select, TextArea, Button, Header } from 'semantic-ui-react'

let lastId = 1;

class AddTaskForm extends React.Component {
    onSubmit = (event) => {
        event.preventDefault();
        let task = {
            id: lastId++,
            done: false
        };
        event.target.querySelectorAll('[name]').forEach(el => {
            if (el.getAttribute('name') === 'priority') {
                task[el.getAttribute('name')] = this.priority || '';
            } else {
                task[el.getAttribute('name')] = el.value;
            }
        });
        event.target.reset();
    
        this.props.addTask(task);
    }

    priorityChange = (event, el) => {
        this.priority = el.value;
    }
    
    render() {
        return <div>
        <Header as='h2' image='/images/add.jpeg' content='Add task' className='component-h2'/>
        <Form onSubmit={this.onSubmit}>
                <Form.Field
                    id='form-input-title'
                    control={Input}
                    label='Title'
                    placeholder='Title'
                    name='title'
                    required
                />
                <Form.Group widths='equal'>
                    <Form.Field 
                        id='form-select-priority'
                        control={Select} 
                        label='Priority'
                        placeholder='Select priority'
                        name='priority'
                        options={[{value: '1', text: 'Low'}, {value: '2', text: 'Medium'}, {value: '3', text: 'High'}]} 
                        onChange={this.priorityChange}
                    />
                    <Form.Field
                        control={Input}
                        type='date' 
                        name='date'
                        label='Date'
                    />
                </Form.Group>
                <Form.Field
                        id='form-textarea-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        name="descr"
                />
                <Form.Field
                        id='form-button-add'
                        control={Button}
                        content='Add'
                        color='grey'
                />
        </Form>
        </div>

    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);