import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './App.css';
import AddTask from './AddTask';
import {createStore} from 'redux';
const store = createStore;

console.log(store);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
    };
  }
componentDidMount() {
    this.callApi().then(res =>{
      return res
    }).then(data =>{
      let i = 0
      let card_statuses = {
          "Срочное"  : "small-box bg-red",
          "Важное"   : "small-box bg-orange",
          "Нужное"   : "small-box bg-yellow",
          "Готовое"  : "small-box bg-green",
          "Ожидание" : "small-box bg-purple"
      }
      const cards = data.map((card) => {
        return (
          <div key={++i}>
              <div className="col-lg-3 col-xs-6">
                <div className={card_statuses[card.task_status]}>
                  <div className="inner">
                    <h3>{i}</h3>
                    <p>{card.id}</p>
                    <p>{card.task}</p>
                    <blockquote>{card.task_desc}</blockquote>
                    <span>{card.task_status}</span>
                  </div>
                  <div className="icon">
                    <i className="ion ion-edit"></i>
                  </div>
                </div>
              </div>
          </div>
        )
      })
      this.setState({cards: cards});
      console.log("state", this.state.cards)
  }).catch(err => console.log(err));
}
callApi = async () => { const response = await fetch('/task_management');
const body = await response.json(); if (response.status !== 200) throw Error(body.message);
return body; };
  render() {
    return (
      <div className="App">
      <div className="Cards">
        {this.state.cards}
      </div>
      <div className="AddTask">
      <AddTask />
      </div>
      </div>
    );
  }
}
export default App;
