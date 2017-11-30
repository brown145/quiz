import {
  CREATE_DECK,
  DELETE_DECK,
  UPDATE_DECK,
} from '../actions/entityActions';

export default function reducer(
  state = {
    byId: {},
    allIds: [],
  },
  action
) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_DECK:
      return {
        ...state,
        byId: { ...state.byId, [payload.deck.id]: payload.deck },
        allIds: state.allIds.concat(payload.deck.id),
      };
    case DELETE_DECK:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          if (key !== payload.deckId) {
            result[key] = state.byId[key];
          }
          return result;
        }, {}),
        allIds: state.allIds.filter(deckId => deckId !== payload.deckId),
      };
    case UPDATE_DECK:
      return {
        ...state,
        byId: { ...state.byId, [payload.deck.id]: payload.deck },
      };
    default:
      return state;
  }
}
