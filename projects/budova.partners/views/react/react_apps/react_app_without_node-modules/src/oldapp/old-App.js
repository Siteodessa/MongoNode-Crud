import React, { Component } from 'react';
import store from './the_redux_store';
import card_statuses from './card_statuses';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.callApiPost = this.callApiPost.bind(this);
      }
      componentDidMount() {
          this.callApi().then(res =>{
            return res
          }).then(data =>{
            let i = 0

            const cards = store.getState()[0].map((card) => {
            store.dispatch({'type': 'new_card', 'payload': card})
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
        }).catch(err => console.log(err));
      }
      callApi = async () => { const response = await fetch('/task_management');
      const body = await response.json(); if (response.status !== 200) throw Error(body.message);
      return body; };
      handleSubmit(event) {
        event.preventDefault();
        const data = {
          "task" : document.getElementById('task').value,
          "task_desc" : document.getElementById('task_desc').value,
          "task_status" : document.getElementById('task_status').value
        }
            this.callApiPost(data)
      }
      callApiPost = async (data) => {
      const response = await fetch('/task_management', {
                  method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                })
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      let current = [...store.getState(), data]
      this.setState({cards: current});
         return body;
      }
  render() {
    console.log(this.props.testStore);
    return (
      <div className="App">
      <div className="Cards">
        {this.state.cards}
      </div>
      <div className="AddTask">
      <div className="col-lg-12 col-xs-12 box-header with-border">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
            <label htmlFor="task">Введите задание</label>
            <input id="task" name="task" type="text"  />
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
      </div>
      </div>
    );
  }
}


export default connect(
state => ({
  testStore: state
}),
dispatch => ({}),
)(App)
// export default App
