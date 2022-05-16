import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigationDrawer';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Naviga_T from './src/TestComponent/Naviga_T';
//import SampleScreen from './src/screens/SampleScreen/SampleScreen';

export default function App() {
  /*const [loaded] = useFonts({
      MulishRegular: require('./assets/fonts/Mulish-Regular.ttf'),
  });*/

  return (
      <Navigation />
  );
}

const styles = StyleSheet.create({
  root: {
    /*backgroundColor: "#ffffff"*/
  },
});
