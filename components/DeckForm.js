import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {defaultStyles, red} from '../styles/index';
import {addDeck} from '../actions/index';
import {connect} from 'react-redux';
import TextButton from './ui/TextButton';
import uuidv4 from 'uuid/v4';
import { NavigationActions } from 'react-navigation'


class DeckForm extends React.Component {

    state = {
        deckName: "",
        error: false
    };

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Add Deck"
    });

    handleTitleChange = (text) => {
        this.setState({deckName: text, error: !text.trim().length});
    };

    render() {
        return (
            <View style={[defaultStyles.container, {padding: 20}] }>
                <TextInput
                    placeholder='Deck Name'
                    style={styles.textInput}
                    onChangeText={this.handleTitleChange}/>
                {this.state.error &&
                    <Text style={styles.error}>please enter a title</Text>
                }
                <TextButton onPress={this.saveEntry} style={{marginTop: 10, alignSelf: 'stretch'}}>
                    Save
                </TextButton>
            </View>
        )
    }

    saveEntry = () => {
        const title = this.state.deckName.trim();
        if (!title.length) {
            this.setState({error: true});
            return;
        }

        const deck = {
            id: uuidv4(),
            title
        };

        this.props.addDeck(deck);

        /* we dont want the DeckForm in navigation history */
        this.props.navigation.dispatch( NavigationActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: "Home"}),
                NavigationActions.navigate({ routeName: 'DeckView'})
            ]
        }));
    }

}



const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    error: {
        fontSize: 13,
        color: red
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addDeck: deckTitle => dispatch(addDeck(deckTitle))
    };
}

export default connect(null, mapDispatchToProps)(DeckForm);