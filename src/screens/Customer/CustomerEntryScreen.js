/*eslint-disable*/

import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {customFetch} from '../../settings/networking';


const CustomerEntryScreen = ({route}) => {

    let id = route.params?.id

    const [stId, setId] = useState(0);
    const [stCustomerName, setCustomerName] = useState('');
    const [stMobile, setMobile] = useState('');
    const [stAddress, setAddress] = useState('');

    useFocusEffect(() => {

            if (id) {
                customFetch({
                    url: 'Customar/Get/'+id,
                    callbackResult: (result)=>{

                        const {address, mobile, name} = result.model;

                        setId(id)
                        setAddress( address )
                        setMobile( mobile )
                        setCustomerName( name )
                    }
                });

            }

            return () => {
                if (route.params) {
                    route.params = undefined;
                }
            };
        }
    );



    return (
        <Fragment>
            <CommonEntryScreen
                type="Customar"
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
                        name: 'Mobile',
                        dbName: 'mobile',
                        type: 'numeric',
                        value: stMobile,
                        setValue: setMobile
                    },
                    {
                        name: 'Address',
                        dbName: 'address',
                        type: 'comment',
                        value: stAddress,
                        setValue: setAddress
                    }
                ]}
            />
        </Fragment>
    );
}


export default CustomerEntryScreen;
