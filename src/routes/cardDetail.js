import React from 'react';
import PropTypes from 'prop-types';

import CardDetail from '../components/cardDetail';
import WarningUI from '../components/warningBlurb';

class CardDetailContainer extends React.Component{
  handler_deckClick = (deckId) => {
    if (deckId) {
      this.props.history.push('/decks/' + deckId);
    }
  }

  render() {
    const cardId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const card = state.cards.find((card) => ( card.id === cardId ));
    const decks = state.decks.filter((deck) => ( deck.cards.includes(cardId) ));

    if (!card) {
      return (
        <WarningUI messageText={'Could not load card!'} />
      );
    }

    return (
      <CardDetail
        cardId={cardId}
        question={card.question}
        answer={card.answer}
        topics={card.topics}
        decks={decks}
        onDeckSelect={this.handler_deckClick}
      />
    );
  }
}
CardDetailContainer.contextTypes = {
  store: PropTypes.object
}

export default CardDetailContainer;
