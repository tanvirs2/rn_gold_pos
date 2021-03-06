import React, {Fragment, useEffect, useState} from 'react';
import {customFetch} from './networking';
import {CommonEntryScreen, CustomDataTable} from './ComponentLib';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';


export const TransactionalEntryScreen = ({type, id, name}) => {

    const isFocus = useIsFocused();


    const [stCustomerName, setCustomerName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');
    const [stId, setId] = useState(id);

    const [date, setDate] = useState(new Date())

    useFocusEffect(
        React.useCallback(() => {

            if (id && name === type) {
                customFetch({
                    url: type+'/Get/'+id,
                    callbackResult: (result)=>{

                        //console.log(type + '/Get/' + id, result);

                        const {
                            amount,
                            date,
                            comment,
                            name
                        } = result.model;


                        setId(id)
                        setCustomerName( name )
                        setAmount( String(amount) )
                        setDate( date )
                        setComment( comment )
                    }
                });
            }

            return ()=>{
                setCustomerName('');
                setAmount('');
                setComment('');
                setId(0);

                setDate(new Date());
            }


        }, [isFocus])
    );



    return (
        <Fragment>
            <CommonEntryScreen
                type={type}
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
                        name: type+' Name',
                        dbName: 'name',
                        type: 'text',
                        value: stCustomerName,
                        setValue: setCustomerName
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
                        dbName: 'comment',
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


export const TransactionalListScreen = ({type, tableHead}) => {

    return (
        <Fragment>
            <CustomDataTable
                type={type}
                searchPlaceholder={`${type} Name...`}
                tableHead={tableHead}
                tableDB={[
                    'name|text',
                    'amount|taka',
                    'description|text',
                    'date|date',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['Name', ':', 'name|text'],
                    ['Amount', ':', 'amount|taka'],
                    ['Date', ':', 'date|date'],
                ]}
                editRoute={{name: type, main: 'Deposit & Withdraw Edit', child: `${type} Entry`}}
            />
        </Fragment>
    );
}


