/* eslint-disable */
import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet, TextInput, Button, Pressable, Modal, Alert} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomInput from '../../components/CustomInput';
import {useEffect, useState} from 'react';
import CustomButton from '../../components/CustomButton';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Table, Row, Rows} from 'react-native-table-component';

import {Camera, useCameraDevices} from "react-native-vision-camera";
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {RNHoleView} from 'react-native-hole-view';

const Tab = createMaterialTopTabNavigator();

const checkCameraPermission = async () => {
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
};

function SalesEntry() {
    const [stCustomerName, setCustomerName] = useState();
    const [stMobileNumber, setMobileNumber] = useState();
    const [stAddress, setAddress] = useState();
    const [stComment, setComment] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const [stTable, setTable] = useState({
        tableData: [
            ['Product’s Name', ':', 'Ear Ring'],
            ['Description', ':', 'Gold Ear Ring Retail.'],
            ['Karat', ':', '21k'],
            ['Weight', ':', '11.5g'],
            ['Price P/G', ':', '2300'],
            ['Barcode', ':', '111029H88N12'],
        ],
    });

    useEffect(()=>{

        checkCameraPermission();


    }, []);

    const SubComponentForInput = ({title, ...props}) => (
        <View style={styles.container}>
            <Text>{title}</Text>
            <CustomInput {...props} />
        </View>
    );

    const devices = useCameraDevices()
    const device = devices.back;

    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
    ]);

    const [barcode, setBarcode] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [isScanned, setIsScanned] = useState(false);

    return (
        <ScrollView>
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
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View>
                            <Button title=" &#x274C; Close Scanner" onPress={() => setModalVisible(!modalVisible)}/>
                        </View>

                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>

                                <Camera
                                    style={StyleSheet.absoluteFill}
                                    device={device}
                                    isActive={modalVisible}
                                />

                            </View>
                        </View>
                    </Modal>

                </View>


                <View style={styles.container}>

                    <Text>Barcode</Text>

                    <View style={{flexDirection: 'row', paddingTop: 10}}>

                        <View style={{flex: 5}}>
                            <TextInput
                                style={styles.barcodeInput}
                                placeholder="Input Manually"
                            />
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


                <View style={styles.flexRow}>

                    <CustomButton text="Add" bgColor="#d5b337"/>

                </View>

            </View>

            <View>
                <View style={[styles.container, {backgroundColor: '#fdf2e6'}]}>

                    <Text style={styles.fontBold}>Product Detail</Text>

                    {
                        [1, 2, 3].map((elm, index) => (
                            <View key={index} style={styles.productDetailsBorder}>

                                <View style={{marginBottom: 20}}>

                                    <Table>
                                        <Rows data={stTable.tableData} textStyle={styles.text}/>
                                    </Table>

                                </View>

                            </View>
                        ))
                    }


                </View>
            </View>


        </ScrollView>
    );
}

function WholeSales() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

function Gift() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

const Sales = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Sales Entry" component={SalesEntry}/>
            <Tab.Screen name="Whole Sales" component={WholeSales}/>
            <Tab.Screen name="Gift" component={Gift}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    barcodeIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d5b337',
        padding: 10,
        borderRadius: 5,
        marginLeft: 5,
        height: 50,
    },

    barcodeInput: {
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#2c2c2c',
        backgroundColor: '#ffffff',
        height: 50,
        padding: 10,
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
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        textAlign: "center"
    }
});

export default Sales;
