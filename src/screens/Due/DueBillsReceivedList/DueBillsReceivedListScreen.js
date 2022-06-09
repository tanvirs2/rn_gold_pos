/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DueTransactionalListScreen} from '../../../settings/ComponentLib';

const Tab = createMaterialTopTabNavigator();


const RetailListScreen = () => {

    return (
        <Fragment>
            <DueTransactionalListScreen type="Retail" tableHead={
                ['Name', 'Date', 'Category', 'Amount', 'Comment']
            }/>
        </Fragment>
    );
}

const WholesaleListScreen = () => {


    return (
        <Fragment>
            <DueTransactionalListScreen type="Wholesale" tableHead={
                ['Name', 'Date', 'Category', 'Amount', 'Comment']
            }/>
        </Fragment>
    );
}

const DueBillsReceivedListScreen = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Retail List" component={RetailListScreen}/>
            <Tab.Screen name="Wholesale List" component={WholesaleListScreen}/>
        </Tab.Navigator>
    );
};



export default DueBillsReceivedListScreen;
