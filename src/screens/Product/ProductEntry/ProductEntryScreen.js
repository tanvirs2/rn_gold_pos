/*eslint-disable*/

import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LocalInput = ({inputProps}) => {

    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{inputProps.placeholder}</Text>

            <CustomInput {...inputProps} />
        </View>
    );
}

const LocalSelect = ({inputProps}) => {

    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{inputProps.placeholder}</Text>

            <TouchableOpacity>
                <View style={{width:'100%', height: 50, padding: 13, borderRadius:5, borderColor: '#988686',
                    borderWidth: 1, flexDirection:'row', justifyContent:'space-between'}}>

                    <Text>Select...</Text>

                    <View style={{top:-3}}>
                        <Ionicons
                            name="chevron-down"
                            size={28}
                            color="#988686FF"
                        />
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
}

const ProductEntryScreen = () => {

    const [stProductName, setProductName] = useState('');

    return (
        <ScrollView>
            <View style={{padding:20}}>

                <LocalInput inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Product’s Name',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Weight (gm)',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Buying Price',
                    }
                }/>

                <LocalInput inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Selling Price',
                    }
                }/>


                <LocalSelect inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Karat',
                    }
                }/>

                <LocalSelect inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'Category',
                    }
                }/>

                <LocalSelect inputProps={
                    {
                        value: stProductName,
                        setValue: setProductName,
                        placeholder: 'TAX Effect',
                    }
                }/>


                <View style={{marginTop:30}}>

                    <CustomButton
                        text="Save"
                        bgColor="gold"
                    />

                </View>

            </View>
        </ScrollView>
    );
}

export default ProductEntryScreen;
