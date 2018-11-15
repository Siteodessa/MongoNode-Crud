// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Menu } from './Menu';
// import card_statuses from './data/card_statuses';
// import card_icons from './data/card_icons';
// import bin from './data/trash.svg';
import React from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import { css } from 'aphrodite/no-important';
import styles from './AppStyles';
import bootstrap from './css/bootstrap.min.css';
// import fontawesome from './css/fontawesome-all.css';0
import owlcarousel from './css/owl.carousel.css';
import owltheme from './css/owl.theme.default.css';
import animatecss from './css/animate.css';
import socss from './css/so.css';
import main_styles from './css/main_styles.css';
import responsive from './css/responsive.css';
import swipermincss from './css/swiper.min.css';
const App = ({ cards, onFindCard, onGetCards, ownProps }) => {
  let cardInput = '';
  let searchInput = '';
  let taskInput = '';
  let task_descInput = '';
  let task_statusInput = '';
      let i = 0;
      const get_year_quarter = (month_number) => {
        switch (month_number) {
        case '01':
        case '02':
        case '03':
          return '1 квартал'
          break;
        case '04':
        case '05':
        case '06':
          return '2 квартал'
          break;
        case '07':
        case '08':
        case '09':
        return '3 квартал'
        break;
        case '10':
        case '11':
        case '12':
        return '4 квартал'
        break;
        default:
          return ''
      }
      return month_number
      }
      const convert_quarter_string = (datestring) => {
        if (typeof(datestring) === 'undefined' || datestring === null || datestring === '') { return }
        return '' + get_year_quarter(datestring.split('/')[0]) + ' ' + datestring.split('/')[2] + 'г'
      }
  const findCard = () => {
    onFindCard(searchInput.value);
  }
  const loader = () => {
 i++; if (!i) onGetCards()
  }
      return (
      <div className="Cards" onLoad={loader}>
      <div className="fields" >
      <div className={css(styles.transparent)} >
        <button id="getcard" onClick={onGetCards}>Get cards</button>
      </div>
      <div className="row blueb">
      <div className="container">
      <div className="col-lg-12 col-xs-12 flex cardsearch">
        <input type="text" onChange={findCard} ref={(input) => { searchInput = input}} />
        <button className={css(styles.addCard)} onClick={findCard}> <img alt="search" src="/brief/magnifying-glass.svg" /> </button>
      </div>
      <div className="dropdown_menu">
        <div className="dropdown field_box block_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Район</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p>Все районы</p>
            <p>Малиновский район</p>
            <p>Приморский район</p>
            <p>Суворовский район</p>
            <p>Киевский район</p>
          </div>
        </div>
        <div className="dropdown field_box price_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Цены до</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p>Любая</p>
            <p>до 30 000 $</p>
            <p>до 40 000 $</p>
            <p>до 60 000 $</p>
            <p>до 100 000 $</p>
          </div>
        </div>
        <div className="dropdown field_box area_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Площадь квартир</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p>от 30 до 40</p>
            <p>от 40 до 50</p>
            <p>от 50 до 60</p>
            <p>от 70 до 80</p>
            <p>от 80 до 90</p>
            <p>от 90 до 100</p>
            <p>больше 100</p>
          </div>
        </div>
        <div className="dropdown field_box rooms_field">
          <div className="option_box" >
          <div className="label_box" >
            <span className="label">  Количество комнат</span>
              <span className="icon"><img alt="search" src="/brief/002-up-arrow-angle.svg" /></span>
          </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
          <div className="dropdown-content">
            <p>1 комнатная</p>
            <p>2 комнатная</p>
            <p>3 комнатная</p>
          </div>
        </div>
        <div className="dropdown field_box choose_field">
            <div className="option_box" >
              <div className="label_box" >
                <span className="label">  Выбрать</span>
              </div>
              <span className="gray_icon"><img alt="search" src="/images/placeholder.svg" /></span>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      <div className="row">
        <h2 className="text-black text-center section_title loop_title ">
          Все жилые комплексы
          <span className="bold">«СК БУДОВА»</span>
        </h2>
      </div>
      <div className="container">
      <div className="row">
      {
        // console.log('the cards', cards),
        cards.map((card, index) =>
          <div key={index}  className="col-md-3 col-sm-6">
            <div>
            <div className="el_card">
              <div className="image_c">
                <a href={'/doma/' + card.page_link}>
                  <img alt="search" src={'/uploads/' + card.home_background} />
                </a>
              </div>
                      <div className="panel bordered">
                        <div className="installments_icon" id="installments_icon"><img alt="search" src="/brief/icons8-money-52.png" /></div>
                        <a href="/doma/zhknagagarinskomplato">
                  <h4>{card.title}{card.block}</h4>
                  <p> {card.address}</p>
                  <span><img alt="search" src="/brief/icons8-money-52.png" /> <span className="bold">от {card.prices_start_at_per_meter}  у.е./м<sup>2</sup></span></span>
                  <span><img alt="search" src="/brief/icons8-calendar-96.png" /> {convert_quarter_string(card.house_deploy_date)}</span>
              Узнать подробнее <i className="fa fa-arrow-right"></i></a>
                </div>
              </div>
            </div>
            </div>
      )}
      </div>
      </div>
      </div>
    )
}
export default connect(
  (state, ownProps) => ({
    cards: state.cards
    .filter(
      card => card.note_type === 'Объект' &&
      card.title.toLowerCase().includes(state.filterCards.toLowerCase())
    ), ownProps
  }),
  dispatch => ({
    onFindCard : (task) => {
      dispatch({ type: 'FIND_CARD', payload: task})
    },
    onGetCards: () => {
        dispatch(getCards())
    },
  }),
)(App);
