import {
  CREATE_DECK,
  DELETE_DECK,
  UPDATE_DECK,
} from 'actions/entityActions';
import deckEntityReducer from './deckEntityReducer';
import testData from '../testData.json';

describe('deckEntityReducer', () => {
  let state;
  beforeEach(() => {
    state = testData.entities.decks;
  });

  it('CREATE_DECK', () => {
    const testDeck = {
      'id': 'dTEST',
      'name': 'test-name',
      'description': 'test-description',
    };
    state = deckEntityReducer(state, {
      type: CREATE_DECK,
      payload: {
        deck: testDeck,
      },
    });
    expect(state.byId[testDeck.id]).toEqual(testDeck);
    expect(state.allIds).toContain(testDeck.id);
  });
  it('DELETE_DECK', () => {
    const testDeckId = testData.entities.decks.allIds[0];
    const deckCount = state.allIds.length;
    state = deckEntityReducer(state, {
      type: DELETE_DECK,
      payload: {
        deckId: testDeckId,
      },
    });
    expect(state.byId[testDeckId]).not.toBeDefined();
    expect(state.allIds).not.toContain(testDeckId);
    expect(state.allIds).toHaveLength(deckCount-1);
  });
  it('UPDATE_DECK', () => {
    const testDeck = {
      ...testData.entities.decks.allIds[0],
      name: 'test-name',
      description: 'some new desc',
    };

    state = deckEntityReducer(state, {
      type: UPDATE_DECK,
      payload: {
        deck: testDeck,
      },
    });
    expect(state.byId[testDeck.id]).toEqual(testDeck);
  });
});
