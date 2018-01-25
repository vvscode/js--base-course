import React, { Component } from "react";
import SortButtons from "./sortButtons";

class TableHead extends Component {
  render() {
    let columns = this.props.columns;

    return (
      <tr>
        {columns.map((columnName, index) => (
          <th key={index}>
            <div className="cell-head">
              <div className="column-title">
                {columnName.charAt(0).toUpperCase() + columnName.slice(1)}
              </div>
              <SortButtons
                columnName={columnName}
                sortColumn={this.props.sortColumn}
              />
            </div>
          </th>
        ))}
      </tr>
    );
  }
}

export default TableHead;
