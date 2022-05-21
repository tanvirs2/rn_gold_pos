/* eslint-disable */
import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default function CustomInput(props, {
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
        {...props}
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
    padding: 10,
  },

  input: {
    height: 35,
    padding: 10,
  },
});
