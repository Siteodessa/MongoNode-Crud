const initialState = ['Малиновский' ,'Приморский' ,'Суворовский' ,'Киевский'];


export default function filterByLists(state = initialState, action) {
  if (action.type === 'FILTER_BY_LISTS') {
    return action.payload.value;
}
return state;
}
