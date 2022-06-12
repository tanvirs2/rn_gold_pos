/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';


const CustomerEntryScreen = () => {

    return (
        <Fragment>
            <CommonEntryScreen
                type="Expense"
                inputs={[
                    {
                        name: 'Customer',
                        type: 'text',
                    },
                    {
                        name: 'Date',
                        type: 'date',
                    },{
                        name: 'Description',
                        type: 'comment',
                    }
                ]}
            />
        </Fragment>
    );
}


export default CustomerEntryScreen;
