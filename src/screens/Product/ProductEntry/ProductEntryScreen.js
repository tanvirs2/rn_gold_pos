/*eslint-disable*/

import React, {Fragment, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl, customFetch} from '../../../settings/networking';
import loginToken from '../../../settings/loginToken';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import SelectDropdown from 'react-native-select-dropdown';

import {LocalInput, LocalSelect} from '../../../settings/ComponentLib';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {taka} from '../../../assets/symbols';
import {showMessage} from 'react-native-flash-message';


const ProductEntryScreen = () => {

    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);
    const [stRefreshing, setRefreshing] = useState(false);

    const [stProductDependency, setProductDependency] = useState({
        grades:[],
        categories: [],
        types: [],
        status: [],
        stock: [],
    });


    const [stProductName, setProductName] = useState('');

    const [st_id, set_id] = useState(0);
    const [st_typeId, set_typeId] = useState(0);
    //const [st_code, set_code] = useState('Auto');

    const [st_name, set_name] = useState('');
    const [st_buyingPrice, set_buyingPrice] = useState('');
    const [st_sellingPrice, set_sellingPrice] = useState('');
    const [st_weight, set_weight] = useState('');
    const [st_gradeId, set_gradeId] = useState(0);
    const [st_grade, set_grade] = useState('');
    const [st_categoryId, set_categoryId] = useState(0);
    const [st_category, set_category] = useState('');
    const [st_isStock, set_isStock] = useState('');
    const [st_isActive, set_isActive] = useState('');
    const [st_description, set_description] = useState('');

    const resetInputs = () => {
        set_name('');
        set_buyingPrice('');
        set_sellingPrice('');
        set_weight('');
        set_grade('');
        set_category('');
        set_isStock('');
        set_isActive('');
        set_description('');
        setProductDependency({
            grades:[],
            categories: [],
            types: [],
            status: [],
            stock: [],
        });

        setRefreshing(prevState => !prevState);
    }

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


    const insertData = async () => {

        setLoader(true);

        customFetch({
            url: `Product/Upsert`,
            method: 'POST',
            body: {
                "id": st_id,                        //0,
                "typeId": st_typeId,                //0,
                //"code": "123456",                 // should be unique

                "name": st_name,                    // "string",
                "buyingPrice": st_buyingPrice,      // 0,
                "sellingPrice": st_sellingPrice,    // 0,
                "weight": st_weight,                // 0,
                "gradeId": st_gradeId,              // 0,
                "grade": st_grade,                  // "string",
                "categoryId": st_categoryId,        // 0,
                "category": st_category,            // "string",
                "isStock": st_isStock !== 'No',              // true,
                "isActive": st_isActive !== 'No',            // true,
                "description": st_description,      // "string"
            },
            callbackResult: (result)=>{
                setLoader(false);
                showMessage({
                    message: "Successfully save data",
                    type: "success",
                });
                resetInputs();
                //console.log(result);
            },
            navigation
        });

    }

    return (
        <Fragment>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=>{
                            setRefreshing(prevState => !prevState);
                        }}
                    />
                }
            >

            <View style={{padding:20}}>


                <LocalInput inputProps={
                    {
                        value: st_name,
                        setValue: set_name,
                        placeholder: 'Product’s Name',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: st_buyingPrice,
                        setValue: set_buyingPrice,
                        placeholder: 'Buying Price',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: st_sellingPrice,
                        setValue: set_sellingPrice,
                        placeholder: 'Selling Price',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: st_weight,
                        setValue: set_weight,
                        placeholder: 'Weight (gm)',
                    }
                }/>


                <LocalSelect
                    data={stProductDependency.grades}
                    selectProps={{
                        value: st_grade,
                        setValue: set_grade,
                        placeholder: 'Karat',
                    }}
                />

                <LocalSelect
                    data={stProductDependency.categories}
                    selectProps={{
                        value: st_category,
                        setValue: set_category,
                        placeholder: 'Category',
                    }}
                />


                <LocalSelect
                    data={stProductDependency.stock}
                    selectProps={{
                        value: st_isStock,
                        setValue: set_isStock,
                        placeholder: 'In Stock',
                    }
                }/>

                <LocalSelect
                    data={stProductDependency.status}
                    selectProps={{
                        value: st_isActive,
                        setValue: set_isActive,
                        placeholder: 'Status',
                    }
                }/>

                <LocalSelect
                    data={stProductDependency.types}
                    selectProps={{
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'TAX Effect',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: st_description,
                        setValue: set_description,
                        placeholder: 'Description',
                    }
                }/>


                {/*Button*/}


                <View style={{marginTop:30}}>

                    <CustomButton
                        text="Save"
                        bgColor="gold"
                        onPress={insertData}
                    />

                </View>

            </View>
        </ScrollView>
        </Fragment>

    );
}

export default ProductEntryScreen;
