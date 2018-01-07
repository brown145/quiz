import * as entityActions from 'actions/entityActions';

import cardsReducer from './cardEntityReducer';
import decksReducer from './deckEntityReducer';
import topicsReducer from './topicEntityReducer';
import cardDeckReducer from './cardDeckEntityReducer';
import cardTopicReducer from './cardTopicEntityReducer';
import quizResultsReducer from './quizResultsEntityReducer';

export default function reducer (state={
  decks: decksReducer(undefined, {}),
  cards: cardsReducer(undefined, {}),
  topics: topicsReducer(undefined, {}),
  cardDecks: cardDeckReducer(undefined, {}),
  cardTopics:cardTopicReducer(undefined, {}),
  quizResults: quizResultsReducer(undefined, {}),
}, action) {
  const {type, payload} = action;
  switch (type) {
    case entityActions.CREATE_CARD:
    case entityActions.DELETE_CARD:
    case entityActions.UPDATE_CARD:
      return {
        ...state,
        cards: cardsReducer(state.cards, action),
      };
    case entityActions.CREATE_DECK:
    case entityActions.DELETE_DECK:
    case entityActions.UPDATE_DECK:
      return {
        ...state,
        decks: decksReducer(state.decks, action),
      };
    case entityActions.CREATE_TOPIC:
    case entityActions.DELETE_TOPIC:
      return {
        ...state,
        topics: topicsReducer(state.topics, action),
      };
    case entityActions.RELATE_CARD_TO_DECK:
    case entityActions.DELETE_CARD_TO_DECK_RELATION:
      return {
        ...state,
        cardDecks: cardDeckReducer(state.cardDecks, action),
      };
    case entityActions.RELATE_CARD_TO_TOPIC:
    case entityActions.DELETE_CARD_TO_TOPIC_RELATION:
      return {
        ...state,
        cardTopics: cardTopicReducer(state.cardTopics, action),
      };
    case entityActions.CREATE_CARD_RELATE_TO_DECK:
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {...state.cards.byId, [payload.card.id]:payload.card},
          allIds: state.cards.allIds.concat(payload.card.id),
        },
        cardDecks:{
          ...state.cardDecks,
          byId: {...state.cardDecks.byId, [payload.relation.id]:payload.relation},
          allIds: state.cardDecks.allIds.concat(payload.relation.id),
        },
      };
    case entityActions.QUIZ_CREATE:
    case entityActions.QUIZ_UPDATE_QUESTION:
    case entityActions.QUIZ_UPDATE_COMPLETE:
      return {
        ...state,
        quizResults: quizResultsReducer(state.quizResults, action),
      };
    default:
      return state;
  }
}
