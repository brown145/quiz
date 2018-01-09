import {
  attributesToDeck,
  attributesToCard,
  attributesToTopic,
  newCardDeckRelation,
  newCardTopicRelation,
} from 'helpers/entityHelper';

export const CREATE_CARD = 'CREATE_CARD';
export const CREATE_CARD_RELATE_TO_DECK = 'CREATE_CARD_RELATE_TO_DECK';
export const CREATE_DECK = 'CREATE_DECK';
export const CREATE_TOPIC = 'CREATE_TOPIC';
export const CREATE_TOPIC_RELATE_TO_CARD = 'CREATE_TOPIC_RELATE_TO_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_CARD_TO_DECK_RELATION = 'DELETE_CARD_TO_DECK_RELATION';
export const DELETE_CARD_TO_TOPIC_RELATION = 'DELETE_CARD_TO_TOPIC_RELATION';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_TOPIC = 'DELETE__TOPIC';
export const RELATE_CARD_TO_DECK = 'RELATE_CARD_TO_DECK';
export const RELATE_CARD_TO_TOPIC = 'RELATE_CARD_TO_TOPIC';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_DECK = 'UPDATE_DECK';
export const QUIZ_CREATE = 'QUIZ_CREATE';
export const QUIZ_UPDATE_QUESTION = 'QUIZ_UPDATE_QUESTION';
export const QUIZ_UPDATE_COMPLETE = 'QUIZ_UPDATE_COMPLETE';

export function createCard(cardAttrs){
  return {
    type: CREATE_CARD,
    payload: {
      card: attributesToCard(cardAttrs),
    },
  };
}
export function createDeck(deckAttrs){
  return {
    type: CREATE_DECK,
    payload: {
      deck: attributesToDeck(deckAttrs),
    },
  };
}
export function createCardForDeck(cardAttrs, deckId){
  // TODO: multi-step action maybe should be broken down into two actions with Promise?
  const c = attributesToCard(cardAttrs);
  return {
    type: CREATE_CARD_RELATE_TO_DECK,
    payload: {
      card: c,
      relation: newCardDeckRelation(c.id, deckId),
    },
  };
}
export function createTopic(topicAttrs){
  return {
    type: CREATE_TOPIC,
    payload: {
      topic: attributesToTopic(topicAttrs),
    },
  };
}
export function deleteCard(cardId){
  return {
    type: DELETE_CARD,
    payload: {
      cardId,
    },
  };
}
export function deleteDeck(deckId){
  return {
    type: DELETE_DECK,
    payload: {
      deckId,
    },
  };
}
export function deleteTopic(topicId){
  return {
    type: DELETE_TOPIC,
    payload: {
      topicId,
    },
  };
}
export function relateCardToDeck(cardId, deckId){
  return {
    type: RELATE_CARD_TO_DECK,
    payload: {
      relation: newCardDeckRelation(cardId, deckId),
    },
  };
}
export function relateTopicToCard(topicId, cardId){
  return {
    type: RELATE_CARD_TO_TOPIC,
    payload: {
      relation: newCardTopicRelation(cardId, topicId),
    },
  };
}
export function unRelateCardToDeck(cardId, deckId){
  return {
    type: DELETE_CARD_TO_DECK_RELATION,
    payload: {
      cardId,
      deckId,
    },
  };
}
export function unRelateTopicToCard(topicId, cardId){
  return {
    type: DELETE_CARD_TO_TOPIC_RELATION,
    payload: {
      cardId,
      topicId,
    },
  };
}
export function updateCard(card){
  return {
    type: UPDATE_CARD,
    payload: {
      card,
    },
  };
}
export function updateDeck(deck){
  return {
    type: UPDATE_DECK,
    payload: {
      deck,
    },
  };
}
export function createDeckQuiz(quiz){
  return {
    type: QUIZ_CREATE,
    payload: {
      quiz,
    },
  };
}
export function updateDeckQuizQuestion(quizId, cardId, isCorrect){
  return {
    type: QUIZ_UPDATE_QUESTION,
    payload: {
      quizId,
      cardId,
      isCorrect,
    },
  };
}
export function updateDeckQuizComplete(quizId, isComplete, ended){
  return {
    type: QUIZ_UPDATE_COMPLETE,
    payload: {
      quizId,
      isComplete,
      ended,
    },
  };
}
