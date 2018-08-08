import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions/task';

import { Form, Input, Select, TextArea, Button, Header } from 'semantic-ui-react'

const AddTaskForm = ({
    addTaskFunc
}) => <div>
        <Header as='h2' image='/images/add.jpeg' content='Add task' className='component-h2'/>
        <Form onSubmit={addTaskFunc}>
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
                        value='M'
                        options={[{value: 'L', text: 'Low'}, {value: 'M', text: 'Medium'}, {value: 'H', text: 'High'}]} 
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


const mapStateToProps = () => ({
});
  
const mapDispatchToProps = (dispatch) => ({
    addTaskFunc: (event) => dispatch(addTask(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);