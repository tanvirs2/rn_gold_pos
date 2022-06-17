/*eslint-disable*/

import React, {Fragment} from 'react';
import {CommonListScreen} from '../../settings/ComponentLib';

const CustomerListScreen = () => {

    return (
        <Fragment>
            <CommonListScreen
                type="Customar"
                tableHead={['Customer Name', 'Is Active']}
                tableDB={[
                    'name|text',
                    'isActive|text'
                ]}
            />
        </Fragment>
    )
}


export default CustomerListScreen;
