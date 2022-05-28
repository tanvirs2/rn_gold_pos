/* eslint-disable */
import * as React from 'react';
import 'react-native-reanimated'
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ListOfSales from './ListOfSales'



const Tab = createMaterialTopTabNavigator();



function SalesEntry() {
    return (
        <View>
            <ListOfSales/>
        </View>
    );
}

function WholeSales() {
    return (
        <View>
            <ListOfSales/>
        </View>
    );
}

function Gift() {
    return (
        <View>
            <ListOfSales/>
        </View>
    );
}

const TabListOfSales = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Sales Entry" component={SalesEntry}/>
            <Tab.Screen name="Whole Sales" component={WholeSales}/>
            <Tab.Screen name="Gift" component={Gift}/>
        </Tab.Navigator>
    );
};


export default TabListOfSales;
