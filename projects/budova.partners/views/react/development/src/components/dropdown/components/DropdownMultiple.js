import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";
import InitialState from './InitialState';
import '../styles/global.css';

class DropdownMultiple extends Component{
  constructor(){
    super()
    this.state = {
      list: InitialState,
      listOpen: false,
      headerTitle: 'Район',
      titleHelper: 'район',
    }
  }
  toggleSelected(id, key){

    let temp = JSON.parse(JSON.stringify(this.state.list[key]))
    temp[id].selected = !temp[id].selected
      console.log('zis.state', this.state);
    this.setState({
      list:{
      [key]: temp
    }
    })
  }
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  resetThenSet(id, key){
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }
  render(){
    return(
      <div className="dd-wrapper">
      <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{this.state.headerTitle}</div>
          {this.state.listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
      </div>
       {this.state.listOpen && <ul className="dd-list">
         {this.state.list.block.map((item) => (
           <li className="dd-list-item" key={item.title} onClick={() => this.toggleSelected(item.id, item.key)}>
             {item.title} {item.selected && <FontAwesome name="check"/>}
           </li>
          ))}
        </ul>}
      </div>
    )
  }
}
export default onClickOutside(DropdownMultiple);
