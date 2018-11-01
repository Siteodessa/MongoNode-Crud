import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';


import cards from './cards';
import playlists from './playlists';
import filterCards from './filterCards';

export default combineReducers({
  routing,
  cards,
  playlists,
  filterCards
})
