const initialState = '';


export default function filterByLists(state = initialState, action) {
  if (action.type === 'FILTER_BY_LISTS') {

    // console.log('lists', lists);

    console.log('action.payload.value', action.payload.value);

  return '';
  // return '';
  // return action.payload;
}
return state;
}
