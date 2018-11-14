
var mockApiData = [
  {
    id: 1,
    name: 'Smack my bitch up',
  },
  {
    id: 2,
    name: 'Diesel Power',
  },
  {
    id: 3,
    name: 'I can\'t stop',
  },
  {
    id: 4,
    name: 'Billie Jean',
  },
]


export const getCards = () => dispatch => {
    setTimeout(() => {
      console.log('I got cards');
      dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData })
    }, 1000)
}
