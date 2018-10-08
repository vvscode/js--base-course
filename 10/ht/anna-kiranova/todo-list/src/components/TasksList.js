import React from 'react';
import { TaskItem } from './TaskItem';
import { connect } from 'react-redux';
import { toggleDone } from '../actions/task';
import { sortTasks } from '../actions/sort';
import az_sort from '../images/az-sort.png';
import za_sort from '../images/za-sort.png';
import no_sort from '../images/no-sort.png';
import { Table } from 'semantic-ui-react';

const imgs = {
    no: no_sort,
    az: az_sort,
    za: za_sort
}

const TasksList = ({
    tasks,
    sort_field,
    sort_dir,
    toggleDoneFunc,
    sortTasksFunc
}) => <Table striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell >
                    Done
                    <img alt='' className='sort-img' sortdirection={sort_field === 'done' ? sort_dir : 'no'} sortfield='done' src={sort_field === 'done' ? imgs[sort_dir] : imgs['no']} onClick={sortTasksFunc} />
                {/* warning: img elements must have an alt prop, either with meaningful text, or an empty string for decorative images  jsx-a11y/alt-text */}
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Title
                    <img alt='' className='sort-img' sortdirection={sort_field === 'title' ? sort_dir : 'no'} sortfield='title' src={sort_field === 'title' ? imgs[sort_dir] : imgs['no']} onClick={sortTasksFunc} />
                </Table.HeaderCell>
                <Table.HeaderCell>
                    Priority
                    <img alt='' className='sort-img' sortdirection={sort_field === 'priority' ? sort_dir : 'no'} sortfield='priority' src={sort_field === 'priority' ? imgs[sort_dir] : imgs['no']} onClick={sortTasksFunc} />
                    </Table.HeaderCell>
                <Table.HeaderCell>
                    Date
                    <img alt='' className='sort-img' sortdirection={sort_field === 'date' ? sort_dir : 'no'} sortfield='date' src={sort_field === 'date' ? imgs[sort_dir] : imgs['no']} onClick={sortTasksFunc} />
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
    let tasks = applyFilter(state)
    tasks = sortTasksFromState(tasks, state)

    return {
        tasks,
        sort_field: state.sort.field,
        sort_dir: state.sort.direction,
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