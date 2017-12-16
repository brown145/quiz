import {
  RELATE_CARD_TO_DECK,
  DELETE_CARD_TO_DECK_RELATION,
} from 'actions/entityActions';

// TODO: unit tests
export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
    case RELATE_CARD_TO_DECK:
      return {
        ...state,
        byId: {...state.byId, [payload.relation.id]:payload.relation},
        allIds: state.allIds.concat(payload.relation.id),
      };
    case DELETE_CARD_TO_DECK_RELATION:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          const relation = state.byId[key];
          if (relation.cardId !== payload.cardId || relation.deckId !== payload.deckId) {
            result[key] = state.byId[key];
          }
          return result;
        }, {}),
        allIds: state.allIds.filter(relationId => {
          const relation = state.byId[relationId];
          return relation.cardId !== payload.cardId || relation.deckId !== payload.deckId;
        }),
      };
    default:
      return state;
  }
}
