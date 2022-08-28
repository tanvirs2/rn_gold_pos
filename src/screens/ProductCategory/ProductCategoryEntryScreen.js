/*eslint-disable*/

import React, {Fragment, useState} from 'react';
import {customFetch} from '../../settings/networking';
import {CommonEntryScreen} from '../../settings/ComponentLib';
import {useFocusEffect} from '@react-navigation/native';


const ProductCategoryEntryScreen = ({route}) => {

    let id = route.params?.id

    const [stId, setId] = useState(0);
    const [stCategoryName, setCategoryName] = useState('');

    useFocusEffect(() => {

            if (id) {
                customFetch({
                    url: 'ProductCategory/Get/'+id,
                    callbackResult: (result)=>{

                        const {name} = result.model;

                        setId(id)
                        setCategoryName( name )
                    }
                });
            }

            return () => {
                if (route.params) {
                    route.params = undefined;
                }
            };
        });

    return (
        <Fragment>
            <CommonEntryScreen
                type="ProductCategory"
                inputs={[
                    {
                        name: 'id',
                        dbName: 'id',
                        type: 'hide',
                        value: stId,
                    },
                    {
                        name: 'Category Name',
                        dbName: 'name',
                        type: 'text',
                        value: stCategoryName,
                        setValue: setCategoryName
                    }
                ]}
                afterSaveInputs={()=>{
                    setId(0);
                }}
            />
        </Fragment>
    );
}


export default ProductCategoryEntryScreen;
