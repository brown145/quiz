import {
  QUIZ_CREATE,
  QUIZ_UPDATE_QUESTION,
  QUIZ_UPDATE_COMPLETE,
} from 'actions/entityActions';

export default function reducer (state={
  byId: {},
  allIds: [],
}, action) {
  const {type, payload} = action;

  switch (type) {
    case QUIZ_CREATE:
      return {
        ...state,
        byId: {...state.byId, [payload.quiz.id]:payload.quiz},
        allIds: state.allIds.concat(payload.quiz.id),
      };
    case QUIZ_UPDATE_QUESTION:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          if (key !== payload.quizId) {
            result[key] = state.byId[key];
          } else {
            const correctCardIds = state.byId[key].results.correctCardIds.filter(id => id !== payload.cardId);
            const incorrectCardIds = state.byId[key].results.incorrectCardIds.filter(id => id !== payload.cardId);
            result[key] = {
              ...state.byId[key],
              results: {
                correctCardIds,
                incorrectCardIds,
              },
            };
          }
          return result;
        }, {}),
      };
    case QUIZ_UPDATE_COMPLETE:
      return {
        ...state,
        byId: Object.keys(state.byId).reduce((result, key) => {
          if (key !== payload.quizId) {
            result[key] = state.byId[key];
          } else {
            result[key] = {
              ...state.byId[key],
              isComplete: payload.isComplete,
            };
          }
          return result;
        }, {}),
      };
    default:
      return state;
  }
}
