import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PurchaseEntryScreen from './PurchaseEntryScreen';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const NewGold = () => {
    return (
        <View>
            <PurchaseEntryScreen/>
        </View>
    );
}

const OldGold = () => {
    return (
        <View>
            <PurchaseEntryScreen/>
        </View>
    );
}

const PurchaseEntryTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="New Gold Entry" component={NewGold}/>
            <Tab.Screen name="Old Gold Entry" component={OldGold}/>
        </Tab.Navigator>
    );
}

export default PurchaseEntryTab;
