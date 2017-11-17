import React from 'react';
import PropTypes from 'prop-types';

//TODO: accept multiple topics - https://stackoverflow.com/a/35976942
class TopicCards extends React.Component{
  render() {
    const topics = this.props.match.params.topics;
    const { store } = this.context;
    const state = store.getState();
    const cards = state.cards.filter((card) => card.topics.includes(topics));

    return (
      <div>
        Topics {topics} - TBD
        <ol>
          {
            // TODO: handle case when deck has no cards
            cards.map((card) => (
              <li key={card.id}>{card.question}</li>
            ))
          }
        </ol>
      </div>
    );
  }
}
TopicCards.contextTypes = {
  store: PropTypes.object
}

export default TopicCards;
