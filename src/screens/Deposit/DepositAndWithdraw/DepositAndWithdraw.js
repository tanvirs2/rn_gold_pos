/*eslint-disable*/

import React, {Fragment} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TransactionalListScreen} from '../../../settings/ScreenComponentLib';
//import {TransactionalListScreen} from '../../../settings/ComponentLib';

const Tab = createMaterialTopTabNavigator();


const DepositListScreen = () => {

    return (
        <Fragment>
            <TransactionalListScreen type="Deposit" tableHead={
                ['Deposit Name', 'Amount', 'Comment', 'Date', 'Action']
            }/>
        </Fragment>
    );
}

const WithdrawListScreen = () => {


    return (
        <Fragment>
            <TransactionalListScreen type="Withdraw" tableHead={
                ['Withdraw Name', 'Amount', 'Comment', 'Date', 'Action']
            }/>
        </Fragment>
    );
}

const DepositAndWithdraw = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Deposit List" component={DepositListScreen}/>
            <Tab.Screen name="Withdraw List" component={WithdrawListScreen}/>
        </Tab.Navigator>
    );
};



export default DepositAndWithdraw;
