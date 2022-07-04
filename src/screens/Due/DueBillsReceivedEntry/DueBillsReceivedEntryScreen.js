/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DeuTransactionalEntryScreen} from '../../../settings/ScreenComponentLib';
//import {DeuTransactionalEntryScreen} from '../../../settings/ComponentLib';

const Tab = createMaterialTopTabNavigator();



const RetailEntryScreen = () => {

    return (
        <Fragment>
            <DeuTransactionalEntryScreen type="Retail"/>
        </Fragment>
    );
}

const WholesaleEntryScreen = () => {

    return (
        <Fragment>
            <DeuTransactionalEntryScreen type="Wholesale"/>
        </Fragment>
    );
}

const DueBillsReceivedEntryScreen = () => {



    return (
        <Tab.Navigator>
            <Tab.Screen name="Retail" component={RetailEntryScreen}/>
            <Tab.Screen name="Wholesale" component={WholesaleEntryScreen}/>
        </Tab.Navigator>
    );
}

export default DueBillsReceivedEntryScreen;
