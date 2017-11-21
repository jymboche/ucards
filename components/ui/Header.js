import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {headerColor} from '../../styles/index';

export const Header = ({title, size, style}) => {

    const headerStyle = size? styles[size] : styles.defaultSize;

    return (
        <Text style={[headerStyle, {...style, color: headerColor}]}>{title}</Text>
    )
};

const styles = StyleSheet.create({
    defaultSize: {
        fontSize: 20,
        padding: 5
    },
    large: {
        fontSize: 40,
        padding: 14
    }
});