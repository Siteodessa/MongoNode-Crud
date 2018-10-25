import React, { Component } from 'react';
import Portfolio from './portfolio.js';
import './App.css';





class App extends Component {
  render() {
    return (
      <div className="tdcontainer">
          <div className="port-data">
              <h2 className="ow">Our</h2>
              <h2 className="ow">works</h2>
              <div className="date"> Updated At: 10.06 </div>
              <button onClick={startChat} className="chat"> Want one? </button>
  
          </div>
          <div className="lns">
              <div className="lnsl">
                  <div className="lnwrp"></div>
                  <div className="lnwrp dbl"></div>
              </div>
              <div className="lnsr">
                  <div className="lnwrp"></div>
                  <div className="lnwrp dbl"></div>
              </div>
          </div>
          <Portfolio />

      </div>
    );
  }
}
function startChat(){
console.log('https://habr.com/company/ruvds/blog/333618/');
}
export default App;
