import {createStore} from 'redux';

const initialState = [{"task":"Задание","task_desc":"Типовое","task_status":"Срочное","_id":"5bc5e8face8d9443eec8cdf3"}]

let cards_store = (state = initialState, action) => {
  if (action.type === 'new_card') {
    return [...state, action.payload];
  }
  return state
}
const store = createStore(cards_store);
store.subscribe(() => {
  // console.log(store.getState()[0]);
 })


export default store
