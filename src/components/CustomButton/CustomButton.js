import React from 'react';
import {StyleSheet, Text, View, Pressable, TouchableOpacity} from 'react-native';

export default function CustomButton({
  onPress,
  text,
  type = 'primary',
  bgColor,
  fgColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_primary: {
    backgroundColor: '#2245ff',
  },
  container_border: {
    borderWidth: 1,
  },
  container_tertiary: {},
  text_tertiary: {
    color: 'gray',
  },
  text_border: {
    color: '#000',
  },
  text: {
    fontWeight: 'bold',

    color: '#ffffff',
  },
});
