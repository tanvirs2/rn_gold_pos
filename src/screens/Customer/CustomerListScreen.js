/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen, CustomDataTable} from '../../settings/ComponentLib';

const CustomerListScreen = () => {

    return (
        <Fragment>

            <CustomDataTable
                type="Customar"
                tableHead={['Customer Name', 'Is Active', 'Action']}
                tableDB={[
                    'name|text',
                    'isActive|status',
                    'id|action'
                ]}
                searchPlaceholder="Customer Name..."
            />
        </Fragment>
    )
}


export default CustomerListScreen;
