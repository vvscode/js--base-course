import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions/task';
import add from '../images/add.jpeg';

import { Form, Input, Select, TextArea, Button, Header } from 'semantic-ui-react';

let emptyState = () => ({
    title: '',
    priority: '1',
    date: new Date().toISOString().substring(0, 10),
    descr: '',
})

class AddTaskForm extends React.Component {
    state = emptyState()

    onSubmit = (event) => {
        event.preventDefault();
        let task = {
            id: +(new Date()),
            done: false,
            ...this.state
        };
        this.setState(emptyState())
    
        this.props.addTask(task);
    }

    fieldChange = (event, el) => {
        this.setState({
            ...this.state, [el.name]: el.value
        })
    }
    
    render() {
        return <div>
        <Header as='h2' image={add} content='Add task' className='component-h2'/>
        <Form onSubmit={this.onSubmit}>
                <Form.Field
                    id='form-input-title'
                    control={Input}
                    label='Title'
                    placeholder='Title'
                    name='title'
                    required
                    value={this.state.title}
                    onChange={this.fieldChange}
                />
                <Form.Group widths='equal'>
                    <Form.Field 
                        id='form-select-priority'
                        control={Select} 
                        label='Priority'
                        placeholder='Select priority'
                        name='priority'
                        options={[{value: '1', text: 'Low'}, {value: '2', text: 'Medium'}, {value: '3', text: 'High'}]} 
                        onChange={this.fieldChange}
                        value={this.state.priority}
                    />
                    <Form.Field
                        control={Input}
                        type='date' 
                        name='date'
                        label='Date'
                        value={this.state.date}
                        onChange={this.fieldChange}
                    />
                </Form.Group>
                <Form.Field
                        id='form-textarea-description'
                        control={TextArea}
                        label='Description'
                        placeholder='Description'
                        name="descr"
                        value={this.state.descr}
                        onChange={this.fieldChange}
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