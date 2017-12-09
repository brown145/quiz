import {
  RELATE_CARD_TO_TOPIC,
  DELETE_CARD_TO_TOPIC_RELATION,
} from '../actions/entityActions';

// TODO: unit tests
export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
    case RELATE_CARD_TO_TOPIC:
      return {
        ...state,
        byId: {...state.byId, [payload.relation.id]:payload.relation},
        allIds: state.allIds.concat(payload.relation.id),
      };
    case DELETE_CARD_TO_TOPIC_RELATION:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          const relation = state.byId[key];
          if (relation.cardId !== payload.cardId || relation.topicId !== payload.topicId) {
            result[key] = state.byId[key];
          }
          return result;
        }, {}),
        allIds: state.allIds.filter(relationId => {
          const relation = state.byId[relationId];
          return relation.cardId !== payload.cardId || relation.topicId !== payload.topicId;
        }),
      };
    default:
      return state;
  }
}
