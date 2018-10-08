import React from 'react';
import { connect } from 'react-redux';
import { filterUpdate } from '../actions/filter';
import filter from '../images/filter.png';

import { Form, Input, Header } from 'semantic-ui-react'

class FilterTasksForm extends React.Component {
    
    filterUpdate = (event) => {
        let el = event.target;
        let name = el.getAttribute('name');
        let value;
        if (el.type === 'checkbox') {
            value = el.checked;
        } else {
            value = el.value;
        }
        this.props.filterUpdate(name, value)
    }
    
    render () {
        return <div className="block">
        <Header as='h2' image={filter} content='Filter' className='component-h2'/>
        <Form>
            <Form.Group widths='equal'>
                <Form.Field
                    id='form-input-check-show-compl'
                    control={Input}
                    label='Show completed'
                    type="checkbox"
                        name="showCompl"
                        checked={this.props.filter.showCompl}
                        onChange={this.filterUpdate}
                />
                <Form.Field
                    control={Input}
                    type='date' 
                    name='from'
                    label='From'
                    value={this.props.filter.from}
                    onChange={this.filterUpdate}
                />
                <Form.Field
                    control={Input}
                    type='date' 
                    name='to'
                    label='To'
                    value={this.props.filter.to}
                    onChange={this.filterUpdate}
                />
            </Form.Group>
            <Form.Field
                id='form-input-search'
                control={Input}
                label='Search'
                placeholder='Text search (title + description)'
                name='search'
                value={this.props.filter.search}
                onChange={this.filterUpdate}
            />
        </Form>
    </div>
    }
}

const mapStateToProps = (state) => ({
    filter: state.filter
});
  
const mapDispatchToProps = {
    filterUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTasksForm);