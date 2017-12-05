import PropTypes from 'prop-types';

const cardShape = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
  topics: PropTypes.array,
  decks: PropTypes.array,
};

const deckShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  cards: PropTypes.array,
};

const topicShape = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array,
};

export {
  cardShape,
  deckShape,
  topicShape,
};
