import {
  CREATE_TOPIC,
  DELETE_TOPIC,
} from '../actions/entityActions';

export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
    case CREATE_TOPIC:
      return {
        ...state,
        byId: {...state.byId, [payload.topic.id]:payload.topic},
        allIds: state.allIds.concat(payload.topic.id),
      };
    case DELETE_TOPIC:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          if (key !== payload.topicId) {
            result[key] = state.byId[key];
          }
          return result;
        }, {}),
        allIds: state.allIds.filter(topic => topic !== payload.topicId),
      };
    default:
      return state;
  }
}
