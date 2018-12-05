const callApi = async () => { const response = await fetch('/task_management');
const body = await response.json(); if (response.status !== 200) throw Error(body.message);
return body; };


export const getCards = () => dispatch => {
callApi().then(res =>{
    return res
  }).then(data =>{
      // console.log('Cards loaded', data);
      dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
})
}
