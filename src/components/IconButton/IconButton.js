/*eslint-disable*/
import {Pressable, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as React from 'react';

const IconButton = (props, {name='information-circle-outline'}) => {
    return (
        <View style={{flex: 1}}>
            <Pressable style={styles.barcodeIcon} onPress={() => {}}>
                <Ionicons
                    name={name}
                    size={30}
                    {...props}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    barcodeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d5b337',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        height: 50,
    },
})

export default IconButton;
