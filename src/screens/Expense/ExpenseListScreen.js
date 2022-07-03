/*eslint-disable*/

import React, {Fragment} from 'react';
import {CustomDataTable, TransactionalListScreen} from '../../settings/ComponentLib';

const ExpenseListScreen = () => {

    return (
        <Fragment>
            <CustomDataTable
                type="Expense"
                searchPlaceholder="Expense Name..."
                tableHead={['Expense Name', 'Amount', 'Comment', 'Date', 'Action']}
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
                editRoute="Expense Entry"
            />
        </Fragment>
    )
}


export default ExpenseListScreen;
