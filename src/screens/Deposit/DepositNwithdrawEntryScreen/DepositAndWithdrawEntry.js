/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TransactionalEntryScreen} from '../../../settings/ComponentLib';
import {useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();



const DepositEntryScreen = ({id}) => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Deposit" id={id}/>
        </Fragment>
    );
}

const WithdrawEntryScreen = ({id}) => {

    return (
        <Fragment>
            <TransactionalEntryScreen type="Withdraw" id={id}/>
        </Fragment>
    );
}

const DepositAndWithdrawEntry = ({route}) => {

    let id = route.params?.id

    return (
        <Tab.Navigator>

            <Tab.Screen name="Deposit Entry">
                {props => <DepositEntryScreen {...props} id={id ? id: 0}/>}
            </Tab.Screen>

            <Tab.Screen name="Withdraw Entry">
                {props => <WithdrawEntryScreen {...props} id={id ? id: 0}/>}
            </Tab.Screen>

        </Tab.Navigator>
    );
}

export default DepositAndWithdrawEntry;
