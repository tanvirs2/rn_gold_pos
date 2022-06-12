/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen} from '../../settings/ComponentLib';

const CustomerListScreen = () => {

    return (
        <Fragment>
            <CommonListScreen type="Expense" tableHead={['Expense Name', 'Amount', 'Comment', 'Date']}/>
        </Fragment>
    )
}


export default CustomerListScreen;
