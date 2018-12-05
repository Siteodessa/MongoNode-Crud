import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import { Menu } from './Menu';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite/no-important';
import styles from './AppStyles';
import zcss from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './css/App.css';
import card_statuses from './data/card_statuses';
import card_icons from './data/card_icons';
import bin from './data/trash.svg';
// import ImageServer from './ImageServer';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
const App = ({ cards, onAddCard, onFindCard, onGetCards, onDeleteCard, ownProps }) => {
  let cardInput = '';
  let searchInput = '';
  let taskInput = '';
  let deleteInput = '';
  let task_descInput = '';
  let task_statusInput = '';
  const addCard = () => {
    onAddCard({
      task: taskInput.value,
      task_desc: task_descInput.value,
      task_status: task_statusInput.value
    });
    taskInput.value = task_descInput.value = task_statusInput.value = ''
  }
  const findCard = () => {
    onFindCard(searchInput.value);
  }
  const loader = () => {
    let i = 0; i++ ;
    if (i === 1) {
      onGetCards()
    }
  }
  const deleteCard = () => {
    onDeleteCard(deleteInput.value);
  }
const images_uploaded = []
      return (
      <div className="Cards" onLoad={loader}>
      <div className="fields" >
      <div className={css(styles.transparent)} >
        <button id="getcard" onClick={onGetCards}>Get cards</button>
      </div>
      <div className="col-lg-12 col-xs-12 flex cardsearch">
        <input type="text" ref={(input) => { searchInput = input}} />
        <button className={css(styles.addCard)} onClick={findCard}> Найти задание</button>
      </div>
      </div>
      <div className="list">
      {
        // console.log('the cards', cards),
        cards.map((card, index) =>
          <div key={index}>
            <div className="col-lg-3 col-xs-6">
              <div style={{transition: '.25s ' + (index/40) + 's', opacity: '0' }} className={card_statuses[card.task_status]}>
                <div className="inner">
                <div>
                  <input type="text" type="hidden" defaultValue={card._id} ref={(input) => { deleteInput = input}} />
                  <button className="deleteicon"  onClick={deleteCard} ><img src={bin} /></button>
                </div>
                <Link to={`/cards/${card._id}`}>  <h4>{card.task}</h4></Link>
                  <p>{card.id}</p>
                  <blockquote>{card.task_desc}</blockquote>
                  {card.task_status}
                </div>
                <div className="icon">
                  <i className={card_icons[card.task_status]}></i>
                </div>
              </div>
            </div>
          </div>
      )}
      <div>
        <div className="col-lg-3 col-xs-6" >
          <div className={`add_new_card`}>
            <div className="inner">
            <div className="col-lg-8 col-xs-8">
              <input placeholder="Задание" type="text" ref={(input) => { taskInput = input}} />
              <input placeholder="Описание задания" type="text" ref={(input) => { task_descInput = input}} />
              <input placeholder="Статус" type="text" ref={(input) => { task_statusInput = input}} />
                                <ImagesUploader
                                url="http://localhost:9090/multiple"
                          optimisticPreviews
                          onLoadEnd={(err) => {
                              if (err) {
                                  console.error(err);
                              }
                          }}
                          label="Upload a picture"
                          />
              <button className={css(styles.addCard)} onClick= {addCard}> Добавить задание</button>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
}
export default connect(
  (state, ownProps) => ({
    cards: state.cards.filter(card => card.task.includes(state.filterCards)), ownProps
  }),
  dispatch => ({
    onAddCard: (payload) => {
      dispatch({ type: 'ADD_CARD', payload})
    },
    onFindCard : (task) => {
      dispatch({ type: 'FIND_CARD', payload: task})
    },
    onGetCards: () => {
        dispatch(getCards())
    },
    onDeleteCard: (id) => {
      dispatch({ type: 'DELETE_CARD', payload: id})
    }
  }),
)(App);
