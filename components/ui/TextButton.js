import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function TextButton ({ children, onPress, style = {}, buttonStyle }) {

  const btnStyle = styles[buttonStyle]? styles[buttonStyle] : styles.buttonDefault;
  const textStyle = textStyles[buttonStyle]? textStyles[buttonStyle] : textStyles.buttonDefault;

  const styling = StyleSheet.flatten([btnStyle, style]);

  return (
    <TouchableOpacity onPress={onPress} style={styling}>
      <Text style={textStyle}>{children.toUpperCase()}</Text>
    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
    buttonDefault: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#02b3e4',
        backgroundColor: '#fff',
        paddingTop: 9,
        paddingRight: 12,
        paddingBottom: 9,
        paddingLeft: 12,
        alignSelf: 'center'
    },
    buttonPrimary: {
        borderRadius: 4,
        backgroundColor: '#02b3e4',
        paddingTop: 9,
        paddingRight: 12,
        paddingBottom: 9,
        paddingLeft: 12,
        alignSelf: 'center',
        shadowColor: '#ccc',
        shadowOpacity: 50,
        shadowOffset: {width: 2, height: 2},
    }
});

const textStyles = StyleSheet.create({
    buttonDefault: {
        color: "#02b3e4",

        fontSize: 18,
        textAlign: 'center',
    },
    buttonPrimary: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    }
});