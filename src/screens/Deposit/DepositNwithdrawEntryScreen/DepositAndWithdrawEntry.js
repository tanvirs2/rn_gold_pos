/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TransactionalEntryScreen} from '../../../settings/ComponentLib';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();



const DepositEntryScreen = ({id, name}) => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Deposit" id={id} name={name}/>
        </Fragment>
    );
}

const WithdrawEntryScreen = ({id, name}) => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Withdraw" id={id} name={name}/>
        </Fragment>
    );
}

const DepositAndWithdrawEntry = ({route}) => {

    let id = route.params ? route.params.id : 0;
    let name = route.params ? route.params.name : '';

    return (
        <Tab.Navigator>

            <Tab.Screen name="Deposit Entry">
                {props => <DepositEntryScreen {...props} id={id} name={name}/>}
            </Tab.Screen>

            <Tab.Screen name="Withdraw Entry">
                {props => <WithdrawEntryScreen {...props} id={id} name={name}/>}
            </Tab.Screen>

        </Tab.Navigator>
    );
}

export default DepositAndWithdrawEntry;
