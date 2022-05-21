/*eslint-disable*/
import React from 'react';
import {Text, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListOfSales = () => {

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width:'90%', flex: 1}}>
                <View style={{marginTop:15, alignItems: 'center'}}>
                    <Text style={{fontSize:28, fontWeight:'bold'}}>List of Sales</Text>
                </View>

                <View style={{flex: 1, alignItems: 'flex-start', marginTop:45, width:'100%'}}>
                    <Text style={{fontSize:20, marginBottom:10}}>Search Invoice Number </Text>

                    <View style={{width:'100%', flexDirection:'row'}}>
                        <View style={{width:'75%', marginRight:'5%'}}>
                            <CustomInput/>
                        </View>

                        <View style={{width:'20%'}}>
                            <CustomButton text={<Ionicons
                                color="red"
                                size={23}
                                name={'search-outline'}
                            />}
                                          bgColor="white"
                            />
                        </View>
                    </View>
                </View>

            </View>
        </View>
    );
}

export default ListOfSales;
