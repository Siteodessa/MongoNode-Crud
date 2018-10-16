import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './App.css';
//read
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
    };
  }
//
componentDidMount() {
    let dis = this;
    dis.callApi() .then(res =>{
      return JSON.stringify(res)
    }).then(data =>{
      let i = 0
      let cards = data.map((card) => {
        return (

          <div key={++i}>
              <div>{card.task}</div>
          </div>
        )

      })

  }).catch(err => console.log(err));
}
callApi = async () => { const response = await fetch('http://localhost:27/task_management'); const body = await response.json(); if (response.status !== 200) throw Error(body.message); return body; };
  render() {
    return (
      <div className="App">
        <section className="content">
        <h1>Задачи</h1>
        <a href="https://reactjs.org/docs/lists-and-keys.html">ОТВЕТ ТУТ</a>
        <a href="https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2">А ТУТ ЕЩЕ ЛУЧШЕ</a>
        <div className="taskcard">

        </div>
        </section>
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
