import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {defaultStyles, red} from '../styles/index';
import {connect} from 'react-redux';
import {addCard} from '../actions/index';
import TextButton from './ui/TextButton';

class QuestionForm extends React.Component {

    state = {
        question: "",
        answer: "",
        errorQuestion: false,
        errorAnswer: false
    };

    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Add Card"
    });

    onQuestionChange = (text) => {
        this.setState({question: text, errorQuestion: !text.length});
    };

    onAnswerChange = (text) => {
        this.setState({answer: text, errorAnswer: !text.length})
    };

    render() {
        return (
            <View style={[defaultStyles.container, {padding: 15}]}>
                <TextInput
                    placeholder='Question'
                    style={styles.textInput}
                    onChangeText={this.onQuestionChange}/>

                {this.state.errorQuestion &&
                    <Text style={styles.error}>please enter a question</Text>
                }

                <TextInput
                    placeholder='Answer'
                    style={styles.textInput}
                    onChangeText={this.onAnswerChange}/>

                {this.state.errorAnswer &&
                    <Text style={styles.error}>please enter an answer</Text>
                }

                <TextButton onPress={this.saveEntry} style={{alignSelf: 'stretch', marginTop: 10}}>
                    Save
                </TextButton>

            </View>
        )
    }

    saveEntry = () => {

        let question = this.state.question.trim();
        let answer = this.state.answer.trim();
        if (!question.length || !answer.length) {
            this.setState({
                errorAnswer: !answer.length,
                errorQuestion: !question.length
            });
            return;
        }

        const deckId = this.props.navigation.state.params.deck.id;

        this.props.addCard(deckId, {question, answer});
        this.props.navigation.goBack();
    }

}



const styles = StyleSheet.create({
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginTop: 10
    },
    error: {
        fontSize: 13,
        color: red
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addCard: (deckId, card) => dispatch(addCard(deckId, card))
    };
}

export default connect(null, mapDispatchToProps)(QuestionForm);