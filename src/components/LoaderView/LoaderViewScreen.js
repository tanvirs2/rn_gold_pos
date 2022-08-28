import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoaderViewScreen = ({viewThisComp}) => {
  return (
      viewThisComp && <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(196,196,196,0.72)',
        zIndex: 1,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
};

export default LoaderViewScreen;
