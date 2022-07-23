import React, {Fragment, useEffect, useState} from 'react';
import {CommonEntryScreen, TransactionalInput} from '../../settings/ComponentLib';
import {customFetch} from '../../settings/networking';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, TextInput, Vibration, View} from 'react-native';
import {Rows, Table} from 'react-native-table-component';
import CustomButton from '../../components/CustomButton';
import {globalBackgroundColor, globalButtonColor} from '../../settings/color';
import {taka} from '../../assets/symbols';
import {showMessage} from 'react-native-flash-message';

const PurchaseEntryScreen = ({type}) => {

    /*{
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
    //const [stTable, setTable] = useState([]);

    const [stProductDependency, setProductDependency] = useState({
        grades:[],
        categories: [],
        types: [],
        status: [],
        stock: [],
    });


    const [stVAT, setVAT] = useState(15);
    const [stVatCost, setVatCost] = useState(0);
    const [stDiscount, setDiscount] = useState(0);
    const [stPayable, setPayable] = useState(0); //totalAmount
    const [stPaid, setPaid] = useState(0);
    const [stDue, setDue] = useState(0);


    const [stSubTotal, setSubTotal] = useState(0);


    const resetPrInputs = () => {
        setPr_name('')
        setPr_description('')
        //setPr_category('')
        //setPr_grade('')
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


    useEffect(()=>{

        setVatCost((stVAT / 100) * stSubTotal);

        setPayable((stVatCost + stSubTotal) - stDiscount)

        setDue((stPayable - stPaid).toFixed(2));

    },[stVatCost, stSubTotal, stPayable])

    const saveData = () => {
        setLoader(true);

        /*console.log('--------->',
            {
                id: 0,
                cname: stCustomerName,
                cmobile: stMobile,
                caddress: stAddress,
                totalAmount: stPayable,
                vatAmount: stVatCost,
                paidAmount: stPaid,
                dueAmount: stDue,
                productList: stProductsArr

            }
        );*/

        //return 0;

        customFetch({
            url: 'Purchase/Upsert',
            method: 'POST',
            body: {
                id: 0,
                cname: stCustomerName,
                cmobile: stMobile,
                caddress: stAddress,
                categoryId: type === 'newGold' ? 15001 : 15002,
                totalAmount: stPayable,
                vatAmount: stVatCost,
                paidAmount: stPaid,
                dueAmount: stDue,

                productList: stProductsArr
            },
            callbackResult: (result)=>{
                setLoader(false);
                showMessage({
                    message: "Successfully save data",
                    type: "success",
                });
                console.log('result---->', result, {
                    id: 0,
                    cname: stCustomerName,
                    cmobile: stMobile,
                    caddress: stAddress,
                    categoryId: type === 'newGold' ? 15001 : 15002,
                    totalAmount: stPayable,
                    vatAmount: stVatCost,
                    paidAmount: stPaid,
                    dueAmount: stDue,

                    productList: stProductsArr
                });
            },
            navigation
        });

    }

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


                <View style={styles.borderBox}>
                    <CommonEntryScreen
                        type="Purchase"
                        btnName="Add"
                        btnPress={()=>{

                            Vibration.vibrate(10);

                            resetPrInputs()

                            const currentState = {
                                id: 0,
                                name: stPr_name,
                                grade: stPr_grade,
                                category: stPr_category,
                                weight: stPr_weight,
                                description: stPr_description,
                                price: stPr_price,
                            };

                            setProductsArr(prevState => [...prevState, currentState]);

                            setSubTotal(prevState => Number(prevState) + ( Number(stPr_price) * Number(stPr_weight) ));

                            /*setTable(prevState => [...prevState, {
                                table: [
                                    ['Product’s Name',  ':', stPr_name],
                                    ['Comment',         ':', stPr_description],
                                    ['Karat',           ':', stPr_category],
                                    ['category',        ':', stPr_grade],
                                    ['Weight',          ':', stPr_weight],
                                    ['Price',           ':', stPr_price],
                                    ['Barcode',         ':', 'result.code'],
                                ]
                            }]);*/

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
                            },
                            {
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


                {
                    stProductsArr.length > 0 && <Fragment>
                        <View style={{margin:30}}>

                            <View style={{}}>

                                <View style={{marginBottom: 10}}>

                                    <Table>
                                        <Rows data={[
                                            ['Sub Total', ':', `${taka} ${stSubTotal}/=`],
                                            [`VAT ${stVAT}%`,
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{flex:1}}>
                                                        <Text>:</Text>
                                                    </View>

                                                    <View style={{flex:5}}>
                                                        <TransactionalInput
                                                            stValue={stVAT}
                                                            setValue={VAT_val=>{

                                                                setVatCost(((VAT_val / 100) * stSubTotal).toFixed(2));
                                                                setVAT(VAT_val);

                                                            }}
                                                        />
                                                    </View>

                                                </View>,
                                                `${taka} ${stVatCost}/=`
                                            ],
                                        ]
                                        } />
                                    </Table>


                                </View>


                                {/******* amountTable-2 ******/}
                                <View>
                                    <View style={{}}>

                                        <View style={{marginBottom: 20}}>

                                            <View style={{borderColor: '#000', borderBottomWidth:1, marginBottom:10}}/>

                                            <Table>
                                                <Rows data={[
                                                    ['Payable ', ':', `${taka} ${stPayable}/=`],
                                                    ['Paid', ':',
                                                        <TransactionalInput
                                                            stValue={stPaid}
                                                            setValue={paidVal=>{
                                                                setPaid(paidVal);
                                                                setDue((stPayable - paidVal).toFixed(2));
                                                            }}
                                                        />
                                                    ],
                                                    ['Due Amount', ':', `${taka} ${stDue}/=`],
                                                ]} />
                                            </Table>

                                        </View>

                                    </View>
                                </View>

                            </View>
                        </View>

                        <View style={[styles.container, styles.borderBox,  {backgroundColor: '#fdf2e6'}]}>

                            <Text style={styles.fontBold}>Product Detail</Text>

                            {
                                stProductsArr.map((elm, index) => (
                                    <View key={index} style={styles.productDetailsBorder}>
                                        <View style={{width: '100%', backgroundColor:globalBackgroundColor, padding:5, paddingLeft:15, borderRadius:5}}>
                                            <Text style={{color: '#000', fontWeight:'bold', fontSize:17}}>Item {index+1}</Text>
                                        </View>
                                        <View style={{marginBottom: 20}}>

                                            <Table>
                                                <Rows data={[
                                                    ['Product’s Name',  ':', elm.name],
                                                    ['Comment',         ':', elm.description],
                                                    ['Karat',           ':', elm.grade],
                                                    ['category',        ':', elm.category],
                                                    ['Weight',          ':', elm.weight],
                                                    ['Price',           ':', elm.price],
                                                    ['Barcode',         ':', 'result.code'],
                                                ]} textStyle={styles.text}/>
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

                                            //setTable([])
                                            setProductsArr([]);

                                            setSubTotal(0);
                                            setPayable(0);
                                            setVAT(15)
                                            setPaid(0);
                                            setDue(0);

                                            resetPrInputs()
                                        }}
                                    />
                                </View>


                                {stProductsArr.length > 0 && <View style={{flex: 1, margin: 10}}>
                                    <CustomButton
                                        text="Save"
                                        bgColor={globalButtonColor}
                                        onPress={() => {
                                            Vibration.vibrate(1000);

                                            saveData();

                                            setCustomerName('')
                                            setMobile('')
                                            setAddress('')

                                            //setTable([])
                                            setProductsArr([]);

                                            setSubTotal(0);
                                            setPayable(0);
                                            setVAT(15)
                                            setPaid(0);
                                            setDue(0);

                                            resetPrInputs()
                                            /*setConfirmModalVisible(true);*/
                                        }}
                                    />
                                </View>}
                            </View>

                        </View>
                    </Fragment>
                }


            </ScrollView>

        </Fragment>
    );
}

export default PurchaseEntryScreen;

const styles = StyleSheet.create({

    borderBox: {
        borderWidth: 1,
        borderColor: globalBackgroundColor,
        backgroundColor: '#fdf8ed',
    },

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
