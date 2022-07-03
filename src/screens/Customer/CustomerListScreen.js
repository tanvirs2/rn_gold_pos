import React, {Fragment} from 'react';
import {CustomDataTable} from '../../settings/ComponentLib';

const CustomerListScreen = () => {

    return (
        <Fragment>

            <CustomDataTable
                type="Customar"
                tableHead={['Customer Name', 'Status', 'Action']}
                searchPlaceholder="Customer Name..."
                tableDB={[
                    'name|text',
                    'isActive|status',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['Name', ':', 'name|text'],
                    ['Mobile', ':', 'mobile|text'],
                    ['Address', ':', 'address|text'],
                    ['Status', ':', 'isActive|status'],
                ]}
                editRoute="Customer Edit"
            />

        </Fragment>
    )
}


export default CustomerListScreen;
