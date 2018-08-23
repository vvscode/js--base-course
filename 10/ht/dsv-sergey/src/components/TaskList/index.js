import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import TaskItem from './TaskItem';

// import sortBy from '../../utils/sortBy'

class TasksList extends Component {
    state = {
        sortBy: "id"
      };
      handleSort = sortBy => {
        this.setState({ sortBy });
      };

    render() {
        // let sortedItems = sortBy(this.props.items, this.state.sortBy);

        const { tasks } = this.props.tasks;

        return (
            <Table size='small' className="TasksList" inverted>
                <Table.Header size='mini'>
                    <Table.Row>
                        <Table.HeaderCell>Done</Table.HeaderCell>
                        <Table.HeaderCell>
                            Title
                    <Icon name='sort' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Priority
                    <Icon name='sort' />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Date
                    <Icon name='sort' />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {/* {sortedItems.map(item => <TaskItem key={item.id} {...item} />)} */}
                    {
                        tasks.map((el) => ((!el.done) ? <TaskItem key={el.id} tasks={el} visible='false'/> : null ))
                    }
                </Table.Body>
            </Table>
        );
    }
};

const mapStateToProps = state => ({
    tasks: state.tasks
});


export default connect( mapStateToProps )(TasksList);