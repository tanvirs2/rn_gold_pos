/*eslint-disable*/
import React, {Fragment} from 'react';
import {CustomDataTable} from '../../../settings/ComponentLib';



const ListOfSales = () => {


    return (
        <Fragment>
            <CustomDataTable
                type="Sale"
                searchPlaceholder="Sale Name, Category..."
                tableHead={['Category', 'Amount', 'Invoice No.', 'Action']}
                tableDB={[
                    'category|text',
                    'amount|taka',
                    'code|text',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['Name', ':', 'name|text'],
                    ['Amount', ':', 'totalAmount|taka'],
                    ['Date', ':', 'date|date'],
                ]}
            />
        </Fragment>
    );
}


export default ListOfSales;
