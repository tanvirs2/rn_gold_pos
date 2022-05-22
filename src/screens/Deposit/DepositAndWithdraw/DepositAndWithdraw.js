/*eslint-disable*/

import React, {Fragment, useEffect, useState} from 'react';
import {Button, Text, View, Pressable, StyleSheet, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Table, Row, Rows } from 'react-native-table-component';
import {apiUrl} from '../../../settings/networking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {taka} from '../../../assets/symbols';

const Tab = createMaterialTopTabNavigator();

const DepositListScreen = () => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [stDeposits, setDeposits] = useState({
        tableHead: ['Deposit Name', 'Amount', 'Comment'],
        tableData: [
            ['', '', ''],
        ]
    })

    useEffect( ()=>{
        //alert('1')
        //alert(loginToken);
        async function getStorageData() {
            let loginToken = await AsyncStorage.getItem('@storage_token');

            fetch(apiUrl + `Deposit/GetAll?pageIndex=0&pageSize=10&date=2022-05-15`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${loginToken}`
                    }
                },
            )
                .then(response=> response.json())
                .then(result=>{

                    let listArray = result.data.map((data)=>{
                        /*return {
                            depositName: data.name,
                            amount: data.amount,
                            comment: data.description
                        };*/
                        return [
                            data.name,

                            `${taka} ${data.amount}`,

                            data.description
                        ];
                    })

                    //console.log('------ddd---->',result.data)

                    setDeposits(
                        {
                            tableHead: ['Deposit Name', 'Amount', 'Comment'],
                            tableData: [
                                ...listArray
                            ]
                        }
                    )

                }).catch((err)=>{
                //alert('4')
                console.log('---------->', err)
            })
        }

        getStorageData();

    }, []);

    return (
        <View>

            <ScrollView>
                <View style={{marginTop:10,padding:20, justifyContent:'center', alignItems:'center'}}>

                    <View>
                        <Pressable onPress={() => setOpen(true)} >
                            <View style={{backgroundColor:'#000', paddingHorizontal:10, paddingVertical:5, borderRadius:10, flexDirection:'row', marginTop:1}}>


                                <View>
                                    <Ionicons name="calendar-outline" size={24} color="#fff"/>
                                </View>

                                <View>
                                    <Text style={{color: 'gray', fontWeight:'bold', fontSize:15}}> {moment().diff(date, 'days') === 0 ? 'Today':'Day' } &nbsp;</Text>
                                </View>

                                <View>
                                    <Text style={{color: '#fff', fontWeight:'bold', fontSize:15}}>{moment(date).format('MMMM Do')} &nbsp;</Text>
                                </View>

                                <View>
                                    <Ionicons name="chevron-down-outline" size={20} color="#fff"/>
                                </View>


                            </View>
                        </Pressable>


                        <DatePicker
                            mode="date"

                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>

                </View>

                <View>
                    <View style={styles.container}>
                        <Table>
                            <Row data={stDeposits.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={stDeposits.tableData} textStyle={styles.cell}/>
                        </Table>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

const WithdrawListScreen = () => {


    return (
        <View>
            <View style={{marginTop:10,padding:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>Deposit & Withdraw</Text>

                <View>

                </View>

            </View>
        </View>
    );
}

const DepositAndWithdraw = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Deposit List" component={DepositListScreen}/>
            <Tab.Screen name="Withdraw List" component={WithdrawListScreen}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30 },
    head: { height: 40, backgroundColor: '#cccccc' },
    text: { margin: 6, fontWeight:'bold' },
    cell: { margin: 6 }
});

export default DepositAndWithdraw;
