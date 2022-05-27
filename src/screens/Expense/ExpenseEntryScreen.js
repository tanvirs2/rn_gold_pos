/*eslint-disable*/

import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import LoaderViewScreen from '../../components/LoaderView/LoaderViewScreen';
import {ScrollView, Text, View} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {apiUrl} from '../../settings/networking';
import {globalButtonColor} from '../../settings/color';


const ExpenseEntryScreen = () => {

    const [stLoader, setLoader] = useState(false);

    const [stExpenseName, setExpenseName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');
    const [stShopId, setShopId] = useState(1);
    const [stId, setId] = useState(0);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const dataSave = async () => {
        setLoader(true);

        let loginToken = await AsyncStorage.getItem('@storage_token');

        fetch(apiUrl + `Expense/Upsert`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${loginToken}`,
            },
            body: JSON.stringify({
                "id": stId,
                "description": stComment,
                "name": stExpenseName,
                "comment": stComment,
                "amount": stAmount,
                "date": moment(date).format('Y-MM-DD'),
                "shopId": stShopId
            })
        })
            .then(response => response.json())
            .then(result => {
                setLoader(false);
                console.log(result);

                setExpenseName('');
                setAmount('');
                setComment('');
                setShopId(1);
                setId(0);

                setDate(new Date());
                setOpen(false);
            })
    }

    return (
        <View>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <ScrollView>
                <View style={{marginTop:30,padding:20}}>
                    <View>
                        <Text style={{fontSize:20, marginBottom:10}}>Expense Name</Text>
                        <CustomInput
                            value={stExpenseName}
                            setValue={setExpenseName}
                            placeholder="Expense Name"
                        />
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Amount</Text>
                        <CustomInput
                            value={stAmount}
                            setValue={setAmount}
                            placeholder="Amount"
                        />
                    </View>

                    <View style={{marginTop:30}}>

                        <Text style={{fontSize:20, marginBottom:10}}>Date </Text>
                        <CustomButton
                            text={
                                <Text>

                                    {moment(date).format('Y-MM-DD')}

                                    &nbsp; ( {moment(date).format('MMMM Do')} )

                                    &nbsp;<Ionicons name="calendar-outline" size={24} color="#000"/>

                                </Text>
                            }
                            type="border"
                            onPress={() => {
                                //console.log(moment(date).format('Y-MM-DD'));
                                setOpen(true);
                            }}
                        />


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

                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Comment</Text>
                        <CustomInput
                            value={stComment}
                            setValue={setComment}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View style={{marginTop:30}}>

                        <CustomButton
                            text="Add"
                            bgColor={globalButtonColor}
                            onPress={dataSave}
                        />

                    </View>

                </View>
            </ScrollView>
        </View>
    );
}


export default ExpenseEntryScreen;
