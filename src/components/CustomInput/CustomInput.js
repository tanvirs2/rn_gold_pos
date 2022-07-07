/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {dynamicGlobalTextColor} from '../../settings/color';

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  multiline,
  numberOfLines,
  inputStyle
}) {
  return (
    <View style={[styles.container, inputStyle]}>
      {multiline ? <TextInput
          placeholderTextColor="#646464FF"
          placeholder={placeholder}
          value={value}
          onChangeText={setValue}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
      /> : <TextInput
          placeholderTextColor="#646464FF"
              placeholder={placeholder}
              value={value}
              onChangeText={setValue}
              style={[styles.input]}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              numberOfLines={numberOfLines}
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',

    borderColor: '#b9a3a3',
    borderWidth: 1,
    borderRadius: 5,

    marginVertical: 5,
    padding: 9,
  },

  input: {
    height: 35,
    padding: 8,
    color: '#000'
  },
});
