import React, { Component } from 'react';
import { subscribeToTimer, socket, broadcastMessage } from './socket_api';


class Chat extends Component {
  constructor(props) {
    super(props);
    broadcastMessage((err, message) => this.setState({
      message
    }));
    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }
  handleSubmit = (event) => {
    socket.emit('broadcastMessage', 1000);
    broadcastMessage(document.getElementById("m").value)
  };


  state = {
    timestamp: '',
    message: '1',
  };
  render() {
    return (
      <div className="chatpage">
      <div className="Timer">
        <p className="Timer-intro">
       {this.state.timestamp}
        </p>
      </div>

      <div>
        <ul id="messages">   {this.state.message}</ul>
          <form onSubmit={this.handleSubmit}>
            <input id="m"  autoComplete="off" />
            <button type="submit">Submit</button>
        </form>
      </div>

      </div>
    );
  }
}






export default Chat;
