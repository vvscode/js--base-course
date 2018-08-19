import React from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import { toggleDone } from '../actions/task';
import { sortTasks } from '../actions/sort';

import { Table } from 'semantic-ui-react'

const TasksList = ({
    tasks,
    sorts,
    toggleDoneFunc,
    sortTasksFunc
}) => <Table striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell >
                    Done
                    <img alt='' className='sort-img' sortdirection={sorts.done} sortfield='done' src={'/images/' + sorts.done + '-sort.png'} onClick={sortTasksFunc} />
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Title
                    <img alt='' className='sort-img' sortdirection={sorts.title} sortfield='title' src={'/images/' + sorts.title + '-sort.png'} onClick={sortTasksFunc} />
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Priority
                    <img alt='' className='sort-img' sortdirection={sorts.priority} sortfield='priority' src={'/images/' + sorts.priority + '-sort.png'} onClick={sortTasksFunc} />
                    </Table.HeaderCell>
                <Table.HeaderCell>
                    Date
                    <img alt='' className='sort-img' sortdirection={sorts.date} sortfield='date' src={'/images/' + sorts.date + '-sort.png'} onClick={sortTasksFunc} />
                    </Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {tasks.map((task) => <TaskItem key={task.id} task={task} toggleDone={toggleDoneFunc}/>)}
        </Table.Body>
    </Table>

function applyFilter(state) {
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
    return tasks;
}

function sortTasksFromState(tasks, state) {
    return tasks.sort((a, b) => {
        if (state.sort.direction === 'az') {
            return a[state.sort.field] > b[state.sort.field];
        } else if (state.sort.direction === 'za') {
            return a[state.sort.field] < b[state.sort.field];
        } else {
            return 0;
        }
    })
}

const mapStateToProps = (state) => {
    let sorts = {
        done: 'no',
        title: 'no',
        priority: 'no',
        date: 'no',
    };

    sorts[state.sort.field] = state.sort.direction;

    let tasks = applyFilter(state)
    tasks = sortTasksFromState(tasks, state)

    return {
        tasks,
        sorts,
    }
};

function eventToSortArgs(event) {
    let field = event.target.getAttribute('sortfield');
    let direction = event.target.getAttribute('sortdirection');
    if (direction === 'no') {
        direction = 'az';
    } else if (direction === 'az') {
        direction = 'za';
    } else if (direction === 'za') {
        direction = 'no';
    }
    return [field, direction];
}


const mapDispatchToProps = (dispatch) => ({
    toggleDoneFunc: id => dispatch(toggleDone(id)),
    sortTasksFunc: (event) => dispatch(sortTasks(...eventToSortArgs(event)))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);