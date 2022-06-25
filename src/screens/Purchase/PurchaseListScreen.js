/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen, CustomDataTable} from '../../settings/ComponentLib';

const PurchaseListScreen = () => {

    return (
        <Fragment>

            <CustomDataTable
                type="Purchase"
                tableHead={['category', 'Amount', 'type']}
                tableDB={[
                    'category|text',
                    'amount|taka',
                    'type|text'
                ]}
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
