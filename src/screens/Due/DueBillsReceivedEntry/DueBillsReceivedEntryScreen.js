/*eslint-disable*/

import React, {Fragment, useEffect, useState} from 'react';
import {customFetch} from '../../../settings/networking';
import {CommonEntryScreen} from '../../../settings/ComponentLib';
import {useFocusEffect} from '@react-navigation/native';
/*import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {DeuTransactionalEntryScreen} from '../../../settings/ScreenComponentLib';

const Tab = createMaterialTopTabNavigator();



const RetailEntryScreen = () => {

    return (
        <Fragment>
            <DeuTransactionalEntryScreen type="Retail"/>
        </Fragment>
    );
}

export const DueBillsReceivedEntryScreen = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Retail" component={RetailEntryScreen}/>
            <Tab.Screen name="Wholesale" component={WholesaleEntryScreen}/>
        </Tab.Navigator>
    );
}*/

const WholesaleEntryScreen = ({route}) => {

    let id = route.params?.id

    const [stId, setId] = useState(0);
    const [stCustomerName, setCustomerName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');
    const [date, setDate] = useState(new Date())

    const [stShopId, setShopId] = useState(1);
    const [stInvoicesArray, setInvoicesArray] = useState([]);

    const [stInvoiceId, setInvoiceId] = useState(0);
    const [stSelectedInvoice, setSelectedInvoice] = useState(false);

    useEffect(()=>{
        getInvoices();
    },[]);


    const getInvoices = () => {

        customFetch({
            url: 'DueBill/Get/0',
            callbackResult: (result) => {
                setInvoicesArray(result.invoiceCodes);
                //console.log(result);
            },
        });
    }

    useFocusEffect(() => {

        if (id) {
            customFetch({
                url: 'DueBill/Get/'+id,
                callbackResult: (result)=>{

                    //console.log(result.model.invoiceId, stInvoicesArray[6].name, stInvoicesArray.findIndex(elm=>elm.id === result.model.invoiceId))

                    /*console.log(result.model.invoiceId, stInvoicesArray.find((elm, index)=>{
                        if (elm.id === result.model.invoiceId) {
                            return index;
                        }
                    }))*/

                    const {
                        amount,
                        date,
                        description,
                        name,
                        invoiceId
                    } = result.model;


                    setId(id)
                    setCustomerName( name )
                    setAmount( String(amount) )
                    setDate( date )
                    setComment( description )
                    setInvoiceId( invoiceId )
                    setSelectedInvoice( stInvoicesArray.findIndex(elm=>elm.id === result.model.invoiceId) );
                }
            });
        }

        return () => {
            if (route.params) {
                route.params = undefined;
            }
        };
    });

    return (
        <Fragment>
            <CommonEntryScreen
                type="DueBill"
                inputs={[
                    {
                        name: 'id',
                        dbName: 'id',
                        type: 'hide',
                        value: stId,
                    },
                    {
                        name: 'isActive',
                        dbName: 'isActive',
                        type: 'hide',
                        value: true,
                    },
                    {
                        name: 'shopId',
                        dbName: 'shopId',
                        type: 'hide',
                        value: 1
                    },
                    {
                        name: 'Customer Name',
                        dbName: 'name',
                        type: 'text',
                        value: stCustomerName,
                        setValue: setCustomerName
                    },
                    {
                        name: 'Invoice Number',
                        selectOptions: stInvoicesArray,
                        selectedData: stSelectedInvoice,
                        dbName: 'invoiceId',
                        type: 'select',
                        value: stInvoiceId,
                        setValue: setInvoiceId
                    },
                    {
                        name: 'Amount',
                        dbName: 'amount',
                        type: 'numeric',
                        value: stAmount,
                        setValue: setAmount
                    },
                    {
                        name: 'Date',
                        dbName: 'date',
                        type: 'date',
                        value: date,
                        setValue: setDate
                    },
                    {
                        name: 'Comment',
                        dbName: 'description',
                        type: 'comment',
                        value: stComment,
                        setValue: setComment
                    },
                ]}
                afterSaveInputs={()=>{
                    setId(0);
                }}
            />
        </Fragment>

    );
}

export default WholesaleEntryScreen;
