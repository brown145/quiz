import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { editCard } from '../actions/entityActions';

import CardDetail from '../components/cardDetail';
import WarningUI from '../components/warningBlurb';

// TODO: it would be preferable to map to a single card
//       however, this would require me to have the id of the card
//       and at present that is only in the router state, it will
//       be passed as prop later
const mapStateToCardProps = (store) => {
  let deckNamesByCard = {};
  store.entities.cards.allIds.forEach(cardId => {
    const relations = Object.entries(store.entities.cardDecks.byId)
      .map((entry) => (entry[1]))
      .filter(cd => cd.cardId === cardId)
      .map(cd => (store.entities.decks.byId[cd.deckId]));
    deckNamesByCard[cardId] = relations;
  });

  // TODO: get topics for card
  return {
    cards: store.entities.cards.allIds.map(cardId => ({
      ...store.entities.cards.byId[cardId],
      decks: deckNamesByCard[cardId],
    })),
  };
};

class CardDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    cards: PropTypes.object,
    dispatch: PropTypes.func,
  };


  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  render() {
    const cardId = this.props.match.params.id;
    const card = this.props.cards.find(card => card.id === cardId);

    if (!card) {
      return <WarningUI messageText={'Could not load card!'} />;
    }

    return (
      <CardDetail
        card={card}
        onDeckSelect={this.handler_deckClick}
        onCardEdit={(card) => ( this.props.dispatch(editCard(card)) )}
      />
    );
  }
}

export default connect(
  mapStateToCardProps
)(CardDetailContainer);
