import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
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
              <DropdownMenu />
            </div>
            <div className="dropdown_proto">
              <DropdownProto />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
