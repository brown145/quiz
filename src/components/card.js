import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component{
  render() {
    const cardId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const card = state.cards.find((card) => ( card.id === cardId ));
    const deckNames = state.decks.map((deck) => {
      if (card.decks.includes(deck.id)){
        return deck.name;
      }
    });

    // TODO: handle case where no card exists

    return (
      <div className='ui container'>
        <h2 className='ui header no-anchor'>Card {card.question}</h2>
        <div className='ui card fluid'>
          <div className='content'>
            <div className='ui right ribbon tiny label'>{card.topics.join(' | ')}</div>
            <div className='header'>{card.question}</div>
            <div className='description'>{card.answer}</div>
          </div>
          <div className="extra content">
            <span>included in : </span>
            <div role='list' className='ui horizontal list'>
              {
                  deckNames.map((name) => (
                  <div key={name} role='listItem' className='item'>{name}</div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Card.contextTypes = {
  store: PropTypes.object
}

export default Card;
