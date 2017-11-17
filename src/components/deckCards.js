import React from 'react';
import PropTypes from 'prop-types';

class DeckCards extends React.Component{
  render() {
    const deckId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const deck = state.decks.find((deck) => deck.id === deckId);
    const cards = state.cards.filter((card) => card.decks.includes(deckId));

    if (!deck){
      // TODO: better error handler
      return (<div>no deck with id: {deckId}</div>);
    }

    return (
      <div className='ui container'>
        <h2 className='ui header no-anchor'>Deck {deck.name}</h2>
        <div className='ui one itemsPerRow cards'>
          {
            // TODO: handle case when deck has no cards
            cards.map((card) => (
              <div key={card.id} className='ui card'>
                <div className='content'>
                  <div className='ui right ribbon tiny label'>{card.topics.join(' | ')}</div>
                  <div className='header'>{card.question}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
DeckCards.contextTypes = {
  store: PropTypes.object
}

export default DeckCards;
