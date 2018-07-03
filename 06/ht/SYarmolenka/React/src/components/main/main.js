import React from 'react';
import {connect} from 'react-redux';
import Footer from '../footer/footer';
import Map from './map';
import Star from './star';

const Main = (props) => {
  props.saveHashHistoryPush(props.history.push);
  return (
    <div className='wrapper'>
      <Star />
      <Map hash={props.match.params}/>
      <Footer />
    </div>
  );
};

export default connect(_ => ({}), dispatch => ({
  saveHashHistoryPush (history) { dispatch({type: 'SAVE_HASH_HISTORY', payload: history}); }
}))(Main);
