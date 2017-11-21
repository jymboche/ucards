import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FlipCard from 'react-native-flip-card';
import TextButton from './ui/TextButton';
import {Header} from './ui/Header';
import {buttonBackgroundGreen, buttonBackgroundRed, defaultStyles, headerColor, iconColorBlue} from '../styles/index';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

class QuizView extends React.Component {

    state = {
        finished: false,
        activeCard: 0,
        correct: 0,
        facingFront: true
    };

    render() {
        const {questions} = this.props;

        if (!questions.length) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Header title="You've not added any questions..."/>
                </View>
            );
        }

        let activeCard = questions[this.state.activeCard];
        let width = (this.state.activeCard + 1)/questions.length * 100;
        width = width + "%";

        return (
            <View style={defaultStyles.container}>

                <View style={styles.progress}>
                    <Text style={styles.progressText}>{this.state.activeCard + 1} of {questions.length}</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={ [styles.progressBar, {width}] } />
                    </View>
                </View>

                {this.state.finished &&
                    <View style={{flex: 1, padding: 15}}>

                        <Header title='Good Job Buddy!' style={{textAlign: 'center'}} />

                        <Text style={{textAlign: 'center', marginBottom: 20}}>
                            {this.state.correct} of {questions.length} correct ({ Math.round(this.state.correct/questions.length * 100) }%)
                        </Text>

                        <View style={styles.deckControls}>

                            <TextButton onPress={this.restart}>
                                START OVER
                            </TextButton>

                            <TextButton buttonStyle='buttonPrimary' onPress={() => this.props.navigation.goBack()}>
                                BACK TO DECK
                            </TextButton>
                        </View>


                    </View>

                }

                {!this.state.finished &&
                    <FlipCard
                        style={{borderWidth: 0, flex: 1, padding: 0}}
                        flip={!this.state.facingFront}
                        flipHorizontal={true}
                        flipVertical={false}
                        clickable={false}
                        useNativeDriver={true} >

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{activeCard.question}</Text>
                            <View style={styles.cardControls}>
                                <TouchableOpacity
                                    style={[styles.cardButton, {backgroundColor: iconColorBlue}]}
                                    onPress={() => this.setState({facingFront: !this.state.facingFront})}>
                                    <Text style={styles.cardButtonText}>FLIP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>{ !this.state.facingFront? activeCard.answer : " "}</Text>
                            <View style={styles.cardControls}>

                                <TouchableOpacity
                                    style={[styles.cardButton, {backgroundColor: buttonBackgroundRed}] }
                                    onPress={this.setIncorrect}>
                                    <Text style={styles.cardButtonText}>INCORRECT</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.cardButton, {backgroundColor: buttonBackgroundGreen}] }
                                    onPress={this.setCorrect}>
                                    <Text style={styles.cardButtonText}>CORRECT</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </FlipCard>
                }

            </View>
        )
    }

    setCorrect = () => {
        this.setCardResult(true);
    };

    setIncorrect = () => {
        this.setCardResult(false);
    };

    setCardResult = (answeredCorrectly) => {

        const correct = answeredCorrectly? this.state.correct + 1 : this.state.correct;

        if (this.state.activeCard >= (this.props.questions.length - 1)) {
            this.setState({
                correct,
                facingFront: true,
                finished: true
            });

            clearLocalNotification()
                .then(setLocalNotification());
        } else {
            this.setState({
                correct,
                facingFront: true,
                activeCard: this.state.activeCard + 1
            });
        }
    };

    restart = () => {
        this.setState({
            activeCard: 0,
            correct: 0,
            finished: false
        });
    }


}

function mapStateToProps(state) {
    return {
        questions: state.activeDeck.questions
    }
}

export default connect(mapStateToProps,null)(QuizView);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progress: {
        paddingLeft: 15,
        paddingRight: 15
    },
    progressText: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        color: '#999'
    },
    progressBarContainer: {
        backgroundColor: '#ccc',
        marginBottom: 10
    },
    progressBar: {
        height: 2,
        backgroundColor: iconColorBlue
    },
    card: {
        margin: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        shadowColor: '#ccc',
        shadowOpacity: 50,
        shadowOffset: {width: 2, height: 2},
    },
    cardTitle: {
        fontSize: 20,
        padding: 35,
        color: headerColor,
        textAlign: 'center'
    },
    cardControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cardButton: {
        flex: 1
    },
    cardButtonText: {
        padding: 15,
        textAlign: 'center',
        color: 'white'
    },
    deckControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    }
});