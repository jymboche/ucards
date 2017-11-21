import {AsyncStorage} from 'react-native';

export const ADD_DECK = 'ADD_DECK';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const RESET_DATA = 'RESET_DATA';
export const ADD_CARD = 'ADD_CARD';
export const GET_SINGLE_DECK = 'GET_SINGLE_DECK';

export const addDeck = (deck) => {
    return {
        type: ADD_DECK,
        deck
    }
};

export const receiveData = (data) => {
    return {
        type: RECEIVE_DATA,
        data: data
    }
};

export const addCard = (deckId, card) => {
    return {
        type: ADD_CARD,
        deckId,
        card
    };
};

export const getSingleDeck = (deckId) => {
    return {
        type: GET_SINGLE_DECK,
        deckId: deckId
    }
}

export const fetchAllData = () => dispatch =>
    AsyncStorage.getItem('udacicards')
            .then( (data) => {
                return dispatch(receiveData(JSON.parse(data)))
            } );


export const deleteAllData = () => dispatch => {
    return AsyncStorage.removeItem('udacicards')
        .then(() => dispatch(receiveData({})));
};