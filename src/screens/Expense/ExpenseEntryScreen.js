/*eslint-disable*/

import React, {Fragment, useState} from 'react';
import {CommonEntryScreen, TransactionalEntryScreen} from '../../settings/ComponentLib';
import {useFocusEffect} from '@react-navigation/native';
import {customFetch} from '../../settings/networking';


const ExpenseEntryScreen = ({route}) => {

    let id = route.params?.id

    const [stId, setId] = useState(0);

    const [stExpenseName, setExpenseName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [date, setDate] = useState(new Date())
    const [stComment, setComment] = useState('');

    useFocusEffect(() => {

            if (id) {
                customFetch({
                    url: 'Expense/Get/'+id,
                    callbackResult: (result)=>{

                        const {
                            amount,
                            date,
                            description,
                            name
                        } = result.model;


                        setId(id)
                        setExpenseName( name )
                        setAmount( String(amount) )
                        setDate( date )
                        setComment( description )
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
                type="Expense"
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
                        name: 'Expense Name',
                        dbName: 'name',
                        type: 'text',
                        value: stExpenseName,
                        setValue: setExpenseName
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


export default ExpenseEntryScreen;
