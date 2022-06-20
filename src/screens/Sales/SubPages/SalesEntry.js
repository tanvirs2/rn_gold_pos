/* eslint-disable */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
    Alert,
    Button,
    LogBox,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, ToastAndroid, TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {Rows, Table} from 'react-native-table-component';
import {useNavigation} from '@react-navigation/native';
import {RNHoleView} from 'react-native-hole-view';

import CustomInput from '../../../components/CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/CustomButton';
import {globalBackgroundColor, globalButtonColor} from '../../../settings/color';
import {customFetch} from '../../../settings/networking';
import collect from 'collect.js';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import moment from 'moment';
import {taka} from '../../../assets/symbols';
import {TransactionalInput} from '../../../settings/ComponentLib';

export const SubComponentForInput = ({title, ...props}) => (
    <View style={styles.container}>
        <Text style={{fontSize:18, marginBottom:3}}>{title}</Text>
        <CustomInput {...props} />
    </View>
);



export default function SalesEntry() {

    const navigation = useNavigation();
    const {height, width} = useWindowDimensions();

    const devices = useCameraDevices()

    const device = devices.back;
    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.CODE_128, // You can only specify a particular format
    ]);

    const [stConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [stLoader, setLoader] = useState(false);
    const [stScannedBarcode, setScannedBarcode] = useState([]);
    const [barcode, setBarcode] = useState(''); //P-637895491821048620
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    const [stCustomerName, setCustomerName] = useState();
    const [stMobileNumber, setMobileNumber] = useState();
    const [stAddress, setAddress] = useState();
    const [stComment, setComment] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [stSubTotal, setSubTotal] = useState(0);

    const [stProductList, setProductList] = useState([]);

    const [stTable, setTable] = useState([
        /*{
            table: [
                ['Product’s Name',  ':', 'result.name'],
                ['Comment',     ':', 'result.description'],
                ['Karat',           ':', 'result.grade'],
                ['category',        ':', 'result.category'],
                ['Weight',          ':', 40],
                ['Price',       ':', 100],
                ['Barcode',         ':', 'result.code'],
            ]
        }*/
    ]);


    const getProductByBarcode = () => {

        const collection = collect(stScannedBarcode);

        const contains = collection.contains(barcode);

        //console.log(contains);

        if (!contains) {
            setLoader(true);
            customFetch({
                url: 'Sale/GetProductByCode/' + barcode,
                method: 'GET',
                callbackResult: (result)=>{

                    //console.log('GetProductByCode',result.id);

                    if (result?.code) {

                        setProductList(prevState => [...prevState, {id: 0, productId: result.id}]);

                        setScannedBarcode(prevState => [...prevState, barcode]);

                        setSubTotal(prevState => prevState + Number(result.sellingPrice));

                        setTable(prevState => {
                            return [
                                ...prevState,
                                {
                                    table: [
                                        ['Product’s Name',  ':', result.name],
                                        ['Comment',     ':', result.description],
                                        ['Karat',           ':', result.grade],
                                        ['category',        ':', result.category],
                                        ['Weight',          ':', result.weight],
                                        ['Price',       ':', result.sellingPrice],
                                        ['Barcode',         ':', result.code],
                                    ]
                                }
                            ];
                        });

                    } else {
                        ToastAndroid.show('Not found !', ToastAndroid.SHORT)
                    }

                    setLoader(false);

                },
                callbackError: () => {
                    setScannedBarcode([]);
                    setBarcode('');
                    setLoader(false);
                },
                navigation
            });
        } else {
            ToastAndroid.show('already added !', ToastAndroid.SHORT)
        }

    }


    /**************** Start Camera Function *****************/

    const checkCameraPermissionFirst = async () => {
        let status = await Camera.getCameraPermissionStatus();
        //alert(status);
        if (status !== 'authorized') {
            await Camera.requestCameraPermission();
            status = await Camera.getCameraPermissionStatus();
            if (status === 'denied') {
                alert(
                    'You will not be able to scan if you do not allow camera access',
                );
            }
        }

        setHasPermission(status === 'authorized');
    };

    useEffect(()=>{

        checkCameraPermissionFirst();


    }, []);


    const toggleActiveState = async () => {
        if (barcodes && barcodes.length > 0 && isScanned === false) {
            //console.log(barcode)
            setIsScanned(true);
            setModalVisible(false)

            //alert('ddddaaa')

            /*barcodes.map((barcode, idx) => {
                    //console.log(barcode.displayValue)
                    return (
                        <Text key={idx} style={{color:'red', fontSize: 50}}>
                            {barcode.displayValue}
                        </Text>
                    )
                }
            )*/

            // setBarcode('');
            barcodes.forEach((scannedBarcode) => {
                if (scannedBarcode.rawValue !== '') {
                    setBarcode(scannedBarcode.content.data);
                    //Alert.alert(barcode);
                    //console.log(barcode)
                }
            });
        }
    };

    useEffect(() => {

        if (barcodes[0]) {

            const collection = collect(stScannedBarcode);

            const contains = collection.contains(barcodes[0].content.data);

            //console.log(contains);

            if (!contains) {
                setModalVisible(false);
                setBarcode(barcodes[0].content.data);
            }

            //console.log(duplicates.count());
            //console.log(barcodes[0].content.data);
        }

        toggleActiveState();

        /*return () => {
            barcodes;
        };*/

    }, [barcodes]);

    /**************** End Camera Function *****************/


    const collection = collect(stTable);

    //console.log(collection);

    const brTable = collection.count() > 0;

    const InvoiceBottomButton = ({title, onPress, color, iconName, iconPosition}) => {

        return (
            <TouchableOpacity onPress={onPress} style={{backgroundColor:color, borderRadius:3, borderWidth:1, borderColor:'#b4b4b4'}}>
                <Text style={styles.buttonText}>
                    {iconPosition === 'left' && <Ionicons name={iconName} size={15}/> }
                    {title}
                    {iconPosition === 'right' && <Ionicons name={iconName} size={15}/> }
                </Text>
            </TouchableOpacity>
        );
    }

    /*const TransactionalInput = ({stValue, setValue}) => {

        return <TextInput
            keyboardType="numeric"
            placeholder="............"
            placeholderTextColor="#f00"
            style={{padding: 0, color: '#0048ff', fontWeight:'bold'}}
            value={stValue}
            onChangeText={setValue}
        />
    }*/

    const ConfirmModal = () => {

        const [stVAT, setVAT] = useState(15);
        const [stVatCost, setVatCost] = useState(0);
        const [stDiscount, setDiscount] = useState(0);
        const [stPayable, setPayable] = useState(0);
        const [stPaid, setPaid] = useState(0);
        const [stDue, setDue] = useState(0);
        const [stInvoice, setInvoice] = useState(0);

        useEffect(()=>{

            setVatCost((stVAT / 100) * stSubTotal);

            setPayable((stVatCost + stSubTotal) - stDiscount)

        },[stVatCost])

        const confirmSell = () => {

            //Alert.alert('ddd', 'AAA')
            /**/
            setLoader(true);

            customFetch({
                url: 'Sale/Upsert',
                method: 'POST',
                body: {
                    "id": 0,
                    "shopId": 1,
                    "cname": stCustomerName,
                    "cmobile": stMobileNumber,
                    "caddress": stAddress,
                    "totalAmount": stPayable,
                    "vatAmount": stVatCost,
                    "paidAmount": stPaid,
                    "dueAmount": stDue,
                    "comment": stComment,
                    "productList": [
                        ...stProductList
                    ]
                },
                callbackResult: insertedId => {

                    /* Child request */
                    customFetch({
                        url: 'Sale/Get/'+insertedId,
                        callbackResult: resultChild => {

                            setInvoice(resultChild.model.code)

                            console.log('insertedId', insertedId)
                            console.log('resultChild', resultChild.model.code)

                            setConfirmModalVisible(false);

                            setLoader(false);

                            navigation.navigate('Invoice', {
                                id :            0,
                                shopId :        1,
                                invoiceNo :     resultChild.model.code,
                                cname :         stCustomerName,
                                cmobile :       stMobileNumber,
                                caddress :      stAddress,
                                subTotal :      stSubTotal,
                                totalAmount :   stPayable,
                                vatPercent :    stVAT,
                                vatAmount :     stVatCost,
                                paidAmount :    stPaid,
                                discount :      stDiscount,
                                dueAmount :     stDue,
                                comment :       stComment,
                                productList :[
                                    ...stTable
                                ]
                            })

                        },
                    });
                    /* End Child request */
                },
            });




        }

        return (
            <View>
                <View>
                    <Modal animationType="slide" transparent={true} visible={stConfirmModalVisible}>
                        <View style={{padding:30, backgroundColor: 'rgba(87,87,87,0.65)'}}>
                            <View style={{height: '100%'}}>

                                <LoaderViewScreen viewThisComp={stLoader}/>

                                <ScrollView style={{backgroundColor: '#fff', minHeight:'100%',
                                    borderColor: globalBackgroundColor, borderWidth:2, borderRadius:5, padding:10}}>

                                    <View>

                                        <View>
                                            <Text style={{fontWeight:'bold', fontSize:30, color:'#9b3a00' }}>Preview</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:19}}>
                                            <Text style={{ fontSize:15, fontWeight:'bold', color:'#000'}}>Invoice </Text>
                                            <Text style={{ fontSize:15, fontWeight:'bold', color:'#000'}}> { moment().format('DD/MM/Y') }</Text>
                                        </View>


                                        <View >
                                            <Text style={{ fontSize:16 }}>Customer’s Name : {stCustomerName}  </Text>
                                        </View>

                                        <View style={{marginBottom:19}}>
                                            <Text style={{ fontSize:16 }}>Phone Number      : {stMobileNumber} </Text>
                                        </View>


                                        <View>
                                            {
                                                stTable?.map((elm, index) => {

                                                    //console.log('tbl--------------->',elm)

                                                    return <View key={index} style={{}}>

                                                        <View style={{marginBottom: 20}}>

                                                            <View style={{backgroundColor: globalBackgroundColor, borderRadius:3, padding:3, paddingLeft:10, marginBottom:3}}>
                                                                <Text style={{fontWeight:'bold', fontSize:18, color:'#000'}}>Item {index+1}</Text>
                                                            </View>

                                                            <Table>
                                                                <Rows data={elm.table} />
                                                            </Table>

                                                        </View>

                                                    </View>
                                                })
                                            }
                                        </View>
                                        {/**-----------------**/}


                                        <View style={{borderStyle: 'dotted', borderWidth: 2, padding:5,marginBottom:100, borderColor:globalBackgroundColor}}>
                                            {/******* amountTable-1 ******/}
                                            <View>
                                                <View >

                                                    <View style={{marginBottom: 20}}>

                                                        {/*<View style={{borderColor: globalBackgroundColor, borderBottomWidth:1, marginBottom:10}}/>*/}

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
                                                                /*['Discount', ':',

                                                                    <TransactionalInput
                                                                        stValue={stDiscount}
                                                                        setValue={discountVal=>{
                                                                            setDiscount(discountVal)
                                                                            setPayable((stVatCost + stSubTotal) - discountVal)
                                                                        }}
                                                                    />
                                                                ],*/
                                                            ]
                                                            } />
                                                        </Table>

                                                    </View>

                                                </View>
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

                                </ScrollView>

                                <View style={{bottom:'15%', flexDirection:'row', justifyContent: 'space-around'}}>


                                    <View style={{width:'40%'}}>

                                        <InvoiceBottomButton
                                            title="Cancel"
                                            onPress={()=>{
                                                setConfirmModalVisible(false)
                                            }}
                                            color="#9f4c5b"
                                            iconName="chevron-back-outline"
                                            iconPosition="left"
                                        />


                                    </View>

                                    <View style={{width:'40%'}}>

                                        <InvoiceBottomButton
                                            title="Confirm"
                                            onPress={confirmSell}
                                            color={globalButtonColor}
                                            iconName="chevron-forward-outline"
                                            iconPosition="right"
                                        />

                                    </View>


                                    {/*<View style={{width:'40%', borderColor:'#4D4D4DFF', borderWidth:1, elevation:30, shadowColor: '#000'}}>
                                        <Button title="Proceed" color={globalButtonColor}/>
                                    </View>*/}

                                </View>

                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        );
    };

    return (
        <ScrollView>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <View>

                <SubComponentForInput
                    title="Customer Name *"
                    placeholder="Customer Name"
                    value={stCustomerName}
                    setValue={setCustomerName}
                />
                <SubComponentForInput
                    title="Mobile Number *"
                    placeholder="Mobile Number"
                    value={stMobileNumber}
                    setValue={setMobileNumber}
                    keyboardType="numeric"
                />
                <SubComponentForInput
                    title="Address *"
                    placeholder="Address"
                    value={stAddress}
                    setValue={setAddress}
                />
                <SubComponentForInput
                    title="Comment"
                    value={stComment}
                    setValue={setComment}
                    multiline={true}
                    numberOfLines={4}
                />


                <View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            //Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                            setIsScanned(false);
                        }}
                    >
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 15,
                            backgroundColor: globalBackgroundColor,
                        }}>

                            <TouchableOpacity onPress={() => {
                                setModalVisible(!modalVisible);
                                setIsScanned(false);
                            }}>
                                <Text style={{fontWeight: 'bold', fontSize: 15, color: '#000'}}> &#x274C; Close
                                    Scanner</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.centeredView, {backgroundColor: 'rgba(63,49,0,0.89)'}]}>

                            <View style={[styles.modalView, {height: height * 0.45, width: width * 0.9}]}>


                                {
                                    device && hasPermission && (<Camera
                                        style={{height: '100%', width: '100%'}}
                                        device={device}
                                        isActive={modalVisible}
                                        frameProcessor={frameProcessor}
                                        frameProcessorFps={5}
                                        audio={false}
                                    />)
                                }
                                {/*<View style={{position:'absolute', top:'40%' }}>
                                    <View style={{ backgroundColor: '#fff', borderWidth:1, borderRadius:10, padding: 10}}>
                                        <Text style={{fontSize:20, fontWeight:'bold'}}>No Barcode</Text>
                                    </View>
                                </View>*/}


                                {/*<View style={{width:'124.5%', height: '100%'}}>

                                </View>*/}


                                {/*{isScanned === false && barcodes.map((barcode, idx) => {

                                    //console.log(barcode.displayValue)

                                        return (
                                            <Text key={idx} style={{color:'red', fontSize: 50}}>

                                                {barcode.displayValue}

                                            </Text>

                                        )
                                    }
                                )}*/}


                                {/*<RNHoleView
                                    holes={[
                                        { x: 150, y: 100, width: 220, height: 220, borderRadius: 10 },
                                    ]}
                                    style={{
                                        width: width,
                                        height: height,
                                        position: 'absolute',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.5)'}}
                                />*/}


                            </View>
                        </View>
                    </Modal>

                </View>


                {stCustomerName ? <View style={styles.container}>

                    <Text>Barcode</Text>

                    <View style={{flexDirection: 'row', paddingTop: 10}}>

                        <View style={{flex: 5, flexDirection: 'row'}}>


                            <View style={{flex: 4, justifyContent: 'center'}}>

                                <TextInput
                                    style={styles.barcodeInput}
                                    placeholder="Input Manually"
                                    value={barcode}
                                    onChange={e => setBarcode(e.target.value)}
                                />

                            </View>

                            <View style={{flex: 1, justifyContent: 'center'}}>

                                <TouchableOpacity style={styles.addButton} onPress={getProductByBarcode}
                                >
                                    <Text style={{fontWeight: 'bold', color: '#000'}}>Add</Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View style={{flex: 1}}>
                            <Pressable style={styles.barcodeIcon} onPress={() => setModalVisible(!modalVisible)}>
                                <Ionicons
                                    name="barcode-outline"
                                    size={30}
                                    color="black"
                                />
                            </Pressable>
                        </View>

                    </View>

                </View> : null}

            </View>

            {brTable && <View>

                <View style={[styles.container, {backgroundColor: '#fdf2e6'}]}>

                    <Text style={styles.fontBold}>Product Detail</Text>

                    {
                        stTable.map((elm, index) => (
                            <View key={index} style={styles.productDetailsBorder}>

                                <View style={{marginBottom: 20}}>

                                    <Table>
                                        <Rows data={elm.table} textStyle={styles.text}/>
                                    </Table>

                                </View>

                            </View>
                        ))
                    }

                    {stConfirmModalVisible && <ConfirmModal/>}

                    <View style={{flexDirection:'row'}}>
                        <View style={{flex:1, margin:10}}>
                            <CustomButton
                                text="Reset"
                                bgColor="#9f4c5b"
                                onPress={() => {
                                    setConfirmModalVisible(false);
                                    setScannedBarcode([]);
                                    setCustomerName('')
                                    setMobileNumber('')
                                    setAddress('')
                                    setComment('')
                                    setBarcode('')
                                    setProductList([])
                                    setTable([])
                                }}
                            />
                        </View>
                        <View style={{flex:1, margin:10}}>
                            <CustomButton
                                text="Next"
                                bgColor={globalButtonColor}
                                onPress={() => {
                                    setConfirmModalVisible(true);
                                }}
                            />
                        </View>
                    </View>

                </View>
            </View>}


        </ScrollView>
    );
}



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

