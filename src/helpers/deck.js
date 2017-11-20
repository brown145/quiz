// TODO: include lib to make ids - ex: uuid.v4()

export default {
  attributesToDeck: deckAttrs => ({
    id: 'sadfasdf', //TODO: generate unique ids
    name: deckAttrs.name || '',
    description: deckAttrs.description || '',
    created: deckAttrs.created || new Date().getTime(),
    lastViewed: deckAttrs.lastViewed || new Date().getTime(),
    cards: deckAttrs.cards || [],
  })
}
