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

export function attributesToTopic(topicAttrs) {
  const topic = topicAttrs.text;
  return {
    [topic]: topic,
  };
}

export function newCardDeckRelation(cardId, deckId) {
  return {
    id: uuidv4(),
    cardId,
    deckId,
  };
}

export function newCardTopicRelation(cardId, topicId) {
  return {
    id: uuidv4(),
    cardId,
    topicId,
  };
}

export function getCardsByTopic(cardTopics, cards, topicId) {
  return Object.entries(cardTopics.byId)
    .map(entry => entry[1])
    .filter(ct => ct.topicId === topicId)
    .map(ct => cards.byId[ct.cardId]);
}

export function getCardsByDeck(cardDecks, cards, deckId) {
  return Object.entries(cardDecks.byId)
    .map(entry => entry[1])
    .filter(cd => cd.deckId === deckId)
    .map(cd => cards.byId[cd.cardId]);
}

export function getDecksByCard(cardDecks, decks, cardId) {
  return Object.entries(cardDecks.byId)
    .map(entry => entry[1])
    .filter(cd => cd.cardId === cardId)
    .map(cd => decks.byId[cd.deckId]);
}

export function getTopicsByCard(cardTopics, topics, cardId) {
  return Object.entries(cardTopics.byId)
    .map(entry => entry[1])
    .filter(ct => ct.cardId === cardId)
    .map(ct => ({id: ct.topicId}));
}
