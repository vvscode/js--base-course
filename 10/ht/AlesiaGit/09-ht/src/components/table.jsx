import React, { Component } from "react";
import TableItem from "./tableItem";
import TableHead from "./tableHead";

class Table extends Component {
  render() {
    let items = this.props.items;
    let toggleChecked = this.props.toggleChecked;
    let sortColumn = this.props.sortColumn;

    return (
      <table className="table">
        <thead>
          <TableHead sortColumn={sortColumn} columns={this.props.columns} />
        </thead>
        <tbody>
          {items.map(item => (
            <TableItem key={item.id} {...item} toggleChecked={toggleChecked} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
