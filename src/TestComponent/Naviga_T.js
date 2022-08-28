/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    View
} from 'react-native';


import RNPrint from 'react-native-print';

export default class RNPrintExample extends Component {
    state = {
        selectedPrinter: null
    }

    async printHTML() {
        await RNPrint.print({
            html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.printHTML} title="Print HTML" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});


