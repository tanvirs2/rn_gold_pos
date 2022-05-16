import React from 'react';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SampleScreen() {
  return (
    <View>
      <Ionicons name="md-volume-mute" size={30} color="#4F8EF7" />
      <Text>Hello</Text>
    </View>
  );
}
