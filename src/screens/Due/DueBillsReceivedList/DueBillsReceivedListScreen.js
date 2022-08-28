/*eslint-disable*/

import React, {Fragment} from 'react';
import {CustomDataTable} from '../../../settings/ComponentLib';
/*import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DueTransactionalListScreen} from '../../../settings/ScreenComponentLib';

const Tab = createMaterialTopTabNavigator();


const RetailListScreen = () => {

    return (
        <Fragment>
            <DueTransactionalListScreen type="Retail" tableHead={
                ['Name', 'Date', 'Category', 'Amount', 'Comment', 'Action']
            }/>
        </Fragment>
    );
}



export const DueBillsReceivedListScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Retail List" component={RetailListScreen}/>
            <Tab.Screen name="Wholesale List" component={WholesaleListScreen}/>
        </Tab.Navigator>
    );
};*/

const WholesaleListScreen = () => {


    return (
        <Fragment>
            <CustomDataTable
                type="DueBill"
                searchPlaceholder="Due Bill Name..."
                tableHead={['Name', 'Date', 'Category', 'Amount', 'Comment']}
                tableDB={[
                    'name|text',
                    'date|date',
                    'amount|taka',
                    'description|text',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['Name', ':', 'name|text'],
                    ['Amount', ':', 'amount|taka'],
                    ['Date', ':', 'date|date'],
                    ['Comment', ':', 'comment|text'],
                ]}
                editRoute="Due Receive Edit"
            />
        </Fragment>

    );
}


export default WholesaleListScreen;
