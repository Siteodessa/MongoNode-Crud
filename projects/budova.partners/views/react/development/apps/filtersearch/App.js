import React from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import DropdownProto from './components/dropdown/DropdownProto';
import get_year_quarter from './js/get_year_quarter';
import convert_quarter_string from './js/convert_quarter_string';
import cssfiles from './cssfiles.js'
import LoopHeading from './fields.js'
import FontAwesome from 'react-fontawesome';
import './components/dropdown/styles/global.css';



import PlaceIcon from './css/placeholder.svg';
import PriceIcon from './css/price-tag.svg';

import ReduceIcon from './css/reduce.svg';
import CountingIcon from './css/counting.svg';
import MoneyIcon from './css/MoneyIcon';
import CalendarIcon from './css/CalendarIcon';


const App = ({  cards, filterTypes, onFindCard, onGetCards, onSelectedDistrict, onSelectedPrice, onToggleList, ownProps }) => {
  let cardInput = ''; let searchInput = ''; let taskInput = ''; let task_descInput = ''; let task_statusInput = '';
  const findCard = () => { onFindCard(searchInput.value) }
  const toggleList = (ev, name) =>{ onToggleList(name) }
  const selectedDistrict = (id, key, value) => { onSelectedDistrict(id, key, value) }
  const selectedPrice = (id, key, value) => { onSelectedPrice(id, key, value) }
  let image_Style = (a) => {return { backgroundSize: "cover",display: "block",height: "100%", backgroundImage: "url(/uploads/" +  a  + ")" }}

      return (
      <div className="Cards">
        <div className="fields" >
          <div className="row blueb">
              <div className="container">
                <div className="col-lg-12 col-xs-12 flex cardsearch">
                  <input type="text" onChange={findCard} ref={(input) => { searchInput = input}} />
                  <button onClick={findCard}> <img alt="search" src="/brief/magnifying-glass.svg" /> </button>
                </div>
              <div className="dropdown_menu">
              <div className="dd-wrapper">
                <div className="dd-header" onClick={(ev) => toggleList(ev, filterTypes.districts.options[0].key)}>
                  <div className="dd-header-title">{filterTypes.districts.headerTitle}</div>
                  {filterTypes.districts.listOpen
                    ? <FontAwesome name="angle-up"/>
                    : <FontAwesome name="angle-down"/>
                  }
                  <span className="gray_icon"><img alt="search" src={PlaceIcon} /></span>
                </div>
                {filterTypes.districts.listOpen && <ul className="dd-list">
                   {filterTypes.districts.options.map((item) => (
                     <li className="dd-list-item" key={item.title} onClick={() => selectedDistrict(item.id, item.key, item.value)}>
                       {item.title} {item.selected && <FontAwesome name="check"/>}
                     </li>
                    ))}
                </ul>}
              </div>
              <div className="dd-wrapper">
                <div className="dd-header" onClick={(ev) => toggleList(ev, filterTypes.prices.options[0].key)}>
                  <div className="dd-header-title">{filterTypes.prices.headerTitle}</div>
                  {filterTypes.prices.listOpen
                    ? <FontAwesome name="angle-up"/>
                    : <FontAwesome name="angle-down"/>
                  }<span className="gray_icon"><img alt="search" src={PriceIcon} /></span>
                </div>
                {filterTypes.prices.listOpen && <ul className="dd-list">
                   {filterTypes.prices.options.map((item) => (
                     <li className="dd-list-item" key={item.title} onClick={() => selectedPrice(item.id, item.key, item.value)}>
                       {item.title} {item.selected && <FontAwesome name="check"/>}
                     </li>
                    ))}
                </ul>}
              </div>
              <div className="dd-wrapper">
                <div className="dd-header" onClick={(ev) => toggleList(ev, filterTypes.spaces.options[0].key)}>
                  <div className="dd-header-title">{filterTypes.spaces.headerTitle}</div>
                  {filterTypes.spaces.listOpen
                    ? <FontAwesome name="angle-up"/>
                    : <FontAwesome name="angle-down"/>
                  }<span className="gray_icon"><img alt="search" src={ReduceIcon} /></span>
                </div>
                {filterTypes.spaces.listOpen && <ul className="dd-list">
                   {filterTypes.spaces.options.map((item) => (
                     <li className="dd-list-item" key={item.title} onClick={() => selectedDistrict(item.id, item.key, item.value)}>
                       {item.title} {item.selected && <FontAwesome name="check"/>}
                     </li>
                    ))}
                </ul>}
              </div>
              <div className="dd-wrapper">
                <div className="dd-header" onClick={(ev) => toggleList(ev, filterTypes.rooms.options[0].key)}>
                  <div className="dd-header-title">{filterTypes.rooms.headerTitle}</div>
                  {filterTypes.rooms.listOpen
                    ? <FontAwesome name="angle-up"/>
                    : <FontAwesome name="angle-down"/>
                  }<span className="gray_icon"><img alt="search" src={CountingIcon} /></span>
                </div>
                {filterTypes.rooms.listOpen && <ul className="dd-list">
                   {filterTypes.rooms.options.map((item) => (
                     <li className="dd-list-item" key={item.title} onClick={() => selectedDistrict(item.id, item.key, item.value)}>
                       {item.title} {item.selected && <FontAwesome name="check"/>}
                     </li>
                    ))}
                </ul>}
              </div>
              </div>
              <div className="dropdown_proto">
                {/* <DropdownProto /> */}
              </div>
            </div>
          </div>
        </div>
        <LoopHeading />
        <div className="container">
        <div className="row">
          {
          cards.map((card, index) =>
            <div key={index}  className="col-md-3 col-sm-6">
              <div>
              <div className="el_card">
                <div className="image_c">
                  <a href={'/doma/' + card.page_link}   style={image_Style(card.home_background)}>
                  </a>
                </div>
                <div className="panel bordered">
                  <div className="installments_icon" id="installments_icon"><img alt="search" src="/brief/icons8-money-52.png" /></div>
                  <a href="/doma/zhknagagarinskomplato">
                    <h4>{card.title}</h4>
                    <p> {card.address}</p>
                    <span>
                    <span class="svg_price">
                     <MoneyIcon /></span>
                     <span className="bold">от {card.prices_start_at_per_meter}  у.е./м<sup>2</sup></span></span>
                    <span><span class="svg_calendar"><CalendarIcon /> </span>{convert_quarter_string(card.house_deploy_date)}</span>
                    Узнать подробнее <i className="fa fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            </div>
        )}
        </div>
        </div>
        <div style={({ display: 'none' })} >
          <button id="getcard" onClick={onGetCards}>Get cards</button>
        </div>
      </div>
    )
}
function districtsFilter(state, card) {
  let chosen = []
  state.lists.filterTypes.districts.options.map( i => { i.selected !== false ?  typeof i.value === 'string' ? chosen.push(i.value) : chosen = i.value : i.value })
  let bool = chosen.includes(card.block)
return bool
}
function priceFilter(state, card) {
  let chosen = []
  state.lists.filterTypes.prices.options.map( i => { i.selected !== false ?  typeof i.value === 'string' ? chosen.push(i.value) : chosen = i.value : i.value })
  let bool = Number(JSON.parse(card.prices)[1].text) < chosen[1]
return bool
}
function spaceFilter(state, card) {
  let chosen = []
  state.lists.filterTypes.spaces.options.map( i => {
    i.selected !== false ? typeof i.value === 'string' ? chosen.push(i.value) : chosen.push(i.value) : i.value
  })
  let bool = false
  let prices = JSON.parse(card.prices)
  let spaces = [ Number(prices[0].text),
                 Number(prices[2].text),
                 Number(prices[4].text) ]
  chosen.map( e => {
    if (e[0] < spaces[0] && spaces[0] < e[1] ||
        e[0] < spaces[1] && spaces[1] < e[1] ||
        e[0] < spaces[2] && spaces[2] < e[1] ) bool = true
   if (isNaN(spaces[0]) && isNaN(spaces[0]) && isNaN(spaces[0])) bool = true
  });
return bool
}
function undef_or_NaN(el) {
  if (isNaN(Number(el)) && typeof el === 'undefined' ) {
    return true
  } return false
}
function roomFilter(state, card) {
  let chosen = []
  let availability = {}
    let prices = JSON.parse(card.prices)
  state.lists.filterTypes.rooms.options.map( i => {
    i.selected !== false ? i.value.length < 2 ? chosen.push(i.value) : chosen = i.value : i.value
  });
  (!undef_or_NaN(prices[0].text) || !undef_or_NaN(prices[1].text)) ?  availability[0] = true : availability[0] = false;
  (!undef_or_NaN(prices[2].text) || !undef_or_NaN(prices[3].text)) ?  availability[1] = true : availability[1] = false;
  (!undef_or_NaN(prices[4].text) || !undef_or_NaN(prices[5].text)) ?  availability[2] = true : availability[2] = false;
let bool = false
for (let prop in chosen) {
  if (availability[chosen[prop] - 1] === true) bool = true
  }
return bool
}








export default connect(
  (state, ownProps) => ({
    cards: state.cards
      .filter(
        card => card.note_type === 'Объект' &&
        card.title.toLowerCase().includes(state.filterCards.toLowerCase()) &&
        districtsFilter(state, card) &&
        priceFilter(state, card) &&
        spaceFilter(state, card) &&
        roomFilter(state, card)
      ),
  filterTypes: state.lists.filterTypes,
  ownProps
  }),
  dispatch => ({
    onFindCard : (task) => {
      dispatch({ type: 'FIND_CARD', payload: task})
    },
    onGetCards: () => {
        dispatch(getCards())
    },
    onToggleList : (payload) => {
      dispatch({ type: 'TOGGLE_LIST', payload: payload})
    },
    onSelectedDistrict : (id, key, value) => {
      dispatch({ type: 'TOGGLE_SELECTED_ITEM', payload: {id:id, key:key}})
      dispatch({ type: 'FILTER_BY_LISTS', payload: {id:id, value:value}})
    },
    onSelectedPrice : (id, key, value) => {
      dispatch({ type: 'TOGGLE_SELECTED_ITEM', payload: {id:id, key:key}})
}
  }),
)(App);
