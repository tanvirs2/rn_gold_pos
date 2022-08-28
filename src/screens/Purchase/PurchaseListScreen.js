/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen, CustomDataTable} from '../../settings/ComponentLib';

const PurchaseListScreen = () => {

    return (
        <Fragment>

            <CustomDataTable
                type="Purchase"
                tableHead={['category', 'Amount', 'Type', 'Action']}
                tableDB={[
                    'category|text',
                    'amount|taka',
                    'type|centerText',
                    'id|action'
                ]}
                modalData={
                    [
                        ['Category',  ':', 'categoryId|text'],
                        ['Amount',  ':', 'paidAmount|taka'],
                    ]
                }
                searchPlaceholder="Seller name, Category name..."
            />


            {/*<CommonListScreen
                type="Purchase"
                tableHead={['category', 'Amount', 'type']}
                tableDB={[
                    'category|text',
                    'amount|taka',
                    'type|text'
                ]}
            />*/}
        </Fragment>
    )
}


export default PurchaseListScreen;
