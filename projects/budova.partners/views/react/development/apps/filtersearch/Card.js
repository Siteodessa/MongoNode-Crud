import React from 'react';
import { connect } from 'react-redux';
import { Menu } from './Menu';

const Card = ({card}) => {
  <div><Menu />
  {card.task}
  </div>
}

// You must find a way to deny error when a card is not found
const mapStateToProps =(state, ownProps) => {
  return {
    card: state.cards.find(card => Number(card.id) === Number(ownProps.match.params.id))
  }
};
export default connect(mapStateToProps)(Card)
