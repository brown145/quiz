import {
  RELATE_CARD_TO_TOPIC,
  DELETE_CARD_TO_TOPIC_RELATION,
} from '../actions/entityActions';
import cardTopicEntityReducer from './cardTopicEntityReducer';
import testData from '../testData.json';

describe('cardTopicEntityReducer', () => {
  let state;
  beforeEach(() => {
    state = testData.entities.cardTopics;
  });

  it('RELATE_CARD_TO_TOPIC', () => {
    const testReation = {
      'id': 'dTEST',
      'topicId': 'colors',
      'cardId': 'c1',
    };
    state = cardTopicEntityReducer(state, {
      type: RELATE_CARD_TO_TOPIC,
      payload: {
        relation: testReation,
      },
    });
    expect(state.byId[testReation.id]).toEqual(testReation);
    expect(state.allIds).toContain(testReation.id);
  });
  it('DELETE_CARD_TO_TOPIC_RELATION', () => {
    const {byId, allIds} = testData.entities.cardTopics;
    const relation = byId[allIds[0]];
    const relationCount = state.allIds.length;
    state = cardTopicEntityReducer(state, {
      type: DELETE_CARD_TO_TOPIC_RELATION,
      payload: {
        topicId: relation.topicId,
        cardId: relation.cardId,
      },
    });
    expect(state.byId[relation.id]).not.toBeDefined();
    expect(state.allIds).not.toContain(relation.id);
    expect(state.allIds).toHaveLength(relationCount-1);
  });
});
