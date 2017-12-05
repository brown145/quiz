import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// TODO:
// import { createCardForDeck } from '../actions/entityActions';

import DeckDetail from '../components/deck/detail';
import WarningUI from '../components/warningBlurb';

const mapStateToDeckProps = (store, ownProps) => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize

  const deckId = ownProps.match.params.id;
  const deckEntity = store.entities.decks.byId[deckId];
  const cardDeckEntities = Object.entries(store.entities.cardDecks.byId)
    .map(entry => (entry[1]))
    .filter(cd => (cd.deckId === deckId))
    .map(cd => {
      const cardTopicEntities = Object.entries(store.entities.cardTopics.byId)
        .map(entry => (entry[1]))
        .filter(ct => (ct.cardId === cd.cardId))
        .map(ct => (store.entities.topics.byId[ct.topicId]));
      return {
        ...store.entities.cards.byId[cd.cardId],
        topics: cardTopicEntities,
      };
    });

  return {
    deck: {
      ...deckEntity,
      cards: cardDeckEntities,
    },
  };
};

class DeckDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  render() {
    const { deck } = this.props;

    if (!deck) {
      return <WarningUI messageText="Could not load deck" />;
    }

    return (
      <DeckDetail
        deck={deck}
        onCardSelect={this.handler_cardClick}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(DeckDetailContainer);
