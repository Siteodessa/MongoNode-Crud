import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import cards from './cards';
import filterCards from './filterCards';
import lists from './lists';
import filterByList from './filterByList';

export default combineReducers({
  routing,
  cards,
  filterCards,
  lists,
  filterByList
})
