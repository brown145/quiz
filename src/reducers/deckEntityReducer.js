import {
  CREATE_DECK,
  UPDATE_DECK,
} from '../actions/entityActions';

export default function reducer (state={
  byId: {},
  allIds: [],
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
    default:
      return state;
  }
}
