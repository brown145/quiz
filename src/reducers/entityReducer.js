import {
  CREATE_DECK,
  UPDATE_DECK,
  CREATE_CARD,
  UPDATE_CARD,
  CREATE_CARD_ADD_TO_DECK,
} from '../actions/entityActions';

export default function reducer (state={
  decks:{ byId: {}, allIds: [] },
  cards:{ byId: {}, allIds: [] },
  topics:{ byId: {}, allIds: [] },
  cardDecks:{ byId: {}, allIds: [] },
  cardTopics:{ byId: {}, allIds: [] },
}, action) {
  const {type, payload} = action;

  switch (type) {
    case UPDATE_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          byId: {...state.decks.byId, [payload.deck.id]:payload.deck},
        },
      };
    case CREATE_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          byId: {...state.decks.byId, [payload.deck.id]:payload.deck},
          allIds: state.decks.allIds.concat(payload.deck.id),
        },
      };
    case UPDATE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {...state.cards.byId, [payload.card.id]:payload.card},
        },
      };
    case CREATE_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {...state.cards.byId, [payload.card.id]:payload.card},
          allIds: state.cards.allIds.concat(payload.card.id),
        },
      };
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
