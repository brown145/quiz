import {
  attributesToDeck,
  attributesToCard,
  newCardDeckRelation,
} from '../helpers/entityHelper';

export const CREATE_DECK = 'CREATE_DECK';
export const UPDATE_DECK = 'UPDATE_DECK';
export const CREATE_CARD = 'CREATE_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const CREATE_CARD_ADD_TO_DECK = 'CREATE_CARD_ADD_TO_DECK';

export function updateDeck(deck){
  return {
    type: UPDATE_DECK,
    payload: {
      deck,
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

export function updateCard(card){
  return {
    type: UPDATE_CARD,
    payload: {
      card,
    },
  };
}

export function createCard(cardAttrs){
  return {
    type: CREATE_CARD,
    payload: {
      card: attributesToCard(cardAttrs),
    },
  };
}

export function createCardForDeck(cardAttrs, deckId){
  const c = attributesToCard(cardAttrs);
  return {
    type: CREATE_CARD_ADD_TO_DECK,
    payload: {
      card: c,
      relation: newCardDeckRelation(c.id, deckId),
    },
  };
}
