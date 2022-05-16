/* eslint-disable */
import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet, TextInput, Button, Pressable} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomInput from '../../components/CustomInput';
import {useState} from 'react';
import CustomButton from '../../components/CustomButton';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Table, Row, Rows } from 'react-native-table-component';

const Tab = createMaterialTopTabNavigator();

function SalesEntry() {
    const [stCustomerName, setCustomerName] = useState();
    const [stMobileNumber, setMobileNumber] = useState();
    const [stAddress, setAddress] = useState();
    const [stComment, setComment] = useState();
    const [stTable, setTable] = useState({
        tableData: [
            ['Product’s Name', ':', 'Ear Ring'],
            ['Description', ':', 'Gold Ear Ring Retail.'],
            ['Karat', ':', '21k'],
            ['Weight', ':', '11.5g'],
            ['Price P/G', ':', '2300'],
            ['Barcode', ':', '111029H88N12'],
        ]
    });

    const SubComponentForInput = ({title, ...props}) => (
        <View style={styles.container}>
            <Text>{title}</Text>
            <CustomInput {...props} />
        </View>
    );

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


            <View style={styles.container}>

                <Text>Barcode</Text>

                <View style={{flexDirection:'row', paddingTop: 10 }}>

                    <View style={{flex:5}}>
                        <TextInput
                            style={styles.barcodeInput}
                            placeholder="Input Manually"
                        />
                    </View>

                    <View style={{flex:1}}>
                        <Pressable style={styles.barcodeIcon}>
                            <Ionicons
                                name="barcode-outline"
                                size={30}
                                color="black"
                            />
                        </Pressable>
                    </View>


                </View>
            </View>



            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', padding: 10 }}>

                <CustomButton text="Add" bgColor="#d5b337"/>

            </View>

        </View>

        <View>
            <View style={[styles.container, {backgroundColor: '#fdf2e6'}]}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Product Detail</Text>
                <View style={{borderWidth: 1, borderRadius: 5, borderColor: '#676666', padding:15, marginBottom:10}}>

                    <View style={{marginBottom:20}}>

                        <Table>
                            <Rows data={stTable.tableData}/>
                        </Table>

                    </View>

                </View>

                <View style={{borderWidth: 1, borderRadius: 5, borderColor: '#676666', padding:15, marginBottom:10}}>

                    <View style={{marginBottom:20}}>

                        <Table>
                            <Rows data={stTable.tableData}/>
                        </Table>

                    </View>

                </View>


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
          <Tab.Screen name="Sales Entry" component={SalesEntry} />
          <Tab.Screen name="Whole Sales" component={WholeSales} />
          <Tab.Screen name="Gift" component={Gift} />
      </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
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

    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
})

export default Sales;
