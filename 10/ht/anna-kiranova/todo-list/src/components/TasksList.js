import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import { toggleDone } from '../actions/task';

import { Table } from 'semantic-ui-react'

const TasksList = ({
    tasks,
    toggleDoneFunc
}) => <Table striped>
        <Table.Header>
            <Table.Row>
                 <Table.HeaderCell>Done</Table.HeaderCell>
                 <Table.HeaderCell>Title</Table.HeaderCell>
                 <Table.HeaderCell>Priority</Table.HeaderCell>
                 <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {tasks.map((task) => <TaskItem key={task.id} task={task} toggleDone={toggleDoneFunc}/>)}
        </Table.Body>
    </Table>


const mapStateToProps = (state) => {
    let f = state.filter;
    let tasks = state.tasks.filter((task) => {
        if (!f.showCompl && task.done) {
            return false; // hide task
        }
        if (f.search !== '') {
            if (task.title.indexOf(f.search) === -1 && task.descr.indexOf(f.search) === -1) {
                return false;
            }
        }
        if (f.from !== '' && task.date !== '') {
            if (f.from >= task.date) {
                return false;
            }
        }
        if (f.to !== '' && task.date !== '') {
            if (f.to <= task.date) {
                return false;
            }
        }

        return true;
    });

    return {
        tasks
    }
};
  
const mapDispatchToProps = (dispatch) => ({
    toggleDoneFunc: id => dispatch(toggleDone(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);