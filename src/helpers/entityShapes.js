import PropTypes from 'prop-types';

const cardShape = {
  id: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string,
  relatableTopics: PropTypes.array,
  topics: PropTypes.array,
  decks: PropTypes.array,
};

const deckShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  cards: PropTypes.array,
  relatableCards: PropTypes.array,
};

const topicShape = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array,
};

const linkShape = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const quizSummaryShape = {
  id: PropTypes.string.isRequired,
  counts: PropTypes.shape({
    correctNumber: PropTypes.number.isRequired,
    incorrectNumber: PropTypes.number.isRequired,
  }).isRequired,
};

export {
  cardShape,
  deckShape,
  topicShape,
  linkShape,
  quizSummaryShape,
};
