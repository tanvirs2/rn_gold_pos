/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={[styles.input]}
        secureTextEntry={secureTextEntry}
      />
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
  },
});
