/*eslint-disable*/
import React, {useReducer} from 'react';
import {Button, LogBox, StyleSheet, Text, View} from 'react-native';
import Navigation from './src/navigation';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen';
import Naviga_T from './src/TestComponent/Naviga_T';
//import SampleScreen from './src/screens/SampleScreen/SampleScreen';
import loaderContext from './src/contexts/loaderContext';

const initState = false;
const reducer = (state, action) => {
  switch (action) {
    case 'loaded':
      return false;
    case 'loading':
      return true;
    default:
      return state;
  }
}

export default function App() {
  /*const [loaded] = useFonts({
      MulishRegular: require('./assets/fonts/Mulish-Regular.ttf'),
  });*/
  LogBox.ignoreLogs([
      'Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`',
      'Ended a touch event which was not counted in `trackedTouchCount`'
  ])

  const [loaderState, loaderDispatchMethod] = useReducer(reducer, initState);

  //console.log('cccccccc',loaderState);

  return (
      <loaderContext.Provider value={{loaderDispatch: loaderDispatchMethod, loader: loaderState}}>

        <Navigation />

      </loaderContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    /*backgroundColor: "#ffffff"*/
  },
});
