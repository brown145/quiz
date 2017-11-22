const uuidv4 = require('uuid/v4');

export default {
  newCard: cardAttribures => ({
    id: uuidv4(),
    question: cardAttribures.question || '',
    answer: cardAttribures.answer || '',
    topics: cardAttribures.topics || [],
  })
}
