import React, { Component } from "react";

import Form from "./form";
import Filter from "./filter";
import Table from "./table";

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: JSON.parse(localStorage.getItem("notes")) || [],
      columns: ["id", "done", "title", "importance", "date"]
    };
  }

  toggleChecked = id => {
    this.setState(
      {
        items: this.state.items.map(
          item =>
            item.id !== id
              ? item
              : {
                  ...item,
                  done: !item.done
                }
        )
      },
      () => {
        if (this.state.filter) {
          return this.filterResults(this.state.filter);
        }
      }
    );
  };

  sortColumn = (order, columnName) => {
    let range = columnName.columnName;

    let array = this.state.items.sort(function(a, b) {
      if (typeof a[range] === "string") {
        var x = a[range].toLowerCase();
        var y = b[range].toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      } else {
        return a[range] - b[range];
      }
    });

    if (order === "AtoZ") {
      this.setState({
        items: array
      });
    }

    if (order === "ZtoA") {
      this.setState({
        items: array.reverse()
      });
    }
  };

  addNewTask = newItem => {
    let array = this.state.items;
    array.push(newItem);
    this.setState({
      items: array
    });

    localStorage.setItem("notes", JSON.stringify(array));
  };

  filterResults = input => {
    this.setState({
      filter: input
    });

    let endDate = new Date(input.endDate).getTime();
    let startDate = new Date(input.startDate).getTime();
    let hide = input.hideCompleted;

    this.setState({
      items: this.state.items.map(item => {
        let itemDate = new Date(item.date).getTime();
        let textIndex = item.description.toLowerCase().indexOf(input.searchText.toLowerCase());
        let otherIndex = item.title.toLowerCase().indexOf(input.searchText.toLowerCase());
        if (itemDate > endDate || itemDate < startDate) {
          return { ...item, display: "none" };
        } else if (hide === true && item.done === true) {
          return { ...item, display: "none" };
        } else if (textIndex === -1 && otherIndex === -1) {
          return { ...item, display: "none" };
        } else {
          return { ...item, display: "table-row" };
        }
      })
    });
  };

  render() {
    return (
      <div>
        <Form addNewTask={this.addNewTask} />
        <Filter filterResults={this.filterResults} />
        <Table
          items={this.state.items}
          columns={this.state.columns}
          toggleChecked={this.toggleChecked}
          sortColumn={this.sortColumn}
        />
      </div>
    );
  }
}

export default App;