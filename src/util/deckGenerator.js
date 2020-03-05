function* deckGenerator(cards, shuffle = true) {
  let deck = [];
  const shuffleFunc = item => (Math.random() >= 0.5 ? 1 : -1);

  // build a 'deck' of index numbers for referencing
  while (deck.length < cards.length) {
    deck.push(deck.length);
  }

  // pseudorandom sort if shuffle argument is true
  deck = shuffle ? deck.sort(shuffleFunc) : deck;

  // yield items one by one upon request
  while (deck.length > 1) {
    yield cards[deck.pop()];
  }

  // return the last item, so that the calling function
  // can recieve {done: true} and reset the deck if needed
  return cards[deck[0]];
}

export default deckGenerator;
