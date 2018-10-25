import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import css from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './App.css';

class AddTask extends App {

      constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.callApiPost = this.callApiPost.bind(this);
    }

    callApiPost = async (data) => {

    const response = await fetch('http://localhost:27/task_management', {
                method: 'POST',
                headers: { "Content-Type": "application/json; charset=utf-8" },
                zzz: data
              });

    const body = await response.json();
    if (response.status !== 200) throw Error(body.message); return body;
    }




    handleSubmit(event) {
      event.preventDefault();
      const data = JSON.stringify({
        "task" : document.getElementById('task').value,
        "task_desc" : document.getElementById('task_desc').value,
        "task_status" : document.getElementById('task_status').value
      })
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
