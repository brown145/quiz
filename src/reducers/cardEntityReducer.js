import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from 'actions/entityActions';

export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
    case CREATE_CARD:
      return {
        ...state,
        byId: {...state.byId, [payload.card.id]:payload.card},
        allIds: state.allIds.concat(payload.card.id),
      };
    case DELETE_CARD:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          if (key !== payload.cardId) {
            result[key] = state.byId[key];
          }
          return result;
        }, {}),
        allIds: state.allIds.filter(cardId => cardId !== payload.cardId),
      };
    case UPDATE_CARD:
      return {
        ...state,
        byId: {...state.byId, [payload.card.id]:payload.card},
      };
    default:
      return state;
  }
}
