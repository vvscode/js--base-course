import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Input, Popup } from 'semantic-ui-react';

import { toggleDone } from '../../actions/TasksActions';

class TaskItem extends Component {

    render() {

    const { tasks } = this.props;
    const { toggleDone } = this.props;

        return (
            <Table.Row size='mini'>
                <Table.Cell>
                    <Input type="checkbox" checked={tasks.done} onChange={() => toggleDone(tasks)} />
                </Table.Cell>
                <Table.Cell>
                    <Popup
                        trigger={<p>{tasks.title}</p> }
                        content={tasks.description}
                        position='top left'
                    />
                </Table.Cell>
                <Table.Cell>
                    {tasks.priority}
                </Table.Cell>
                <Table.Cell>
                    {tasks.date}
                </Table.Cell>
            </Table.Row>

        );
    }
};

const mapDispatchToProps = (dispatch) => ({
    toggleDone: done => dispatch(toggleDone(done))
});

export default connect(undefined, mapDispatchToProps)(TaskItem);