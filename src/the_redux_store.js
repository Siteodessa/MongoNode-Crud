import {createStore} from 'redux';



let cards_store = (state = [], action) => {
  if (action.type === 'new_card') {

    return [...state, action.payload];
  }
  return state
}
const store = createStore(cards_store);
store.subscribe(() => { console.log(store.getState()[0]); })


export default store
