/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TransactionalEntryScreen} from '../../../settings/ComponentLib';

const Tab = createMaterialTopTabNavigator();



const DepositEntryScreen = () => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Deposit"/>
        </Fragment>
    );
}

const WithdrawEntryScreen = () => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Withdraw"/>
        </Fragment>
    );
}

const DepositAndWithdrawEntry = () => {



    return (
        <Tab.Navigator>
            <Tab.Screen name="Deposit Entry" component={DepositEntryScreen}/>
            <Tab.Screen name="Withdraw Entry" component={WithdrawEntryScreen}/>
        </Tab.Navigator>
    );
}

export default DepositAndWithdrawEntry;
