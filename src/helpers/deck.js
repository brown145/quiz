const uuidv4 = require('uuid/v4');

export default {
  attributesToDeck: deckAttrs => ({
    id: uuidv4(),
    name: deckAttrs.name || '',
    description: deckAttrs.description || '',
    created: deckAttrs.created || new Date().getTime(),
    lastViewed: deckAttrs.lastViewed || new Date().getTime(),
    cards: deckAttrs.cards || [],
  })
}
