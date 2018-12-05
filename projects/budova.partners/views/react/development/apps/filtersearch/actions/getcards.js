const callApi = async () => { const response = await fetch('/notes');
const body = await response.json(); if (response.status !== 200) throw Error(body.message);
console.log(body);
return body;
};


export const getCards = () => dispatch => {
callApi().then(res =>{
    return res
  }).then(data =>{
    data.filter(card => card.note_type === 'Объект')
      dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
})
}
