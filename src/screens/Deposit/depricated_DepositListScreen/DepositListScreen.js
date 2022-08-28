/*eslint-disable*/

import React, {Fragment, useState} from 'react';
import {Button, Text, View, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const DepositListScreen = () => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <View>
            <View style={{marginTop:10,padding:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>Deposit & Withdraw</Text>

                <View>
                    <Pressable onPress={() => setOpen(true)} >
                        <View style={{backgroundColor:'#000', paddingHorizontal:10, paddingVertical:5, borderRadius:10, flexDirection:'row', marginTop:30}}>


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

                <View>

                </View>

            </View>
        </View>
    );
}

const WithdrawListScreen = () => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    return (
        <View>
            <View style={{marginTop:10,padding:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, fontWeight:'bold'}}>Deposit & Withdraw</Text>

                <View>
                    <Pressable onPress={() => setOpen(true)} >
                        <View style={{backgroundColor:'#000', paddingHorizontal:10, paddingVertical:5, borderRadius:10, flexDirection:'row', marginTop:30}}>


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

export default DepositAndWithdraw;
