import {
  attributesToDeck,
  attributesToCard,
  attributesToTopic,
  newCardDeckRelation,
  newCardTopicRelation,
} from '../helpers/entityHelper';

export const CREATE_CARD = 'CREATE_CARD';
export const CREATE_CARD_RELATE_TO_DECK = 'CREATE_CARD_RELATE_TO_DECK';
export const CREATE_DECK = 'CREATE_DECK';
export const CREATE_TOPIC = 'CREATE_TOPIC';
export const CREATE_TOPIC_RELATE_TO_CARD = 'CREATE_TOPIC_RELATE_TO_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_TOPIC = 'DELETE__TOPIC';
export const RELATE_CARD_TO_DECK = 'RELATE_CARD_TO_DECK';
export const RELATE_CARD_TO_TOPIC = 'RELATE_CARD_TO_TOPIC';
export const UPDATE_CARD = 'UPDATE_CARD';
export const UPDATE_DECK = 'UPDATE_DECK';

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
export function relateTopicToCard(cardId, topicId){
  return {
    type: RELATE_CARD_TO_TOPIC,
    payload: {
      relation: newCardTopicRelation(cardId, topicId),
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
