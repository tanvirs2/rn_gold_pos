import {Text, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import React from 'react';

export const LocalInput = ({inputProps}) => {

    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{inputProps.placeholder}</Text>

            <CustomInput {...inputProps} />
        </View>
    );
}

