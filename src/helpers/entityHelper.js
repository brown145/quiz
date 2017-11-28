const uuidv4 = require('uuid/v4');

export function attributesToDeck(deckAttrs) {
  return {
    id: uuidv4(),
    name: deckAttrs.name || '',
    description: deckAttrs.description || '',
  };
}

export function attributesToCard(cardAttrs) {
  return {
    id: uuidv4(),
    question: cardAttrs.question || '',
    answer: cardAttrs.answer || '',
  };
}

export function newCardDeckRelation(cardId, deckId) {
  return {
    id: uuidv4(),
    cardId,
    deckId,
  };
}
