const InitialListsState = {

  districts: {

    listOpen: false,
    headerTitle: 'Район',
    titleHelper: 'район',
    options: [
      {
        id: 0,
        title: 'Все районы',
        value: ['Малиновский' ,'Приморский' ,'Суворовский' ,'Киевский'],
        selected: true,
        key: 'district'
      },
      {
        id: 1,
        title: 'Малиновский район',
        value: 'Малиновский',
        selected: false,
        key: 'district'
      },
      {
        id: 2,
        title: 'Приморский район',
        value: 'Приморский',
        selected: false,
        key: 'district'
      },
      {
        id: 3,
        title: 'Суворовский район',
        value: 'Суворовский',
        selected: false,
        key: 'district'
      },
      {
        id: 4,
        title: 'Киевский район',
        value: 'Киевский',
        selected: false,
        key: 'district'
      }
    ]
  }

}



export default function lists(state = InitialListsState, action) {
 if (action.type === 'FETCH_LISTS_SUCCESS') {
    return action.payload;
  } else if (action.type === 'TOGGLE_LIST') {
    state.districts.listOpen = !state.districts.listOpen
      return {...state}
  } else if (action.type === 'TOGGLE_SELECTED_LIST') {
    state.districts.options.map( elem => {
      elem.id === action.payload.id ? elem.selected = !elem.selected :  elem.selected;
    });
    if ( action.payload.id === 0 ) {
      state.districts.options.map( elem => {
        elem.id === action.payload.id ? elem.selected = !elem.selected :  elem.selected = false;
      });
      state.districts.options[0].selected = true
    } else {
      state.districts.options.filter(item => item.selected === true).length === 0 ? state.districts.options[0].selected = true :       state.districts.options[0].selected = false
    }


      return {...state}
  }

  return state;
}
