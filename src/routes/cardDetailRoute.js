import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCard } from '../actions/entityActions';

import CardDetail from '../components/card/detail';
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
    .map(ct => ({id: ct.topicId}));

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
    history: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  render() {
    // TODO: this should be loading icon
    if (!this.props.card || this.props.card.id === undefined) {
      return <WarningUI messageText={'Could not load card!'} />;
    }

    return (
      <CardDetail
        card={this.props.card}
        onDeckSelect={this.handler_deckClick}
        onUpdate={(card) => ( this.props.dispatch(updateCard(card)) )}
      />
    );
  }
}

export default connect(
  mapStateToCardProps
)(CardDetailContainer);
