/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen} from '../../settings/ComponentLib';

const PurchaseListScreen = () => {

    return (
        <Fragment>
            <CommonListScreen
                type="Purchase"
                tableHead={['category', 'type']}
                tableDB={[
                    'category|text',
                    'type|text'
                ]}
            />
        </Fragment>
    )
}


export default PurchaseListScreen;
