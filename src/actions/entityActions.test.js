import * as entityActions from './entityActions';

describe('entityActions', () => {
  it('createCard', () => {
    const action = entityActions.createCard({
      question: 'test-question',
      answer: 'test-answer',
    });
    // Dev Note: would be better to match full object but unique Id is assigned
    expect(action.type).toBe(entityActions.CREATE_CARD);
    expect(action.payload.card.answer).toBe('test-answer');
    expect(action.payload.card.question).toBe('test-question');
  });

  it('createDeck', () => {
    const action = entityActions.createDeck({
      'name': 'deck 1',
      'description': 'short description to go here.',
    });
    expect(action.type).toBe(entityActions.CREATE_DECK);
    expect(action.payload.deck.name).toBe('deck 1');
    expect(action.payload.deck.description).toBe('short description to go here.');
  });


  it('createCardForDeck', () => {
    const action = entityActions.createCardForDeck({
      question: 'test-question',
      answer: 'test-answer',
    }, 'd1');

    expect(action.type).toBe(entityActions.CREATE_CARD_RELATE_TO_DECK);
    expect(action.payload.card).toBeDefined();
    expect(action.payload.relation).toBeDefined();
  });

  it('createTopic', () => {
    const action = entityActions.createTopic({
      name: 'topicName',
    });
    expect(action).toEqual({
      type: entityActions.CREATE_TOPIC,
      payload: {
        topic:{
          topicName: 'topicName',
        },
      },
    });
  });

  it('deleteCard', () => {
    const action = entityActions.deleteCard('c1');
    expect(action).toEqual({
      type: entityActions.DELETE_CARD,
      payload: {
        cardId: 'c1',
      },
    });
  });

  it('deleteDeck', () => {
    const action = entityActions.deleteDeck('d1');
    expect(action).toEqual({
      type: entityActions.DELETE_DECK,
      payload: {
        deckId: 'd1',
      },
    });
  });

  it('deleteTopic', () => {
    const action = entityActions.deleteTopic('t1');
    expect(action).toEqual({
      type: entityActions.DELETE_TOPIC,
      payload: {
        topicId: 't1',
      },
    });
  });

  it('relateCardToDeck', () => {
    const action = entityActions.relateCardToDeck('c1', 'd1');
    expect(action.type).toBe(entityActions.RELATE_CARD_TO_DECK);
    expect(action.payload.relation).toBeDefined();
  });

  it('relateTopicToCard', () => {
    const action = entityActions.relateTopicToCard('c1', 't1');
    expect(action.type).toBe(entityActions.RELATE_CARD_TO_TOPIC);
    expect(action.payload.relation).toBeDefined();
  });

  it('updateCard', () => {
    const testCard = {
      'id': 'c1',
      'question': 'what is blue?',
      'answer': 'the sky',
    };
    const action = entityActions.updateCard(testCard);
    expect(action).toEqual({
      type: entityActions.UPDATE_CARD,
      payload: {
        card: testCard,
      },
    });
  });

  it('updateDeck', () => {
    const testDeck = {
      'id': 'd1',
      'name': 'deck 1',
      'description': 'short description to go here.',
    };
    const action = entityActions.updateDeck(testDeck);
    expect(action).toEqual({
      type: entityActions.UPDATE_DECK,
      payload: {
        deck: testDeck,
      },
    });
  });
});
