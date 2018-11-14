import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTracks } from './actions/tracks';
import { Menu } from './Menu';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite/no-important';
import styles from './AppStyles';
import zcss from './css/z.css';
import bootstrap from './css/bootstrap.min.css';
import './css/App.css';


const App = ({ tracks, onAddTrack, onFindTrack, onGetTracks, ownProps }) => {
  let trackInput = '';
  let searchInput = '';
  console.log('ownProps', ownProps);
  const addTrack = () => {
    onAddTrack(trackInput.value);
    trackInput.value= ''
  }
  const findTrack = () => {
    onFindTrack(searchInput.value);
  }

      console.log(tracks);
      return (
      <div className="Cards">
      <div>
        <Menu />
      </div>
      <div>
        <input type="text" ref={(input) => { trackInput = input}} />
        <button className={css(styles.addTrack)} onClick= {addTrack}> Add track</button>
      </div>
      <div>
        <input type="text" ref={(input) => { searchInput = input}} />
        <button className={css(styles.addTrack)} onClick={findTrack}> Find track</button>
      <div className={css(styles.square)}>
      Changed
      </div>
      </div>
      <div>
        <button onClick={onGetTracks}>Get tracks</button>
      </div>
      <ul>
      {tracks.map((track, index) =>
          <div key={index}>
            <div className="col-lg-3 col-xs-6">
              <div>
                <div className="inner">
                  <h3>{}</h3>
                  <p>{}</p>
                  <p>{}</p>
                  <blockquote>{}</blockquote>
                  <span>{}</span>
                  <Link to={`/tracks/${track.id}`}><h2>{track.name}</h2></Link>
                </div>
                <div className="icon">
                  <i className="ion ion-edit"></i>
                </div>
              </div>
            </div>
          </div>
      )}
      </ul>
      </div>
    )

}
export default connect(
  (state, ownProps) => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)), ownProps
  }),
  dispatch => ({
    onAddTrack: (name) => {
      const payload = {
        id: Date.now().toString(),
        name
      };
      dispatch({ type: 'ADD_TRACK', payload})
    },
    onFindTrack : (name) => {
      console.log('name', name);
      dispatch({ type: 'FIND_TRACK', payload: name})
    },
    onGetTracks: () => {
        dispatch(getTracks())
    }
  }),
)(App);
// <li key={index}>{track}</li>
      // <div className={card_statuses[card.task_status]}>
          // <h3>{i}</h3>
          // <p>{card.id}</p>
          // <p>{card.task}</p>
          // <blockquote>{card.task_desc}</blockquote>
          // <span>{card.task_status}</span>
