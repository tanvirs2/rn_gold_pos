/* eslint-disable */
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
import CustomInput from '../../../components/CustomInput';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../components/CustomButton';
import {Rows, Table} from 'react-native-table-component';
import {RNHoleView} from 'react-native-hole-view';
import * as React from 'react';
import {globalButtonColor} from '../../../settings/color';
import {customFetch} from '../../../settings/networking';
import collect from 'collect.js';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';

export const SubComponentForInput = ({title, ...props}) => (
    <View style={styles.container}>
        <Text style={{fontSize:18, marginBottom:3}}>{title}</Text>
        <CustomInput {...props} />
    </View>
);

export default function SalesEntry({navigation}) {

    const {height, width} = useWindowDimensions();

    const devices = useCameraDevices()

    const device = devices.back;
    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.CODE_128, // You can only specify a particular format
    ]);

    const [stLoader, setLoader] = useState(false);
    const [stScannedBarcode, setScannedBarcode] = useState([]);
    const [barcode, setBarcode] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    const [stCustomerName, setCustomerName] = useState();
    const [stMobileNumber, setMobileNumber] = useState();
    const [stAddress, setAddress] = useState();
    const [stComment, setComment] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const [stTable, setTable] = useState([]);


    const getProductByBarcode = () => {

        setScannedBarcode(prevState => [...prevState, barcode]);

        const collection = collect(stScannedBarcode);

        const contains = collection.contains(barcode);

        //console.log(contains);

        if (!contains) {
            setLoader(true);
            customFetch({
                url: 'Sale/GetProductByCode/' + barcode,
                method: 'GET',
                callbackResult: (result)=>{
                    //console.log('GetProductByCode',result);

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

            console.log(contains);

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
                        <View>
                            <Button title=" &#x274C; Close Scanner" onPress={() => {
                                setModalVisible(!modalVisible);
                                setIsScanned(false);
                            }}/>
                        </View>

                        <View style={styles.centeredView}>

                            <View style={[styles.modalView, {height: height*0.45, width: width*0.9}]}>


                                {
                                    device && hasPermission && (<Camera
                                        style={{height:'100%',width:'100%',}}
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

                        <View style={{flex: 5, flexDirection:'row'}}>


                            <View style={{flex: 4, justifyContent: 'center'}}>

                                <TextInput
                                    style={styles.barcodeInput}
                                    placeholder="Input Manually"
                                    value={barcode}
                                    onChange={e=>setBarcode(e.target.value)}
                                />

                            </View>

                            <View style={{flex: 1, justifyContent: 'center'}}>

                                <TouchableOpacity style={styles.addButton} onPress={getProductByBarcode}
                                >
                                    <Text style={{fontWeight:'bold', color:'#000'}}>Add</Text>
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

            { brTable && <View>

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

                    <View>
                        <CustomButton
                            text="Proceed"
                            bgColor={globalButtonColor}
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

    productDetailsBorder: {borderWidth: 1, borderRadius: 5, borderColor: '#676666', padding: 15, marginBottom: 10},
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
        borderWidth: 2,
        borderColor: 'red',
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
});

