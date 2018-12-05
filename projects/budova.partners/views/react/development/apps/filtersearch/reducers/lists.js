const InitialListsState = {

filterTypes : {
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
        key: 'districts'
      },
      {
        id: 1,
        title: 'Малиновский район',
        value: 'Малиновский',
        selected: false,
        key: 'districts'
      },
      {
        id: 2,
        title: 'Приморский район',
        value: 'Приморский',
        selected: false,
        key: 'districts'
      },
      {
        id: 3,
        title: 'Суворовский район',
        value: 'Суворовский',
        selected: false,
        key: 'districts'
      },
      {
        id: 4,
        title: 'Киевский район',
        value: 'Киевский',
        selected: false,
        key: 'districts'
      }
    ]
  },
  prices: {
    listOpen: false,
    headerTitle: 'Цены',
    titleHelper: 'цены',
    options: [
      {
        id: 0,
        title: 'Любая',
        value: ['0' ,'1000000'],
        selected: true,
        key: 'prices'
      },
      {
        id: 1,
        title: 'до 30 000 $',
        value: ['0' ,'30000'],
        selected: false,
        key: 'prices'
      },
      {
        id: 2,
        title: 'до 40 000 $',
        value: ['0' ,'40000'],
        selected: false,
        key: 'prices'
      },
      {
        id: 3,
        title: 'до 60 000 $',
        value: ['0' ,'60000'],
        selected: false,
        key: 'prices'
      },
      {
        id: 4,
        title: 'до 100 000 $',
        value: ['0' ,'100000'],
        selected: false,
        key: 'prices'
      }
    ]
  },
  spaces: {
    listOpen: false,
    headerTitle: 'Площадь квартир',
    titleHelper: 'площадь квартир',
    options: [
      {
        id: 0,
        title: 'Любая',
        value: ['0' ,'1000000'],
        selected: true,
        key: 'spaces'
      },
      {
        id: 1,
        title: 'от 30 до 40',
        value: ['30' ,'40'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 2,
        title: 'от 40 до 50',
        value: ['40' ,'50'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 3,
        title: 'от 50 до 60',
        value: ['50' ,'60'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 4,
        title: 'от 60 до 70',
        value: ['60' ,'70'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 5,
        title: 'от 70 до 80',
        value: ['70', '80'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 6,
        title: 'от 80 до 90',
        value: ['80', '90'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 7,
        title: 'от 90 до 100',
        value: ['90' ,'100'],
        selected: false,
        key: 'spaces'
      },
      {
        id: 8,
        title: 'больше 100',
        value: ['100' ,'1000000'],
        selected: false,
        key: 'spaces'
      }
    ]
  },
  rooms: {
    listOpen: false,
    headerTitle: 'Количество комнат',
    titleHelper: 'количество комнат',
    options: [
      {
        id: 0,
        title: 'Все',
        value: [1, 2, 3],
        selected: true,
        key: 'rooms'
      },
      {
        id: 1,
        title: '1 комнатные',
        value: [1],
        selected: false,
        key: 'rooms'
      },
      {
        id: 2,
        title: '2 комнатные',
        value: [2],
        selected: false,
        key: 'rooms'
      },
      {
        id: 3,
        title: '3 комнатные',
        value: [3],
        selected: false,
        key: 'rooms'
      }
    ]
  }
}

}


const select_correct_list = (state, action, name) => {
  state.filterTypes[name].options.map( elem => {
    elem.id === action.payload.id ? elem.selected = !elem.selected :  elem.selected;
  });
  if ( action.payload.id === 0 ) {
    state.filterTypes[name].options.map( elem => {
      elem.id === action.payload.id ? elem.selected = !elem.selected :  elem.selected = false;
    });
    state.filterTypes[name].options[0].selected = true
  } else {
    state.filterTypes[name].options.filter(item => item.selected === true).length === 0 ? state.filterTypes[name].options[0].selected = true : state.filterTypes[name].options[0].selected = false
  }
  return state
}


export default function lists(state = InitialListsState, action) {
 if (action.type === 'FETCH_LISTS_SUCCESS') {
    return action.payload;
  }

  else if (action.type === 'TOGGLE_LIST') {
    state.filterTypes[action.payload].listOpen = !state.filterTypes[action.payload].listOpen
      return {...state}
  }

  else if (action.type === 'TOGGLE_SELECTED_ITEM') {
    state = select_correct_list (state, action, action.payload.key)
      return {...state}
  }

  return state;
}
