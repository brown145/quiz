import {
  ADD_DECK,
  EDIT_DECK,
  ADD_CARD,
  EDIT_CARD,
  ADD_CARD_TO_DECK,
} from '../actions/entityActions';

export default function reducer (state={
  decks:[],
  cards:[],
  // isLoaded:false,
  // isPersisted:false, //TODO: use this!
}, action) {
  const {type, payload} = action;

  switch (type) {
    case EDIT_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          byId: {...state.decks.byId, [payload.deck.id]:payload.deck},
        },
      };
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          byId: {...state.decks.byId, [payload.deck.id]:payload.deck},
          allIds: state.decks.allIds.concat(payload.deck.id),
        },
      };
    case EDIT_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {...state.cards.byId, [payload.card.id]:payload.card},
        },
      };
    case ADD_CARD:
      return {
        ...state,
        cards: {
          ...state.cards,
          byId: {...state.cards.byId, [payload.card.id]:payload.card},
          allIds: state.cards.allIds.concat(payload.card.id),
        },
      };
    case ADD_CARD_TO_DECK:
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
