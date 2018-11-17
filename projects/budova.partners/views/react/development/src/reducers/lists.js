const InitialListsState = {

  listOpen: false,
  headerTitle: 'Район',
  titleHelper: 'район',
  list: [
    {
      id: 0,
      title: 'Все районы',
      value: '',
      selected: true,
      key: 'block'
    },
    {
      id: 1,
      title: 'Малиновский район',
      value: 'Малиновский',
      selected: false,
      key: 'block'
    },
    {
      id: 2,
      title: 'Приморский район',
      value: 'Приморский',
      selected: false,
      key: 'block'
    },
    {
      id: 3,
      title: 'Суворовский район',
      value: 'Суворовский',
      selected: false,
      key: 'block'
    },
    {
      id: 4,
      title: 'Киевский район',
      value: 'Киевский',
      selected: false,
      key: 'block'
    }
  ]
}



export default function lists(state = InitialListsState, action) {
 if (action.type === 'FETCH_LISTS_SUCCESS') {
    return action.payload;

  } else if (action.type === 'FILTER_BY_LISTS') {
      return [...state]
  } else if (action.type === 'TOGGLE_LIST') {
    state.listOpen = !state.listOpen
      return {...state}
  } else if (action.type === 'TOGGLE_SELECTED_LIST') {
    state.list.map( elem => {
      elem.id === action.payload.id ? elem.selected = !elem.selected :  action.payload.id === 0 ? elem.selected = false : elem.selected;
    });
    console.log(state);
      return {...state}
  }

  return state;
}
