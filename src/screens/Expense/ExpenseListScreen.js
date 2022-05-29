/*eslint-disable*/

import React, {Fragment} from 'react';
import {TransactionalListScreen} from '../../settings/ComponentLib';

const ExpenseListScreen = () => {

    return (
        <Fragment>
            <TransactionalListScreen type="Expense" tableHead={['Expense Name', 'Amount', 'Comment', 'Date']}/>
        </Fragment>
    )
}


export default ExpenseListScreen;
