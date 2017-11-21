import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {defaultBorderColor, white} from '../styles/index';

export default class DeckListItem extends React.Component {

    render() {

        const {deck} = this.props;

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('DeckView', {deck}) }>
                <View style={styles.container}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.summary}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.hr} />
            </TouchableOpacity>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        backgroundColor: white,
        padding: 7,
        justifyContent: 'center'
    },
    deckTitle: {
        fontSize: 15,
        fontWeight: "500"
    },
    summary: {
        fontSize: 13
    },
    hr: {
        height: 1,
        borderBottomWidth: 1,
        borderColor: defaultBorderColor
    }
});