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

const App = ({  cards, districts_options ,districts_listOpen ,districts_headerTitle ,districts_titleHelper, onFindCard, onGetCards, onToggleSelected, onToggleList, ownProps }) => {
  let cardInput = ''; let searchInput = ''; let taskInput = ''; let task_descInput = ''; let task_statusInput = '';

  let i = 0; const loader = () => { i++; if (!i) onGetCards() }
  const findCard = () => { onFindCard(searchInput.value) }
  const toggleSelected = (id, key, value) => { onToggleSelected(id, key, value) }
  const toggleList = () =>{ onToggleList(districts_listOpen) }


      return (
      <div className="Cards" onLoad={loader}>
        <div className="fields" >
          <div style={({ display: 'none' })} >
            <button id="getcard" onClick={onGetCards}>Get cards</button>
          </div>
          <DropdownProto />
          <div className="row blueb">
              <div className="container">
                <div className="col-lg-12 col-xs-12 flex cardsearch">
                  <input type="text" onChange={findCard} ref={(input) => { searchInput = input}} />
                  <button onClick={findCard}> <img alt="search" src="/brief/magnifying-glass.svg" /> </button>
                </div>
              <div className="dropdown_menu">
              <div className="dd-wrapper">
                <div className="dd-header" onClick={toggleList}>
                  <div className="dd-header-title">{districts_headerTitle}</div>
                  {districts_listOpen
                    ? <FontAwesome name="angle-up" size="2x"/>
                    : <FontAwesome name="angle-down" size="2x"/>
                  }
                </div>
                {districts_listOpen && <ul className="dd-list">
                   {districts_options.map((item) => (
                     <li className="dd-list-item" key={item.title} onClick={() => toggleSelected(item.id, item.key, item.value)}>
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
                  <a href={'/doma/' + card.page_link}>
                    <img alt="search" src={'/uploads/' + card.home_background} />
                  </a>
                </div>
                <div className="panel bordered">
                  <div className="installments_icon" id="installments_icon"><img alt="search" src="/brief/icons8-money-52.png" /></div>
                  <a href="/doma/zhknagagarinskomplato">
                    <h4>{card.title}</h4> <p> {card.address}</p> <p> {card.block}</p>
                    <span><img alt="search" src="/brief/icons8-money-52.png" /> <span className="bold">от {card.prices_start_at_per_meter}  у.е./м<sup>2</sup></span></span>
                    <span><img alt="search" src="/brief/icons8-calendar-96.png" /> {convert_quarter_string(card.house_deploy_date)}</span>
                    Узнать подробнее <i className="fa fa-arrow-right"></i>
                  </a>
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


function districtsFilter(state, card) {
  let chosen = []
  state.lists.districts.options.map( i => { i.selected !== false ?  typeof i.value === 'string' ? chosen.push(i.value) : chosen = i.value : i.value })
return chosen.includes(card.block)
}
export default connect(
  (state, ownProps) => ({
    cards: state.cards
      .filter(
        card => card.note_type === 'Объект' &&
        card.title.toLowerCase().includes(state.filterCards.toLowerCase()) &&
        districtsFilter(state, card)
      ),
  districts_options: state.lists.districts.options,
  districts_listOpen: state.lists.districts.listOpen,
  districts_headerTitle: state.lists.districts.headerTitle,
  districts_titleHelper: state.lists.districts.titleHelper,
  ownProps
  }),
  dispatch => ({
    onFindCard : (task) => {
      dispatch({ type: 'FIND_CARD', payload: task})
    },
    onGetCards: () => {
        dispatch(getCards())
    },
onToggleSelected : (id, key, value) => {
dispatch({ type: 'TOGGLE_SELECTED_LIST', payload: {id:id, key:key}})

dispatch({ type: 'FILTER_BY_LISTS', payload: {id:id, value:value}})
},
onToggleList : (payload) => {
  dispatch({ type: 'TOGGLE_LIST', payload: payload})
}
  }),
)(App);
