/*eslint-disable*/

import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Button, Text, View, Pressable, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Table, Row, Rows } from 'react-native-table-component';
import { useIsFocused } from "@react-navigation/native";

import {apiUrl} from '../../../settings/networking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {taka} from '../../../assets/symbols';
import loaderContext from '../../../contexts/loaderContext';

const Tab = createMaterialTopTabNavigator();

const DepositListScreen = () => {

    const isFocused = useIsFocused();

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [stDeposits, setDeposits] = useState({
        tableHead: ['Deposit Name', 'Amount', 'Comment', 'Date'],
        tableData: [
            ['', '', '', ''],
        ]
    })

    const loadContext = useContext(loaderContext);

    useEffect( ()=>{
        //alert('1')
        //alert(loginToken);
        loadContext.loaderDispatch('loading');
        async function getStorageData() {
            let loginToken = await AsyncStorage.getItem('@storage_token');

            fetch(apiUrl + `Deposit/GetAll?pageIndex=0&pageSize=20`,
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

                    loadContext.loaderDispatch('loaded');

                    let listArray = result.data.map((data)=>{
                        /*return {
                            depositName: data.name,
                            amount: data.amount,
                            comment: data.description
                        };*/
                        return [
                            data.name,

                            `${taka} ${data.amount}`,

                            data.description,

                            moment(data.date).format('MMMM Do'),
                        ];
                    })

                    //console.log('------ddd---->',result.data)


                    setDeposits((prevState)=>{
                        return {
                            ...prevState,
                            tableData: [
                                ...listArray
                            ]
                        };
                    })

                }).catch((err)=>{
                //alert('4')
                loadContext.loaderDispatch('loaded');
                console.log('---------->', err)
            })
        }

        getStorageData();

        /*return ()=>{

            alert('d');
            /!*setDeposits({
                tableHead: ['Deposit Name', 'Amount', 'Comment'],
                tableData: [
                    ['', '', ''],
                ]
            })*!/
        }*/

    }, [isFocused]);

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
                    {loadContext.loader && <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(196,196,196,0.72)',
                        zIndex: 1,
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    </View>}

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
    head: { height: 60, backgroundColor: '#cccccc' },
    text: { margin: 6, fontWeight:'bold' },
    cell: { margin: 6 }
});

export default DepositAndWithdraw;
