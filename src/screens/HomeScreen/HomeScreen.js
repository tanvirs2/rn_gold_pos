import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customFetch} from '../../settings/networking';
import {taka} from '../../assets/symbols';
import {checkCameraPermissionFirst} from '../../settings/ComponentLib2';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeScreen = () => {

    const [stInfoBadgesData, setInfoBadgesData] = useState([
        {value: '000', iconName: 'reader-outline', label: 'Total Sale'},
        {value: '000', iconName: 'card-outline', label: 'Total Deposit'},
        {value: '000', iconName: 'wallet-outline', label: 'Total Withdrawn'},
        {value: '000', iconName: 'thumbs-down-outline', label: 'Total Due Receive'},
        {value: '000', iconName: 'cart-outline', label: 'Total Purchase'},
        {value: '000', iconName: 'receipt-outline', label: 'Total Sale Return'},
        {value: '000', iconName: 'cash-outline', label: 'Total Expense'},
        {value: '000', iconName: 'podium-outline', label: 'Total Profit'},
    ]);

    const [stUser, setUser] = useState({username: '', userRole: ''});

    useEffect(()=>{

        (async ()=>{
            await checkCameraPermissionFirst();

            let menuObjectFromStorage = await AsyncStorage.getItem('@menuObject');
            let {username, userRole} = JSON.parse(menuObjectFromStorage); //username userRole
            setUser({username, userRole})
        })()


        customFetch({
            url: 'Dashboard/GetAllDailySummery',
            callbackResult: (result) => {

                const {
                    totalSale,
                    totalDeposite,
                    totalWithdraw,
                    totalDueBill,
                    totalPurchase,
                    totalExpence,
                } = result[0];


                setInfoBadgesData([
                    {value: `${taka}${totalSale}`, iconName: 'reader-outline', label: 'Total Sale'},
                    {value: `${taka}${totalDeposite}`, iconName: 'card-outline', label: 'Total Deposit'},
                    {value: `${taka}${totalWithdraw}`, iconName: 'wallet-outline', label: 'Total Withdrawn'},
                    {value: `${taka}${totalDueBill}`, iconName: 'thumbs-down-outline', label: 'Total Due Bill'},
                    {value: `${taka}${totalPurchase}`, iconName: 'cart-outline', label: 'Total Purchase'},
                    {value: `${taka}${totalExpence}`, iconName: 'cash-outline', label: 'Total Expense'},
                    {value: `${taka}0`, iconName: 'receipt-outline', label: 'Total Sale Return'},
                    {value: `${taka}0`, iconName: 'podium-outline', label: 'Total Profit'},
                ])
            },
        });
    }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10, color: '#000'}}>
            Welcome Back!
          </Text>

            <Text style={{fontSize: 28, marginTop: 5, color: '#525151'}}>
              {stUser.username}
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#966c30'}}>
              Role : {stUser.userRole}
            </Text>

            {
                stUser.userRole === 'Admin' || stUser.userRole === 'Manager' ? <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    {stInfoBadgesData.map(({value, iconName, label}, index) => {
                        return (
                            <InfoBadge
                                key={index}
                                value={value}
                                iconName={iconName}
                                label={label}
                            />
                        );
                    })}
                </View> :
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                        
                    </View>
            }


        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoBadge = ({label, value, iconName}) => {
  return (
    <View
      style={{
        backgroundColor: '#e1e1e1',
        margin: 10,
        borderRadius: 5,
        height: 150,
        padding: 10,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{padding: 10, backgroundColor: '#aed9a8', borderRadius: 10}}>
        <Ionicons name={iconName} size={35} color="green" />
      </View>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6b6565'}}>
        {label}
      </Text>
      <Text style={{fontSize: 25, fontWeight: 'bold', color: '#000'}}>{value}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
