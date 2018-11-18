import React from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import Blocks from './components/dropdown/components/InitialState';
// import DropdownMultiple from './components/dropdown/components/DropdownMultiple';
// <DropdownMultiple />
import DropdownProto from './components/dropdown/DropdownProto';
import get_year_quarter from './js/get_year_quarter';
import convert_quarter_string from './js/convert_quarter_string';
import cssfiles from './cssfiles.js'
import LoopHeading from './fields.js'
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";
import './components/dropdown/styles/global.css';

const App = ({  cards, list, listOpen, headerTitle, titleHelper, onFindCard, onGetCards, onToggleSelected, onHandleClickOutside, onToggleList, onResetThenSet, ownProps }) => {

  let cardInput = ''; let searchInput = ''; let taskInput = ''; let task_descInput = ''; let task_statusInput = '';
  let i = 0; const loader = () => { i++; if (!i) onGetCards() }


  const findCard = () => { onFindCard(searchInput.value) }


  const toggleSelected = (id, key, value) => {
    onToggleSelected(id, key, value)
  }


  this.handleClickOutside = () =>{
    onHandleClickOutside()
    this.setState({
      listOpen: false
    })
  }
  const toggleList = () =>{
    onToggleList(listOpen)
  }
  const resetThenSet = (id, key) => {
    onResetThenSet(id, key)
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

      return (
      <div className="Cards" onLoad={loader}>
        <div className="fields" >
          <div style={({ display: 'none' })} >
            <button id="getcard" onClick={onGetCards}>Get cards</button>
          </div>
          <div className="row blueb">
              <div className="container">
                <div className="col-lg-12 col-xs-12 flex cardsearch">
                  <input type="text" onChange={findCard} ref={(input) => { searchInput = input}} />
                  <button onClick={findCard}> <img alt="search" src="/brief/magnifying-glass.svg" /> </button>
                </div>
              <div className="dropdown_menu">
              <div className="dd-wrapper">
                <div className="dd-header" onClick={toggleList}>
                  <div className="dd-header-title">{headerTitle}</div>
                  {listOpen
                    ? <FontAwesome name="angle-up" size="2x"/>
                    : <FontAwesome name="angle-down" size="2x"/>
                  }
                </div>
                {listOpen && <ul className="dd-list">
                   {list.map((item) => (
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


function blocksFilter(state, card) {
  let chosen = []
  state.lists.list.map( i => { i.selected !== false ?  typeof i.value === 'string' ? chosen.push(i.value) : chosen = i.value : i.value })
return chosen.includes(card.block)
}
export default onClickOutside(connect(
  (state, ownProps) => ({
    cards: state.cards
      .filter(
        card => card.note_type === 'Объект' &&
        card.title.toLowerCase().includes(state.filterCards.toLowerCase()) &&
        blocksFilter(state, card)
      ),
  list: state.lists.list,
  listOpen: state.lists.listOpen,
  headerTitle: state.lists.headerTitle,
  titleHelper: state.lists.titleHelper,
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
onHandleClickOutside : (task) => { },
onToggleList : (listOpen) => {
  dispatch({ type: 'TOGGLE_LIST', payload: listOpen})
},
onResetThenSet : (task) => { }
  }),
)(App));
