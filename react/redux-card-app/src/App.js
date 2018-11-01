import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/cards';
import { Menu } from './Menu';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite/no-important';
import styles from './AppStyles';
import zcss from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './css/App.css';


const App = ({ cards, onAddCard, onFindCard, onGetCards, ownProps }) => {
  let cardInput = '';
  let searchInput = '';
  console.log('ownProps', ownProps);
  const addCard = () => {
    onAddCard(cardInput.value);
    cardInput.value= ''
  }
  const findCard = () => {
    onFindCard(searchInput.value);
  }

      console.log(cards);
      return (
      <div className="Cards">
      <div>
        <Menu />
      </div>
      <div>
        <input type="text" ref={(input) => { cardInput = input}} />
        <button className={css(styles.addCard)} onClick= {addCard}> Add card</button>
      </div>
      <div>
        <input type="text" ref={(input) => { searchInput = input}} />
        <button className={css(styles.addCard)} onClick={findCard}> Find card</button>
      <div className={css(styles.square)}>
      Changed
      </div>
      </div>
      <div>
        <button onClick={onGetCards}>Get cards</button>
      </div>
      <ul>
      {cards.map((card, index) =>
          <div key={index}>
            <div className="col-lg-3 col-xs-6">
              <div>
                <div className="inner">
                  <h3>{}</h3>
                  <p>{}</p>
                  <p>{}</p>
                  <blockquote>{}</blockquote>
                  <span>{}</span>
                  <Link to={`/cards/${card.id}`}><h2>{card.name}</h2></Link>
                </div>
                <div className="icon">
                  <i className="ion ion-edit"></i>
                </div>
              </div>
            </div>
          </div>
      )}
      </ul>
      </div>
    )

}
export default connect(
  (state, ownProps) => ({
    cards: state.cards.filter(card => card.name.includes(state.filterCards)), ownProps
  }),
  dispatch => ({
    onAddCard: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_TRACK', payload})
    },
    onFindCard : (name) => {
      console.log('name', name);
      dispatch({ type: 'FIND_TRACK', payload: name})
    },
    onGetCards: () => {
        dispatch(getCards())
    }
  }),
)(App);
// <li key={index}>{card}</li>
      // <div className={card_statuses[card.task_status]}>
          // <h3>{i}</h3>
          // <p>{card.id}</p>
          // <p>{card.task}</p>
          // <blockquote>{card.task_desc}</blockquote>
          // <span>{card.task_status}</span>
