import React from 'react';
import {connect} from 'react-redux';
import {Button, FlatList, Text, TouchableOpacity, View, Alert} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons'
import {deleteAllData, fetchAllData} from '../actions/index';
import DeckListItem from './DeckListItem';
import {defaultStyles, iconColorBlue} from '../styles/index';
import TextButton from './ui/TextButton';

class DeckList extends React.Component {

    static navigationOptions = ({ navigation}) => ({
        title: "Decks",
        headerRight: (
            <TouchableOpacity onPress={() => {navigation.navigate("DeckForm")}}>
                <Feather name="plus-circle" size={25} style={{paddingRight: 7}} color={iconColorBlue} />
            </TouchableOpacity>
        )
    });



    componentDidMount() {
        this.props.fetchDecks();
    }

    render() {
        if (!this.props.decks || !Object.keys(this.props.decks).length) {
            return (
                <View style={defaultStyles.container}>
                    <TextButton
                        style={{marginTop: 40}}
                        onPress={ () => this.props.navigation.navigate("DeckForm") }>
                        Add a Deck
                    </TextButton>
                </View>

            )
        }

        const decks = Object.keys(this.props.decks).map(key => {
            return {...this.props.decks[key], key};
        });

        return (
            <View style={defaultStyles.container}>
                <FlatList
                    data={decks}
                    renderItem={ ({item}) => <DeckListItem deck={item} navigation={this.props.navigation} />}
                    />
                <Button
                    style={{alignSelf: 'flex-end'}}
                    onPress={this.onPressReset}
                    title="DELETE ALL DATA" />
            </View>
        )
    }

    onPressReset = () => {
        Alert.alert(
            'Are you sure?',
            'This will delete all data',
            [
                {
                    text: 'Cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.props.resetData()
                }
            ],
            {
                cancelable: true
            });
    }
}

function mapStateToProps(state = {}) {
    return {
        decks: state.decks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDecks: () => dispatch(fetchAllData()),
        resetData: () => dispatch(deleteAllData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);