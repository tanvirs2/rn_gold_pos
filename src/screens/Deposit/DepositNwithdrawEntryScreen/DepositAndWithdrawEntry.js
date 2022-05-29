/*eslint-disable*/

import React, {Fragment, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {apiUrl, customFetch} from '../../../settings/networking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalButtonColor} from '../../../settings/color';
import {TransactionalEntryScreen} from '../../../settings/ComponentLib';
import {taka} from '../../../assets/symbols';

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
