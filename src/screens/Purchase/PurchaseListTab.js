import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View} from 'react-native';
import PurchaseListScreen from './PurchaseListScreen';

const Tab = createMaterialTopTabNavigator();

const NewGold = () => {
    return (
        <View>
            <PurchaseListScreen type="newGold"/>
        </View>
    );
}

const OldGold = () => {
    return (
        <View>
            <PurchaseListScreen type="oldGold"/>
        </View>
    );
}

const PurchaseListTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="New Gold List" component={NewGold}/>
            <Tab.Screen name="Old Gold List" component={OldGold}/>
        </Tab.Navigator>
    );
}

export default NewGold;
