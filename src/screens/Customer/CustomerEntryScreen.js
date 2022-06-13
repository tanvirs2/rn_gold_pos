/*eslint-disable*/

import React, {Fragment, useState} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';


const CustomerEntryScreen = () => {

    //const [stId, setId] = useState(0);
    const [stCustomerName, setCustomerName] = useState('');
    const [stMobile, setMobile] = useState('');
    const [stAddress, setAddress] = useState('');

    /*
    * {
  "id": 0,
  "mobile": "string",
  "name": "string",
  "address": "string",
  "isActive": true,
  "shopId": 1
}*/

    return (
        <Fragment>
            <CommonEntryScreen
                type="Customar"
                inputs={[
                    {
                        name: 'id',
                        dbName: 'id',
                        type: 'hide',
                        value: 0,
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
