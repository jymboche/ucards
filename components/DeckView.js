import React from 'react';
import {StyleSheet, View} from 'react-native';
import {defaultBorderColor, defaultStyles} from '../styles/index';
import {connect} from 'react-redux';
import {getSingleDeck} from '../actions/index';
import {Header} from './ui/Header';
import TextButton from './ui/TextButton';

class DeckView extends React.Component {

    componentDidMount() {
        if (this.props.navigation.state.params) {
            this.props.getSingleDeck(this.props.navigation.state.params.deck.id);
        }
    }

    render() {

        let deck = this.props.activeDeck;
        if (!deck) {
            return <View/>;
        }

        return (
            <View style={defaultStyles.container}>
                <Header size='large' title={deck.title} style={{textAlign: 'center'}} />

                <Header title={`${deck.questions.length} cards`} style={{textAlign: 'center'}} />

                <View style={styles.buttonContainer}>
                    <TextButton
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('QuestionForm', {deck}) }>
                        Add Card
                    </TextButton>

                    <TextButton
                        buttonStyle='buttonPrimary'
                        style={styles.button}
                        onPress={ () => this.props.navigation.navigate('QuizView', {deckId: deck.id}) }>
                        Start Quiz
                    </TextButton>
                </View>

            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        activeDeck: state.activeDeck
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSingleDeck: (deckId) => dispatch(getSingleDeck(deckId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 20
    },
    button: {
        alignSelf: 'stretch',
        marginTop: 5
    },
    deckTitle: {
        fontSize: 40,
        padding: 10,
        textAlign: 'center',
        fontWeight: "500"
    },
    deckLength: {
        textAlign: 'center',
        fontSize: 15,
    },
    summary: {
        fontSize: 13
    },
    hr: {
        marginLeft: 50,
        height: 1,
        borderBottomWidth: 1,
        borderColor: defaultBorderColor
    }
});