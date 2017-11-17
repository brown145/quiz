import React from 'react';
import PropTypes from 'prop-types';

class DeckList extends React.Component{
  render() {
    const { store } = this.context;
    const state = store.getState();
    const decks = state.decks;
    const cards = state.cards;

    return (
      <div className='ui container'>
        <h2 className='ui header no-anchor'>Deck List</h2>
        <div className='ui two itemsPerRow cards'>
          {
              // TODO: handle case when no decks exist
              // TODO: break this out to own function or own component
              decks.map((deck) => {
                const cardCount = cards.filter((card) => (card.decks.includes(deck.id))).length;

                return (
                  <div key={deck.id} className='ui card'>
                    <div className='content'>
                      <div className='header'>{deck.name}</div>
                      <div className='meta'>{deck.description}</div>
                      <div className='description'>created: {(new Date(deck.created)).toDateString()}</div>
                      <div className='description'>last viewed: {(new Date(deck.lastViewed)).toDateString()}</div>
                    </div>
                    <div className="extra content">
                      <a>
                        <i aria-hidden="true" className="cubes icon"></i>
                        {cardCount} Cards
                      </a>
                    </div>
                  </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}
DeckList.contextTypes = {
  store: PropTypes.object
}

export default DeckList;
