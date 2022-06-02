/* eslint-disable */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
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
import LinearGradient from 'react-native-linear-gradient';

import CustomInput from '../../../components/CustomInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/CustomButton';
import {globalBackgroundColor, globalButtonColor} from '../../../settings/color';
import {customFetch} from '../../../settings/networking';
import collect from 'collect.js';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import moment from 'moment';

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
    const [barcode, setBarcode] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    const [stCustomerName, setCustomerName] = useState();
    const [stMobileNumber, setMobileNumber] = useState();
    const [stAddress, setAddress] = useState();
    const [stComment, setComment] = useState();
    const [stDiscount, setDiscount] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [stAmountTable, setAmountTable] = useState({
            amountTable: [
                ['Sub Total', ':', '7689'],
                ['VAT (15%)', ':', '750'],
                ['Discount', ':', <TextInput placeholder=".................." placeholderTextColor="#f00" value={stDiscount} onChange={setDiscount}/>],

            ],
            amountTable2: [
                ['Payable Amount', ':', '8450'],
                ['Due Amount', ':', '0'],
            ],
        }
    );

    const [stTable, setTable] = useState([
        {
            table: [
                ['Product’s Name',  ':', 'result.name'],
                ['Description',     ':', 'result.description'],
                ['Karat',           ':', 'result.grade'],
                ['category',        ':', 'result.category'],
                ['Weight',          ':', 'result.weight'],
                ['Price P/G',       ':', 'not found'],
                ['Barcode',         ':', 'result.code'],
            ]
        }
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

                    console.log('GetProductByCode',result);

                    if (result?.code) {

                        setScannedBarcode(prevState => [...prevState, barcode]);

                        setTable(prevState => {
                            return [
                                ...prevState,
                                {
                                    table: [
                                        ['Product’s Name',  ':', result.name],
                                        ['Description',     ':', result.description],
                                        ['Karat',           ':', result.grade],
                                        ['category',        ':', result.category],
                                        ['Weight',          ':', result.weight],
                                        ['Price P/G',       ':', 'not found'],
                                        ['Barcode',         ':', result.code],
                                    ]
                                }
                            ];
                        });

                    } else {
                        ToastAndroid.show('Not found !', ToastAndroid.SHORT)
                    }


                    setLoader(false);

                    /*let tt = {
                        'id': 24,

                        'name': 'Gold Bangle B-Design',
                        'description': 'New shape 2022',
                        'grade': '18k',
                        'gradeId': 14801,
                        'categoryId': 4,
                        'category': 'Bangle',
                        'weight': 5.60,
                        'code': '637887663320736161',

                        'isActive': true,
                        'typeId': 14701,
                        'buyingPrice': 2000.0000,
                        'sellingPrice': null,
                        'isStock': true,
                    };
                    */
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


    const ConfirmModal = () => {

        return (
            <View>
                <View>
                    <Modal animationType="slide" transparent={true} visible={stConfirmModalVisible}>
                        <View style={{padding:30, backgroundColor: 'rgba(87,87,87,0.65)'}}>
                            <View style={{height: '100%'}}>
                                <ScrollView style={{backgroundColor: '#fff', minHeight:'100%',
                                    borderColor: globalBackgroundColor, borderWidth:2, borderRadius:5, padding:10}}>

                                    <View>

                                        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:19}}>

                                            <View style={{ marginTop: -10}}>
                                                <Text style={{fontWeight:'bold', fontSize:30}}>Invoice</Text>
                                            </View>

                                            <Text style={{ fontSize:15 }}> { moment().format('DD/MM/Y') }</Text>
                                        </View>*/}

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


                                        {/******* amountTable-1 ******/}
                                        <View>
                                            <View >

                                                <View style={{marginBottom: 20}}>

                                                    <View style={{borderColor: globalBackgroundColor, borderBottomWidth:1, marginBottom:10}}/>

                                                    <Table>
                                                        <Rows data={stAmountTable.amountTable} />
                                                    </Table>

                                                </View>

                                            </View>
                                        </View>

                                        {/******* amountTable-2 ******/}
                                        <View>
                                            <View style={{marginBottom:100}}>

                                                <View style={{marginBottom: 20}}>

                                                    <View style={{borderColor: '#000', borderBottomWidth:1, marginBottom:10}}/>

                                                    <Table>
                                                        <Rows data={stAmountTable.amountTable2} />
                                                    </Table>

                                                </View>

                                            </View>
                                        </View>

                                    </View>

                                </ScrollView>

                                <View style={{bottom:'15%', flexDirection:'row', justifyContent: 'space-around'}}>


                                    <View style={{width:'40%'}}>


                                            <LinearGradient colors={['#9f4c5b', '#983b4c', '#6a1919']} style={styles.linearGradient}>
                                                <TouchableOpacity onPress={()=>{
                                                    setConfirmModalVisible(false)
                                                }}>
                                                    <Text style={styles.buttonText}>
                                                        <Ionicons name="chevron-back-outline" size={15}/>
                                                        Cancel
                                                    </Text>
                                                </TouchableOpacity>

                                            </LinearGradient>


                                    </View>

                                    <View style={{width:'40%'}}>

                                            <LinearGradient colors={[globalButtonColor, '#98893b', '#6a5019']} style={styles.linearGradient}>
                                                <TouchableOpacity onPress={()=>{
                                                    setConfirmModalVisible(false)
                                                }}>
                                                    <Text style={styles.buttonText}>
                                                        Proceed
                                                        <Ionicons name="chevron-forward-outline" size={15}/>
                                                    </Text>
                                                </TouchableOpacity>

                                            </LinearGradient>

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


                <View style={styles.container}>

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

                </View>

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

                    <View>
                        <CustomButton
                            text="Next"
                            bgColor={globalButtonColor}
                            onPress={() => {
                                setConfirmModalVisible(true);

                                /*navigation.navigate('Invoice', {
                                    id :            0,
                                    shopId :        1,
                                    cname :         stCustomerName,
                                    cmobile :       stMobileNumber,
                                    caddress :      stAddress,
                                    totalAmount :   500,
                                    vatAmount :     200,
                                    paidAmount :    100,
                                    dueAmount :     300,
                                    typeId :        14902,
                                    categoryId :    15101,
                                    comment :       stComment,
                                    productList :[
                                        ...stTable
                                    ]
                                });*/
                            }}
                        />
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




    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 8,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});

