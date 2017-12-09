import {
  RELATE_CARD_TO_DECK,
  DELETE_CARD_TO_DECK_RELATION,
} from '../actions/entityActions';
import cardDeckEntityReducer from './cardDeckEntityReducer';
import testData from '../testData.json';

describe('cardDeckEntityReducer', () => {
  let state;
  beforeEach(() => {
    state = testData.entities.cardDecks;
  });

  it('RELATE_CARD_TO_DECK', () => {
    const testReation = {
      'id': 'dTEST',
      'deckId': 'd1',
      'cardId': 'c1',
    };
    state = cardDeckEntityReducer(state, {
      type: RELATE_CARD_TO_DECK,
      payload: {
        relation: testReation,
      },
    });
    expect(state.byId[testReation.id]).toEqual(testReation);
    expect(state.allIds).toContain(testReation.id);
  });
  it('DELETE_CARD_TO_DECK_RELATION', () => {
    const {byId, allIds} = testData.entities.cardDecks;
    const relation = byId[allIds[0]];
    const relationCount = state.allIds.length;
    state = cardDeckEntityReducer(state, {
      type: DELETE_CARD_TO_DECK_RELATION,
      payload: {
        deckId: relation.deckId,
        cardId: relation.cardId,
      },
    });
    expect(state.byId[relation.id]).not.toBeDefined();
    expect(state.allIds).not.toContain(relation.id);
    expect(state.allIds).toHaveLength(relationCount-1);
  });
});
