/* eslint-disable */
import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-reanimated'
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SalesEntryPage from './SubPages/SalesEntry';



const Tab = createMaterialTopTabNavigator();



function SalesEntry() {
    return (
        <View>
            <SalesEntryPage/>
        </View>
    );
}

function WholeSales() {
    return (
        <View>
            <SalesEntryPage/>
        </View>
    );
}

function Gift() {
    return (
        <View>
            <SalesEntryPage/>
        </View>
    );
}

const Sales = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Sales Entry" component={SalesEntry}/>
            <Tab.Screen name="Whole Sales" component={WholeSales}/>
            <Tab.Screen name="Gift" component={Gift}/>
        </Tab.Navigator>
    );
};


export default Sales;
