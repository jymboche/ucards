### TODO:

When Decks Components mounts:
- dispatch the event fetchDecks()
- which fetches from AsyncStorage
- which then dispatches receiveDecks()
- at which point the reducer returns it from the state

Adding a Deck:
- disptatch addDeck(deckTitle)