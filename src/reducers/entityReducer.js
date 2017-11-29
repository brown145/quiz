import {
  CREATE_CARD_ADD_TO_DECK,
} from '../actions/entityActions';

import decksReducer from './deckEntityReducer';
import cardsReducer from './cardEntityReducer';

export default function reducer (state={
  decks: decksReducer(undefined, {}),
  cards: cardsReducer(undefined, {}),
  topics:{ byId: {}, allIds: [] },
  cardDecks:{ byId: {}, allIds: [] },
  cardTopics:{ byId: {}, allIds: [] },
}, action) {
  const {type, payload} = action;

  switch (type) {
    case CREATE_CARD_ADD_TO_DECK:
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
