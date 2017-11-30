import {
  CREATE_CARD,
  DELETE_CARD,
  UPDATE_CARD,
} from '../actions/entityActions';
import cardEntityReducer from './cardEntityReducer';
import testData from '../testData.json';

describe('cardEntityReducer', () => {
  let state;
  beforeEach(() => {
    state = testData.entities.cards;
  });

  it('CREATE_CARD', () => {
    const testCard = {
      'id': 'cTEST',
      'question': 'test-question',
      'answer': 'test-answer',
    };
    state = cardEntityReducer(state, {
      type: CREATE_CARD,
      payload: {
        card: testCard,
      },
    });
    expect(state.byId[testCard.id]).toEqual(testCard);
    expect(state.allIds).toContain(testCard.id);
  });
  it('DELETE_CARD', () => {
    const testCardId = testData.entities.cards.allIds[0];
    const cardCount = state.allIds.length;
    state = cardEntityReducer(state, {
      type: DELETE_CARD,
      payload: {
        cardId: testCardId,
      },
    });
    expect(state.byId[testCardId]).not.toBeDefined();
    expect(state.allIds).not.toContain(testCardId);
    expect(state.allIds).toHaveLength(cardCount-1);
  });
  it('UPDATE_CARD', () => {
    const testCard = {
      ...testData.entities.cards.allIds[0],
      question: 'test-name',
      answer: 'some new desc',
    };

    state = cardEntityReducer(state, {
      type: UPDATE_CARD,
      payload: {
        card: testCard,
      },
    });
    expect(state.byId[testCard.id]).toEqual(testCard);
  });
});
