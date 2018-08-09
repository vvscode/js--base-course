import React, { Component } from 'react';
import Form from './components/Form';
import TaskList from './components/TasksList/TaskList';
import FilterTasks from './components/FilterTasks';
import { addTask } from './utils/api';
import { getTasks } from './utils/api';

export default class App extends Component {
  state = {
    tasks: [],
    showDoneTasks: false,
    dirSort: '',
    dateFrom: '',
    dateTo: '',
    search: false
  };

  componentDidMount = () => {
    getTasks().then(list =>
      this.setState({
        tasks: list
      })
    );
  };

  addTaskByTable = task => {
    addTask({ task }).then(newTask => {
      this.setState({
        tasks: [...this.state.tasks, newTask]
      });
    });
  };

  toggleDone = key =>
    this.setState({
      tasks: this.state.tasks.map(el => ({
        ...el,
        done: el.id === key ? !el.done : el.done
      }))
    });

  toggleShowDone = () =>
    this.setState(state => ({
      showDoneTasks: !state.showDoneTasks
    }));

  changeDate = e => {
    let name = e.target.getAttribute('name');
    this.setState({
      [name]: e.target.value
    });
  };

  filterTasks = () => {
    let tasks = this.state.tasks;
    if (this.state.dateFrom.length > 1 || this.state.dateTo.length > 1) {
      this.sortDate(tasks);
      tasks = tasks.filter(el => el.taskByDate);
    }

    if (!this.state.showDoneTasks) {
      tasks = tasks.filter(el => !el.done);
    }

    if (this.state.search) {
      this.searchTask(tasks);
      tasks = tasks.filter(el => el.search);
    }

    return tasks;
  };

  sortDate = list => {
    let dateFrom = this.state.dateFrom;
    let dateTo = this.state.dateTo;
    list.filter(el => {
      return (el.taskByDate =
        dateTo.length > 1
          ? dateTo >= el.task.date && el.task.date >= dateFrom
          : el.task.date >= dateFrom);
    });
  };

  sortTasks = (sortBy, dir) => {
    let list = this.state.tasks;
    if (this.state.dirSort !== dir) {
      let value = this.sortByName(sortBy);
      list = value[0];
      let changeList = value[1];

      if (changeList) {
        list = dir.search(/asc/) === 0 ? list.reverse() : list;
        this.showSortTasks(list, dir);
      }
    }
    return [list, dir];
  };

  sortByName = sortBy => {
    let name = sortBy.toLowerCase();
    var list = this.state.tasks;
    var changeList = false;

    list.sort((a, b) => {
      if (name === 'done') {
        let num =
          String(a[name]) < String(b[name])
            ? 1
            : String(a[name]) > String(b[name]) ? -1 : 0;
        changeList = num !== 0 ? true : changeList;
        console.log(num);
        return num;
      } else if (name === 'priority') {
        if (a.task[name] === b.task[name]) {
          return 0;
        } else {
          changeList = true;
          return (a.task[name] === 'high' && b.task[name] === 'medium') ||
            (a.task[name] === 'medium' && b.task[name] === 'low')
            ? -1
            : 1;
        }
      } else {
        let num =
          a.task[name] < b.task[name]
            ? 1
            : a.task[name] > b.task[name] ? -1 : 0;
        changeList = num !== 0 ? true : changeList;
        return num;
      }
    });
    //console.log(changeList);
    return [list, changeList];
  };

  showSortTasks = (list, dir) =>
    this.setState({
      tasks: list,
      dirSort: dir
    });

  searchTask = task => {
    let searchText = document.querySelector('input[type="search"]').value;

    if (searchText.length > 0) {
      task.filter(
        el =>
          (el.search =
            el.task.title === searchText || el.task.description === searchText)
      );
    }
  };

  search = () =>
    this.setState({
      search: true
    });

  render() {
    return (
      <div className="app-wrap">
        <Form addTaskByTable={this.addTaskByTable} />
        <FilterTasks
          toggleShowDone={this.toggleShowDone}
          tasks={this.filterTasks()}
          sortTasks={this.sortByName}
          selectDate={this.changeDate}
          search={this.search}
        />
        <TaskList
          tasks={this.filterTasks()}
          toggleDone={this.toggleDone}
          sortTasks={this.sortTasks}
        />
      </div>
    );
  }
}
