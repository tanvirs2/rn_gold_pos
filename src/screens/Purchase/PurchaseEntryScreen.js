import React, {Fragment, useEffect, useState} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';
import {customFetch} from '../../settings/networking';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native';

const PurchaseEntryScreen = ({type}) => {

    /*{
  "id": 0,
  "code": "string",
  "cname": "string",
  "cmobile": "string",
  "caddress": "string",
  "totalAmount": 10,
  "vatAmount": 10,
  "paidAmount": 10,
  "dueAmount": 10,
  "categoryId": 15101,
  "typeId": 14902,
  "approveBy": "string",
  "productList": [
    {
      "id": 0,
      "productId": 28,
      "name": "string",
      "description": "string",
      "isStock": true,
      "grade": 14803,
      "category": 1,
      "weight": 10,
      "price": 10,
      "ptotal": 10,
      "discountAmount": 10
    }
  ]
}
*/
    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);
    const [stRefreshing, setRefreshing] = useState(false);
    const [stCustomerName, setCustomerName] = useState('');
    const [stMobile, setMobile] = useState('');


    const [stPr_name, setPr_name] = useState('');
    const [stPr_description, setPr_description] = useState('');
    const [stPr_category, setPr_category] = useState('');
    const [stPr_grade, setPr_grade] = useState('');
    const [stPr_weight, setPr_weight] = useState('');


    const [stProductsArr, setProductsArr] = useState([]);
    const [stProductsArrData, setProductsArrData] = useState([{
        name: '',
        description: '',
        category: '',
        grade: '',
        weigh: ''
    }]);

    const [stAddress, setAddress] = useState('');
    const [stProductDependency, setProductDependency] = useState({
        grades:[],
        categories: [],
        types: [],
        status: [],
        stock: [],
    });

    useEffect(()=>{
        setLoader(true);

        customFetch({
            url: 'Product/Get/0',
            method: 'GET',
            callbackResult: (result)=>{

                const { grades, categories, types} = result;

                setProductDependency({
                    grades,
                    categories,
                    types,
                    status: [
                        {id: 1, name: 'Yes'},
                        {id: 2, name: 'No'},
                    ],
                    stock: [
                        {id: 1, name: 'Yes'},
                        {id: 2, name: 'No'},
                    ],
                })

                setRefreshing(false);
                setLoader(false);
            },
            navigation
        });

    },[stRefreshing])

    return (
        <Fragment>

            {
                stProductsArrData.map((val, key)=>(
                    <TextInput key={key}
                        value={val.name}
                       onChangeText={(inpData)=>{
                           let list = [...stProductsArrData];
                           list[key]['name'] = inpData;
                           setProductsArrData(list);
                       }}
                    />
                ))
            }

            <CommonEntryScreen
                type="Purchase"
                inputs={[
                    {
                        type: 'hide',
                        name: 'id',
                        dbName: 'id',
                        value: 0,
                    },
                    {
                        type: 'hide',
                        name: 'isActive',
                        dbName: 'isActive',
                        value: true,
                    },
                    {
                        type: 'hide',
                        name: 'shopId',
                        dbName: 'shopId',
                        value: 1,
                    },
                    {
                        type: 'text',
                        name: 'Seller’s Name',
                        dbName: 'name',
                        value: stCustomerName,
                        setValue: setCustomerName,
                    },
                    {
                        type: 'numeric',
                        name: 'Mobile Number',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    },
                    {
                        type: 'comment',
                        name: 'Address',
                        dbName: 'address',
                        value: stAddress,
                        setValue: setAddress,
                    },
                    {
                        type: 'numeric',
                        name: 'Product’s Name',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'select',
                        selectOptions: stProductDependency.grades,
                        name: 'Karat',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'select',
                        selectOptions: stProductDependency.categories,
                        name: 'Category',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'numeric',
                        name: 'Weight (gm)',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'numeric',
                        name: 'Price (p/g)',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'numeric',
                        name: 'Buying Price',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'numeric',
                        name: 'Selling Price',
                        dbName: 'mobile',
                        value: stMobile,
                        setValue: setMobile,
                    }, {
                        type: 'array',
                        arrayAbstraction: [
                            {
                                type: 'hide',
                                name: 'id',
                                dbName: 'mobile',
                                value: 0,
                                setValue: () => {
                                },
                            },
                            {
                                type: 'text',
                                name: 'name',
                                dbName: 'mobile',
                                value: stPr_name,
                                setValue: setPr_name,
                            },
                            {
                                type: 'comment',
                                name: 'description',
                                dbName: 'mobile',
                                value: stPr_description,
                                setValue: setPr_description,
                            },
                            {
                                type: 'select',
                                name: 'category',
                                dbName: 'mobile',
                                value: stPr_category,
                                setValue: setPr_category,
                            },
                            {
                                type: 'select',
                                name: 'grade',
                                dbName: 'mobile',
                                value: stPr_grade,
                                setValue: setPr_grade,
                            },
                            {
                                type: 'numeric',
                                name: 'weight',
                                dbName: 'mobile',
                                value: stPr_weight,
                                setValue: setPr_weight,
                            },
                        ],
                        name: 'productList',
                        dbName: 'mobile',
                        value: stProductsArr,
                        setValue: setProductsArr,
                    },
                ]}
            />
        </Fragment>
    );
}

export default PurchaseEntryScreen;
