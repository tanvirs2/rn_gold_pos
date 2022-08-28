/*eslint-disable*/

import React, {Fragment, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl, customFetch} from '../../../settings/networking';
import loginToken from '../../../settings/loginToken';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import SelectDropdown from 'react-native-select-dropdown';

import {CommonEntryScreen, LocalInput, LocalSelect} from '../../../settings/ComponentLib';
import moment from 'moment';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import {taka} from '../../../assets/symbols';
import {showMessage} from 'react-native-flash-message';


const ProductEntryScreen = ({route}) => {

    let id = route.params?.id

    const navigation = useNavigation();
    const isFocused = useIsFocused();

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
    const [st_SelectedGrade, set_SelectedGrade] = useState('');
    const [st_SelectedCategory, set_SelectedCategory] = useState('');
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
        //alert('a')
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

    },[isFocused, stRefreshing])

    useEffect(() => {

            //alert('b')

            if (id) {
                customFetch({
                    url: 'Product/Get/'+id,
                    callbackResult: (result)=>{


                        //console.log(result.model)

                        /*console.log(result.model.invoiceId, stInvoicesArray.find((elm, index)=>{
                            if (elm.id === result.model.invoiceId) {
                                return index;
                            }
                        }))*/

                        /*
                        {
                        "name": "Wweee",
                        "buyingPrice": 4444,
                        "sellingPrice": 411,
                        "weight": 7
                        "grade": "21k",
                        "categoryId": 47,
                        "isStock": true,
                        "isActive": true,
                        "category": null,
                        "description": "Weettt",

                        "code": "P-637926987899012620",
                        "gradeId": 14802,
                        "id": 128,
                        "typeId": null,
                        }*/

                        /*

                        [{"id": 14801, "isDefault": false, "name": "18k", "valueOne": null, "valueThree": null, "valueTwo": null}, {"id": 14802, "isDefault": false, "name": "21k", "valueOne": null, "valueThree": null, "valueTwo": null}, {"id": 14803, "isDefault": false, "name": "22k", "valueOne": null, "valueThree": null, "valueTwo": null}, {"id": 14804, "isDefault": false, "name": "Diamond", "valueOne": null, "valueThree": null, "valueTwo": null}]

                        * */

                        /*
                        name
                        buyingPrice
                        sellingPrice
                        weight
                        gradeId
                        grade
                        categoryId
                        category
                        isStock
                        isActive
                        description*/

                        const {
                            name,
                            buyingPrice,
                            sellingPrice,
                            weight,
                            grade,
                            categoryId,
                            isStock,
                            isActive,
                            description
                        } = result.model;

                        /*stProductDependency
                        -grades
                        -categories
                        -status
                        -stock*/

                        /*console.log(
                            result.model,
                            stProductDependency.categories[2].name,
                            categoryId,
                            stProductDependency.categories.findIndex(elm=>elm.id === categoryId)
                        )*/

                        set_SelectedGrade(stProductDependency.grades.findIndex(elm=>elm.name === grade))
                        set_SelectedCategory(stProductDependency.categories.findIndex(elm=>elm.id === categoryId))

                        set_name( name )
                        set_buyingPrice( String(buyingPrice) )
                        set_sellingPrice( String(sellingPrice) )
                        set_weight( String(weight) )
                        set_grade( grade )
                        set_category( categoryId )
                        set_isStock( isStock )
                        set_isActive( isActive )
                        set_description( description )
                        //setSelectedInvoice( stInvoicesArray.findIndex(elm=>elm.id === result.model.invoiceId) );
                    }
                });
            }

            return () => {
                if (route.params) {
                    route.params = undefined;
                }
            };
        }, [stProductDependency]);

    const insertData = async () => {

        /*console.log(
        'st_gradeId: ', st_gradeId,
        'st_grade: ', st_grade,
        'st_categoryId: ', st_categoryId,
        'st_category: ', st_category
    )
        return 0;*/

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
            <CommonEntryScreen
                type="Product"
                inputs={[
                    {
                        name: 'id',
                        dbName: 'id',
                        type: 'hide',
                        value: st_id,
                    },
                    {
                        name: 'isActive',
                        dbName: 'isActive',
                        type: 'hide',
                        value: true,
                    },
                    {
                        name: 'shopId',
                        dbName: 'shopId',
                        type: 'hide',
                        value: 1
                    },
                    {
                        name: 'Product’s Name',
                        dbName: 'name',
                        type: 'text',
                        value: st_name,
                        setValue: set_name
                    },

                    {
                        name: 'Buying Price',
                        dbName: 'buyingPrice',
                        type: 'numeric',
                        value: st_buyingPrice,
                        setValue: set_buyingPrice
                    },
                    {
                        name: 'Selling Price',
                        dbName: 'sellingPrice',
                        type: 'numeric',
                        value: st_sellingPrice,
                        setValue: set_sellingPrice
                    },
                    {
                        name: 'Weight (gm)',
                        dbName: 'weight',
                        type: 'numeric',
                        value: st_weight,
                        setValue: set_weight
                    },

                    {
                        name: 'Karat',
                        selectOptions: stProductDependency.grades,
                        selectedData: st_SelectedGrade,
                        dbName: 'grade',
                        type: 'select',
                        value: st_grade,
                        setValue: set_grade
                    },{
                        name: 'Category',
                        selectOptions: stProductDependency.categories,
                        selectedData: st_SelectedCategory,
                        dbName: 'category',
                        type: 'select',
                        value: st_category,
                        setValue: set_category
                    },{
                        name: 'In Stock',
                        selectOptions: stProductDependency.stock,
                        selectedData: false,
                        dbName: 'isStock',
                        type: 'select',
                        value: st_isStock,
                        setValue: set_isStock
                    },{
                        name: 'Status',
                        selectOptions: stProductDependency.status,
                        selectedData: false,
                        dbName: 'isActive',
                        type: 'select',
                        value: st_isActive,
                        setValue: set_isActive
                    },
                    {
                        name: 'Description',
                        dbName: 'description',
                        type: 'comment',
                        value: st_description,
                        setValue: set_description
                    },
                ]}
                afterSaveInputs={()=>{
                    set_id(0);
                    resetInputs();
                }}
            />
        </Fragment>
    );
}

export default ProductEntryScreen;
