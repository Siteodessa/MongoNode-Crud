import React from 'react';
import { connect } from 'react-redux';
import { Menu } from './Menu';

const Track = ({track}) => <div><Menu />{track.name}</div>

// You must find a way to deny error when a track is not found
const mapStateToProps =(state, ownProps) => {
  return {
    track: state.tracks.find(track => Number(track.id) === Number(ownProps.match.params.id))
  }
};
export default connect(mapStateToProps)(Track)
