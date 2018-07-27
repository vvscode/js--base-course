import React from 'react';
import injectSheet from 'react-jss';
import Thead from './thead';
import Tbody from './tbody';

const styled ={
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    '& td': {
      border: '1px solid'
    }
  }
};

const Table = (props) => {
  return (
    <fieldset className={props.classes.field}>
      <legend>List</legend>
      <table className={props.classes.table}>
        <Thead />
        <Tbody />
      </table>
    </fieldset>
  );
};

export default injectSheet(styled)(Table);
