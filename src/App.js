import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './App.css';
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
callApi = async () => { const response = await fetch('http://localhost:27/task_management'); const body = await response.json(); if (response.status !== 200) throw Error(body.message); return body; };
  render() {
    return (
      <div className="App">
          {this.state.cards}
      </div>
    );
  }
}

class AddTask extends App {

      constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
      event.preventDefault();
      // const data = new FormData(event.target);
      const data = JSON.stringify({
        "task" : document.getElementById('task').value,
        "task_desc" : document.getElementById('task_desc').value,
        "task_status" : document.getElementById('task_status').value
      })
      console.log(data)
      fetch('/task_management', {
            method: 'POST',
        headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
        zzz: data
    })
    }
      render() {
        return (
                  <div className="col-lg-12 col-xs-12">
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                        <label htmlFor="task">Введите задание</label>
                        <input id="task" name="task" type="text" />
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="task_desc">Введите описание задания</label>
                        <input id="task_desc" name="task_desc" type="text" />
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="task_status">Введите статус задания</label>
                        <input id="task_status" name="task_status" type="text" />
                        </div>
                        <button>Отправить</button>
                      </div>
                    </form>
                  </div>
        )
    }
}
export default App;
