import {
  CREATE_TOPIC,
  DELETE_TOPIC,
} from 'actions/entityActions';
import topicEntityReducer from './topicEntityReducer';
import testData from '../testData.json';

describe('topicEntityReducer', () => {
  let state;
  beforeEach(() => {
    state = testData.entities.topics;
  });

  it('CREATE_TOPIC', () => {
    const testTopic = {
      topicName: 'topicName',
    };
    state = topicEntityReducer(state, {
      type: CREATE_TOPIC,
      payload: {
        topic: testTopic,
      },
    });
    expect(state.byId.topicName).toEqual('topicName');
    expect(state.allIds).toContain('topicName');
  });
  it('DELETE_TOPIC', () => {
    const testTopicId = testData.entities.topics.allIds[0];
    const topicCount = state.allIds.length;
    state = topicEntityReducer(state, {
      type: DELETE_TOPIC,
      payload: {
        topicId: testTopicId,
      },
    });
    expect(state.byId[testTopicId]).not.toBeDefined();
    expect(state.allIds).not.toContain(testTopicId);
    expect(state.allIds).toHaveLength(topicCount-1);
  });
});
