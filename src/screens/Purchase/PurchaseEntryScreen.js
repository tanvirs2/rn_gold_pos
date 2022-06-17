import React, {Fragment, useState} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';

const PurchaseEntryScreen = () => {

    const [stCustomerName, setCustomerName] = useState('');
    const [stMobile, setMobile] = useState('');
    const [stAddress, setAddress] = useState('');

    return (
        <Fragment>
            <CommonEntryScreen
                type="Purchase"
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

export default PurchaseEntryScreen;
