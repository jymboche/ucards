import React from 'react';
import {StatusBar, View} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DeckForm from './components/DeckForm';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import QuestionForm from './components/QuestionForm';
import QuizView from './components/QuizView';
import {navbarBackgroundColor} from './styles/index';
import {setLocalNotification} from './utils/helpers';

const store = configureStore();

const MainNavigator = StackNavigator({
    Home: {
        screen: DeckList,
    },
    DeckForm: {
        screen: DeckForm
    },
    DeckView: {
        screen: DeckView
    },
    QuestionForm: {
        screen: QuestionForm
    },
    QuizView: {
        screen: QuizView
    }
}, {
    headerMode: "screen",
    navigationOptions: {
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: navbarBackgroundColor,
            shadowColor: '#000',
            shadowOpacity: 50,
            shadowOffset: {width: 2, height: 0},
            shadowRadius: 4,
        }
    }
});


export default class App extends React.Component {

    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <StatusBar barStyle='light-content' />
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}