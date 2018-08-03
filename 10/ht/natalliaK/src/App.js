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

  addTaskByTable = tasks => {
    addTask({ tasks }).then(task => {
      this.setState({
        tasks: [...this.state.tasks, task]
      });
    });
  };

  toggleDone = key => {
    this.setState({
      tasks: this.state.tasks.map(el => {
        return {
          ...el,
          done: el.id === key ? !el.done : el.done
        };
      })
    });
  };

  toggleShowDone = () => {
    this.setState(state => ({
      showDoneTasks: !state.showDoneTasks
    }));
  };

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
          ? dateTo >= el.tasks.date && el.tasks.date >= dateFrom
          : el.tasks.date >= dateFrom);
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
        return num;
      } else if (name === 'priority') {
        if (a.tasks[name] === b.tasks[name]) {
          return 0;
        } else {
          changeList = true;
          return (a.tasks[name] === 'high' && b.tasks[name] === 'medium') ||
            (a.tasks[name] === 'medium' && b.tasks[name] === 'low')
            ? -1
            : 1;
        }
      } else {
        let num =
          a.tasks[name] < b.tasks[name]
            ? 1
            : a.tasks[name] > b.tasks[name] ? -1 : 0;
        changeList = num !== 0 ? true : changeList;
        return num;
      }
    });
    return [list, changeList];
  };

  showSortTasks = (list, dir) => {
    this.setState({
      tasks: list,
      dirSort: dir
    });
  };

  searchTask = task => {
    let searchText = document.querySelector('input[type="search"]').value;

    if (searchText.length > 0) {
      task.filter(el => {
        return (el.search =
          el.tasks.title === searchText || el.tasks.description === searchText);
      });
    }
  };

  search = () => {
    this.setState({
      search: true
    });
  };

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
