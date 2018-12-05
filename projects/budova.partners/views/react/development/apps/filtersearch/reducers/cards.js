const initialState = [
{
  createdAt: "",
  task: "",
  task_desc: "",
  task_status: "",
  updatedAt: "",
  __v: 0,
  _id: "",
}
];

const callApiPost = async (data) => {
const response = await fetch('/task_management', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          })
const body = await response.json();
if (response.status !== 200) throw Error(body.message);
   return body;
}
const callApiDelete = async (data) => {
const response = await fetch('/task_management/' + data + '', {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
          })
const body = await response.json();
if (response.status !== 200) throw Error(body.message);
   return body;
}

export default function cards(state = initialState, action) {
  if (action.type === 'ADD_CARD') {

    callApiPost(action.payload)
    return [...state, action.payload]

  } else if (action.type === 'FETCH_CARDS_SUCCESS') {
        console.log('ADD_CARD state', state);
    return action.payload;

  } else if (action.type === 'DELETE_CARD') {
    callApiDelete(action.payload)
    var removeIndex = state.map(function(card) { return card._id; }).indexOf(action.payload);
    state.splice(removeIndex, 1);
      return [...state]
  }
  return state;
}
