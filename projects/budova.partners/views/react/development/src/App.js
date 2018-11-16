import React from 'react';
import { connect } from 'react-redux';
import { getCards } from './actions/getcards';
import DropdownMultiple from './components/dropdown/components/DropdownMultiple';
import DropdownProto from './components/dropdown/DropdownProto';
import get_year_quarter from './js/get_year_quarter';
import convert_quarter_string from './js/convert_quarter_string';
import cssfiles from './cssfiles.js'
import LoopHeading from './fields.js'


const App = ({ cards, onFindCard, onGetCards, ownProps }) => {
  let cardInput = ''; let searchInput = ''; let taskInput = ''; let task_descInput = ''; let task_statusInput = ''; let i = 0; const loader = () => { i++; if (!i) onGetCards() }

  const findCard = () => { onFindCard(searchInput.value) }

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
                <DropdownMultiple />
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
