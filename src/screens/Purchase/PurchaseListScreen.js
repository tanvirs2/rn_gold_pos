/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen} from '../../settings/ComponentLib';

const PurchaseListScreen = () => {

    return (
        <Fragment>
            <CommonListScreen
                type="Purchase"
                tableHead={['category', 'Amount', 'type']}
                tableDB={[
                    'category|text',
                    'amount|taka',
                    'type|text'
                ]}
            />
        </Fragment>
    )
}


export default PurchaseListScreen;
