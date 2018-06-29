import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLocationByCity, getCityByLocation} from '../../helpers/request';
import './header.css';

class Header extends Component {
  constructor (props) {
    super(props);
    this.defineHash();
  };
  defineHash () {
    const hash = window.location.hash.match(/#\/(\w+)/);
    if (hash) this.props.setMainPage(hash[1]);
    window.addEventListener('hashchange', e => {
      const hash = e.newURL.match(/#\/(\w+)/);
      if (hash) this.props.setMainPage(hash[1]);
    });
  };
  handlerSearch = e => {
    if (!this.props.search || (e.type === 'keydown' && e.key !== 'Enter')) return;
    e.preventDefault();
    getLocationByCity(this.props.method, this.props.search).then(coords => {
      if (coords) {
        this.props.savePosition(coords);
        getCityByLocation(this.props.method, coords).then(city => city ? this.props.addCityInHistory(city) : 0);
      };
    });
    this.props.enterSearch('');
  };
  render () {
    let radio = null;
    let search = null;
    if (this.props.page === 'params') {
      radio = <form className='request'>
        <input name='request'
          id='xhr'
          type='radio'
          checked={this.props.method === 'xhr'}
          onChange={this.props.changeMethod}
        />
        <label className={this.props.method === 'xhr' ? 'checked' : ''} htmlFor='xhr'>XHR</label>
        <input name='request'
          id='fetch'
          type='radio'
          checked={this.props.method === 'fetch'}
          onChange={this.props.changeMethod}
        />
        <label className={this.props.method === 'fetch' ? 'checked' : ''} htmlFor='fetch'>fetch</label>
      </form>;
      search = <form>
        <input className='field'
          type='text'
          placeholder='City...'
          onKeyDown={this.handlerSearch}
          onChange={e => this.props.enterSearch(e.target.value)}
          value={this.props.search}
          />
        <input className='submit' type='submit' value='Search' onClick={this.handlerSearch}/>
      </form>;
    };
    return (
      <div id='header'>
        <div className='radio'>{radio}</div>
        <div className='menu'>
          <a href='#/about' className={this.props.page === 'about' ? 'checked' : ''}>About</a>
          <a href='#/' className={this.props.page === 'params' ? 'checked' : ''}>Main</a>
          <a href='#/author' className={this.props.page === 'author' ? 'checked' : ''}>Author</a>
        </div>
        <div className='search'>{search}</div>
      </div>
    );
  };
};

export default connect(
  state => ({
    method: state.get('method'),
    search: state.get('search'),
    page: state.get('mainPage')
  }),
  dispatch => ({
    changeMethod () { dispatch({type: 'CHANGE_METHOD'}); },
    enterSearch (text) { dispatch({type: 'ENTER_SEARCH', payload: text}); },
    savePosition (pos) { dispatch({type: 'SAVE_POSITION', payload: pos}); },
    addCityInHistory (city) { dispatch({type: 'ADD_TO_HISTORY', payload: city}); },
    setMainPage (page) { dispatch({type: 'SET_MAIN_PAGE', payload: page}); }
  })
)(Header);
