import {
  attributesToDeck,
  attributesToCard,
  newCardDeckRelation,
} from '../helpers/entityHelper';

export const ADD_DECK = 'ADD_DECK';
export const EDIT_DECK = 'EDIT_DECK';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'; //TODO: need to distinguish adding an existing and adding a new card to deck

export function editDeck(deck){
  return {
    type: EDIT_DECK,
    payload: {
      deck,
    },
  };
}

export function addDeck(deckAttrs){
  return {
    type: ADD_DECK,
    payload: {
      deck: attributesToDeck(deckAttrs),
    },
  };
}

export function editCard(card){
  return {
    type: EDIT_CARD,
    payload: {
      card,
    },
  };
}

export function addCard(cardAttrs){
  return {
    type: ADD_CARD,
    payload: {
      card: attributesToCard(cardAttrs),
    },
  };
}

export function addCardToDeck(cardAttrs, deckId){
  const c = attributesToCard(cardAttrs);
  return {
    type: ADD_CARD_TO_DECK,
    payload: {
      card: c,
      relation: newCardDeckRelation(c.id, deckId),
    },
  };
}
