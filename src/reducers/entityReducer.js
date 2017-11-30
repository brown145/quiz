import * as entityActions from '../actions/entityActions';

import cardsReducer from './cardEntityReducer';
import decksReducer from './deckEntityReducer';
import topicsReducer from './topicEntityReducer';

export default function reducer (state={
  decks: decksReducer(undefined, {}),
  cards: cardsReducer(undefined, {}),
  topics: topicsReducer(undefined, {}),
  cardDecks:{ byId: {}, allIds: [] },
  cardTopics:{ byId: {}, allIds: [] },
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
    default:
      return state;
  }
}
