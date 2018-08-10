import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import PopupExampleHtml from './TaskItem';

class TasksList extends Component {
    render() {
        return (
            <Table className="TasksList" inverted>
                <Table.Header>
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
                    <PopupExampleHtml />
                </Table.Body>
            </Table>
        );
    }
};

const mapStateToProps = state => ({
    tasks: state.todoReduser.tasks
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);