import React, { Component } from 'react';
import DropdownMultiple from './components/DropdownMultiple';
import InitialState from './components/InitialState';

class App extends Component {
    constructor(){
    super()
    this.state = InitialState
  }

  toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }

  resetThenSet = (id, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

  render() {
    return (
      <div className="App">
        <DropdownMultiple
        titleHelper="район"
        title="Район"
        list={this.state.block}
        toggleItem={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
