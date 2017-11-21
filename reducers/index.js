import {ADD_DECK, RECEIVE_DATA, RESET_DATA, ADD_CARD, GET_SINGLE_DECK} from '../actions';
import {AsyncStorage} from 'react-native';

const saveAllData = async (state) => {
    try {
        await AsyncStorage.setItem('udacicards', JSON.stringify(state));
    } catch (error) {
        console.log('AsyncStorage save error: ' + error.message);
    }
};

const defaultState = {
    decks: {},
    activeDeck: false
};

const decks = (state = defaultState, action) => {

    let newState, deck;
    console.log(action);
    console.log(state);

    switch (action.type) {
        case ADD_DECK:
            deck = {...action.deck, questions: []};
            newState = {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deck.id]: deck
                },
                activeDeck: deck
            };
            saveAllData(newState);
            return newState;
        case RECEIVE_DATA:
            return action.data? action.data : defaultState;
        case RESET_DATA:
            return defaultState;
        case GET_SINGLE_DECK:
            return {
                ...state,
                activeDeck: state.decks[action.deckId]
            };
        case ADD_CARD:
            deck = state.decks[action.deckId];
            deck.questions.push(action.card);
            newState = {
                ...state,
                decks: {...state.decks, [action.deckId]: deck},
                activeDeck: {...deck}
            };
            saveAllData(newState);
            return newState;
        default:
            return state;
    }
};

export default decks;