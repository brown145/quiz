import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCard } from '../actions/entityActions';

import CardDetail from '../components/cardDetail';
import WarningUI from '../components/warningBlurb';

const mapStateToCardProps = (store, ownProps) => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize

  const cardId = ownProps.match.params.id;
  const cardEntity = store.entities.cards.byId[cardId];
  const cardDeckEntities = Object.entries(store.entities.cardDecks.byId)
    .map(entry => (entry[1]))
    .filter(cd => (cd.cardId === cardId))
    .map(cd => (store.entities.decks.byId[cd.deckId]));
  const cardTopicEntities = Object.entries(store.entities.cardTopics.byId)
    .map(entry => (entry[1]))
    .filter(ct => (ct.cardId === cardId))
    .map(ct => (store.entities.topics.byId[ct.topicId]));

  return {
    card: {
      ...cardEntity,
      decks: cardDeckEntities,
      topics: cardTopicEntities,
    },
  };
};

class CardDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    card: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  render() {
    if (!this.props.card) {
      return <WarningUI messageText={'Could not load card!'} />;
    }

    return (
      <CardDetail
        card={this.props.card}
        onDeckSelect={this.handler_deckClick}
        onCardEdit={(card) => ( this.props.dispatch(updateCard(card)) )}
      />
    );
  }
}

export default connect(
  mapStateToCardProps
)(CardDetailContainer);
