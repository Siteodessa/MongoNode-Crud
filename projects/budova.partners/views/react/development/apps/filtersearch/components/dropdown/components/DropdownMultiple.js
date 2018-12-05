import React from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import onClickOutside from "react-onclickoutside";
import InitialState from './InitialState';
import '../styles/global.css';



  const DropdownMultiple = ({ list ,district_listOpen ,headerTitle ,titleHelper ,onToggleSelected ,onHandleClickOutside ,onToggleList ,onResetThenSet, ownProps }) => {


  const toggleSelected = (id, key) => {
    let temp = JSON.parse(JSON.stringify(list[key]))
    temp[id].selected = !temp[id].selected
    this.setState({
      list:{
      [key]: temp
    }
    })

    onToggleSelected(id, key)
  }


  const handleClickOutside = () =>{
    onHandleClickOutside()
    this.setState({
      district_listOpen: false
    })
  }
  const toggleList = () =>{
    onToggleList(district_listOpen)
  }
  const resetThenSet = (id, key) => {
    onResetThenSet(id, key)
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
  }

    return(
      <div className="dd-wrapper">
      <div className="dd-header" onClick={() => toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {district_listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
      </div>
       {district_listOpen && <ul className="dd-list">
         {list.block.map((item) => (
           <li className="dd-list-item" key={item.title} onClick={() => this.toggleSelected(item.id, item.key)}>
             {item.title} {item.selected && <FontAwesome name="check"/>}
           </li>
          ))}
        </ul>}
      </div>
    )
  }



export default onClickOutside(connect(
  (state, ownProps) => ({
    list: InitialState,
    district_listOpen: false,
    headerTitle: 'Район',
    titleHelper: 'район', ownProps
  }),
  dispatch => ({
onToggleSelected : (id, key) => {
                  console.log('id, key', id, key);
                    console.log('onToggleSelected');
                  // dispatch({ type: 'FIND_CARD', payload: task})
                  // dispatch({ type: 'FILTER_CARD', payload: InitialState.block.find(id:id)})
                },
onHandleClickOutside : (task) => {
  console.log('onHandleClickOutside');
                  // dispatch({ type: 'FIND_CARD', payload: task})
                },
onToggleList : (district_listOpen) => {
  console.log('district_listOpen', district_listOpen);
                  // dispatch({ type: 'FIND_CARD', payload: task})
                },
onResetThenSet : (task) => {
  console.log('onResetThenSet');
                  // dispatch({ type: 'FIND_CARD', payload: task})
                }
  }),
)(DropdownMultiple));
