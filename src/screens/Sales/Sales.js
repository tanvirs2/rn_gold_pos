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
            <SalesEntryPage type="SalesEntry"/>
        </View>
    );
}

function WholeSales() {

    /*
* {
    "id": 0,
    "code": "I-637921314512826742",
    "shopId": null,
    "customerId": 63,
    "cname": null,
    "cmobile": null,
    "caddress": null,
    "totalAmount": 22.2,
    "vatAmount": 11,
    "paidAmount": 11,
    "dueAmount": 11.2,
    "typeId": null,
    "categoryId": 15102,
    "comment": "asdad",
    "approveBy": null,
    "productList": [
        {
            "productId": 76,
            "code": "637914134365123426",
            "name": "Ttttt",
            "description": "Dd",
            "isStock": true,
            "grade": "18k",
            "category": "Ring",
            "weight": 2,
            "price": "10",
            "ptotal": 20,
            "discountAmount": 0
        }
    ]
}*/

    return (
        <View>
            <SalesEntryPage type="WholeSales"/>
        </View>
    );
}

function Gift() {
    return (
        <View>
            <SalesEntryPage type="Gift"/>
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
