import React, { Component } from 'react';
import { Link } from 'react-router-dom';


 class Menu extends Component {
  render() {
    return (
      <div>
        <Link to="/">Cards</Link>
        <Link to="/About">About</Link>
      </div>
    )
  }
}
export { Menu }
