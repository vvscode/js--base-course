import React from 'react';
import { connect } from 'react-redux';
import { filterUpdate } from '../actions/filter'

import { Form, Input, Header } from 'semantic-ui-react'

const FilterTasksForm = ({
    filter,
    filterUpdateFunc
}) => <div className="block">
            <Header as='h2' image='/images/filter.png' content='Filter' className='component-h2'/>
            <Form>
                <Form.Group widths='equal'>
                    <Form.Field
                        id='form-input-check-show-compl'
                        control={Input}
                        label='Show completed'
                        type="checkbox"
                            name="showCompl"
                            checked={filter.showCompl}
                            onChange={filterUpdateFunc}
                    />
                    <Form.Field
                        control={Input}
                        type='date' 
                        name='from'
                        label='From'
                        value={filter.from}
                        onChange={filterUpdateFunc}
                    />
                    <Form.Field
                        control={Input}
                        type='date' 
                        name='to'
                        label='To'
                        value={filter.to}
                        onChange={filterUpdateFunc}
                    />
                </Form.Group>
                <Form.Field
                    id='form-input-search'
                    control={Input}
                    label='Search'
                    placeholder='Text search (title + description)'
                    name='search'
                    value={filter.search}
                    onChange={filterUpdateFunc}
                />
            </Form>
        </div>

const mapStateToProps = (state) => ({
    filter: state.filter
});
  
const mapDispatchToProps = (dispatch) => ({
    filterUpdateFunc: (event) => dispatch(filterUpdate(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTasksForm);