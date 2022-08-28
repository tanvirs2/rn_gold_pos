/*eslint-disable*/
import React, {Fragment} from 'react';
import {CustomDataTable} from '../../settings/ComponentLib';


const ProductListScreen = () => {

  return (
    <Fragment>
        <CustomDataTable
            type="Product"
            searchPlaceholder="Product Name, Category..."
            tableHead={['Product', 'Category', 'B/P', 'Barcode', 'Status', 'Action']}
            tableDB={[
                'name|text',
                'categoryName|text',
                'buyingPrice|taka',
                'code|text',
                'isActive|status',
                'id|action'
            ]}
            modalData={[
                ['ID', ':', 'id|text'],
                ['Name', ':', 'name|text'],
                ['Barcode', ':', 'code|text'],
                ['Description', ':', 'description|text'],
                ['Status', ':', 'isActive|status'],
            ]}
            editRoute="Stock Edit"
        />
    </Fragment>
  );
};


export default ProductListScreen;
