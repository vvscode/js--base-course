import React from 'react';
import PropTypes from 'prop-types';

export const ButtonSort = props => (
  <span>
    <button
      onClick={() => {
        props.sortTasks(props.colName, `asc${props.colName}`);
      }}
    >
      &#11014;
    </button>
    <button
      onClick={() => {
        props.sortTasks(props.colName, `desc${props.colName}`);
      }}
    >
      &#11015;
    </button>
  </span>
);

ButtonSort.propTypes = {
  colName: PropTypes.string.isRequired
};
