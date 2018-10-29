import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class AddTask extends Component {
      constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.callApiPost = this.callApiPost.bind(this);
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
    // this.state.cards.push(body)
    // this.setState({cards: body});
    this.setState({ cards: this.state.cards.concat([body]) })

        console.log('body is');
        console.log(body);
        console.log(' ~ and state is');
        console.log(this.state.cards);
       return body;
    }
    handleSubmit(event) {
      event.preventDefault();
      const data = {
        "task" : document.getElementById('task').value,
        "task_desc" : document.getElementById('task_desc').value,
        "task_status" : document.getElementById('task_status').value
      }
          this.callApiPost(data)
    }
      render() {
        return (
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
        )
    }
}
export default AddTask;
