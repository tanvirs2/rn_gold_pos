import React, {Fragment, useEffect, useState} from 'react';
import {CommonEntryScreen} from '../../settings/ComponentLib';
import {customFetch} from '../../settings/networking';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, TextInput, Vibration, View} from 'react-native';
import {Rows, Table} from 'react-native-table-component';
import CustomButton from '../../components/CustomButton';
import {globalBackgroundColor, globalButtonColor} from '../../settings/color';

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


{
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
                                selectOptions: stProductDependency.categories,
                                name: 'category',
                                dbName: 'mobile',
                                value: stPr_category,
                                setValue: setPr_category,
                            },
                            {
                                type: 'select',
                                selectOptions: stProductDependency.grades,
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
                        name: 'Add Product',
                        dbName: 'arrrrrrrr',
                        value: stProductsArr,
                        setValue: setProductsArr,
                    },
*/


    /*
    * {
  "id": 0,
  "cname": "Mahtabjj",
  "cmobile": "01911223",
  "caddress": "Gulshan",
  "totalAmount": 500,
  "vatAmount": 100,
  "paidAmount": 600,
  "dueAmount": 50,
  "categoryId": 15002,
  "productList": [
    {
      "id": 0,
      "name": "test",
      "description": "test",
      "category": 4,
      "grade": 14803,
      "weight": 5

    }
  ]
}*/
    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);
    const [stRefreshing, setRefreshing] = useState(false);
    const [stCustomerName, setCustomerName] = useState('');
    const [stMobile, setMobile] = useState('');
    const [stAddress, setAddress] = useState('');


    const [stPr_name, setPr_name] = useState('');
    const [stPr_description, setPr_description] = useState('');
    const [stPr_category, setPr_category] = useState('');
    const [stPr_grade, setPr_grade] = useState('');
    const [stPr_weight, setPr_weight] = useState('');
    const [stPr_price, setPr_price] = useState('');


    const [stProductsArr, setProductsArr] = useState([]);
    const [stTable, setTable] = useState([]);

    const [stProductDependency, setProductDependency] = useState({
        grades:[],
        categories: [],
        types: [],
        status: [],
        stock: [],
    });


    const resetPrInputs = () => {
        setPr_name('')
        setPr_description('')
        setPr_category('')
        setPr_grade('')
        setPr_weight('')
        setPr_price('')
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

    return (
        <Fragment>
            <ScrollView>
                <CommonEntryScreen
                    type="Purchase"
                    defaultBtn={false}
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
                        }

                    ]}
                />


                <View style={{borderWidth:1, borderColor:globalBackgroundColor, backgroundColor:'#fdf8ed'}}>
                    <CommonEntryScreen
                        type="Purchase"
                        btnName="Add"
                        btnPress={()=>{

                            Vibration.vibrate(10);

                            resetPrInputs()

                            const currentState = {
                                name: stPr_name,
                                grade: stPr_description,
                                category: stPr_category,
                                weight: stPr_grade,
                                description: stPr_weight,
                                price: stPr_price,
                            };

                            setTable(prevState => [...prevState, {
                                table: [
                                    ['Product’s Name',  ':', stPr_name],
                                    ['Comment',         ':', stPr_description],
                                    ['Karat',           ':', stPr_category],
                                    ['category',        ':', stPr_grade],
                                    ['Weight',          ':', stPr_weight],
                                    ['Price',           ':', stPr_price],
                                    ['Barcode',         ':', 'result.code'],
                                ]
                            }]);

                            console.log(stTable)

                            /*console.log(
                                stPr_name,
                                stPr_description,
                                stPr_category,
                                stPr_grade,
                                stPr_weight,
                                stPr_price,
                            )*/
                        }}
                        inputs={[
                            {
                                type: 'hide',
                                name: 'id',
                                dbName: 'id',
                                value: 0,
                            },
                            {
                                type: 'text',
                                name: 'Product’s Name',
                                dbName: 'name',
                                value: stPr_name,
                                setValue: setPr_name,
                            },
                            {
                                type: 'select',
                                selectOptions: stProductDependency.grades,
                                name: 'Karat',
                                dbName: 'grade',
                                value: stPr_grade,
                                setValue: setPr_grade,
                            },
                            {
                                type: 'select',
                                selectOptions: stProductDependency.categories,
                                name: 'Category',
                                dbName: 'category',
                                value: stPr_category,
                                setValue: setPr_category,
                            }, {
                                type: 'numeric',
                                name: 'Weight (gm)',
                                dbName: 'weight',
                                value: stPr_weight,
                                setValue: setPr_weight,
                            },
                            {
                                type: 'numeric',
                                name: 'Price (p/g)',
                                dbName: 'price',
                                value: stPr_price,
                                setValue: setPr_price,
                            },
                            {
                                type: 'comment',
                                name: 'Description',
                                dbName: 'description',
                                value: stPr_description,
                                setValue: setPr_description,
                            }

                        ]}
                    />
                </View>


                <View style={{margin:30}}>

                    <View style={{}}>

                        <View style={{marginBottom: 10}}>

                            <Table>
                                <Rows data={[
                                    ['Sub Total',  ':', '1000'],
                                    ['VAT (15%)',         ':', '750'],
                                    ['Total Amount',           ':', '1750'],
                                    ['Payable Amount',        ':', '1750'],
                                    ['Due Amount',          ':', '0'],
                                ]} />
                            </Table>

                        </View>

                    </View>
                </View>

                <View style={[styles.container, {backgroundColor: '#fdf2e6'}]}>

                    <Text style={styles.fontBold}>Product Detail</Text>

                    {
                        stTable.map((elm, index) => (
                            <View key={index} style={styles.productDetailsBorder}>
                                <View style={{width: '100%', backgroundColor:globalBackgroundColor, padding:5, paddingLeft:15, borderRadius:5}}>
                                    <Text style={{color: '#000', fontWeight:'bold', fontSize:17}}>Item {index+1}</Text>
                                </View>
                                <View style={{marginBottom: 20}}>
                                    <Table>
                                        <Rows data={elm.table} textStyle={styles.text}/>
                                    </Table>

                                </View>

                            </View>
                        ))
                    }

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1, margin:10}}>
                            <CustomButton
                                text="Reset"
                                bgColor="#9f4c5b"
                                onPress={() => {
                                    Vibration.vibrate(100);

                                    setCustomerName('')
                                    setMobile('')
                                    setAddress('')
                                    setTable([])
                                    resetPrInputs()
                                }}
                            />
                        </View>


                        {stTable.length > 0 && <View style={{flex: 1, margin: 10}}>
                            <CustomButton
                                text="Save"
                                bgColor={globalButtonColor}
                                onPress={() => {
                                    Vibration.vibrate(1000);
                                    /*setConfirmModalVisible(true);*/
                                }}
                            />
                        </View>}
                    </View>

                </View>
            </ScrollView>

        </Fragment>
    );
}

export default PurchaseEntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        marginBottom: 3,
    },
    barcodeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalButtonColor,
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        height: 50,
    },

    barcodeInput: {
        width: '100%',
        marginRight: 20,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderColor: '#777',
        backgroundColor: '#ffffff',
        height: 50,
        padding: 10,
    },

    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: globalButtonColor,
        padding: 10,
        borderColor: '#777777',
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        marginLeft: 0,
        height: 50,
    },

    productDetailsBorder: {borderWidth: 1, borderRadius: 5, borderColor: '#676666', padding: 15, marginBottom: 10, backgroundColor: '#fff'},
    flexRow: {flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 10},
    fontBold: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
    text: {margin: 6},






    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        borderRadius: 3,
        borderWidth: 5,
        borderColor: globalBackgroundColor,
        backgroundColor: "white",
        margin: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.01,
        shadowRadius: 10,
        elevation: 50
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    rnholeView: {
        width: 500,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },


    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 8,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
