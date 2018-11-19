import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import onClickOutside from "react-onclickoutside";
import '../styles/global.css';

class Dropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      district_listOpen: false,
      headerTitle: this.props.title
    }
  }

  handleClickOutside(e){
    this.setState({
      district_listOpen: false
    })
  }

  selectItem = (title, id, stateKey) => {
    this.setState({
      headerTitle: title,
      district_listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList = () => {
    this.setState(prevState => ({
      district_listOpen: !prevState.district_listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{district_listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={this.toggleList}>
          <div className="dd-header-title">{headerTitle}</div>
          {district_listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
        </div>
        {district_listOpen && <ul className="dd-list">
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>{item.title} {item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
      </div>
    )
  }
}

export default onClickOutside(Dropdown);
