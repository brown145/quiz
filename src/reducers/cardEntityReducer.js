import {
  CREATE_CARD,
  UPDATE_CARD,
} from '../actions/entityActions';

export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
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
    default:
      return state;
  }
}
