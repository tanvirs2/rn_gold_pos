/*eslint-disable*/

import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';

const DepositEntryScreen = () => {

    const [stDepositName, setDepositName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');

    return (
        <View>
            <View style={{marginTop:30,padding:20}}>
                <View>
                    <Text style={{fontSize:20, marginBottom:10}}>Deposit Name</Text>
                    <CustomInput
                        value={stDepositName}
                        setValue={setDepositName}
                        placeholder="Deposit Name"
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
                        bgColor="gold"
                    />

                </View>

            </View>
        </View>
    );
}

export default DepositEntryScreen;
