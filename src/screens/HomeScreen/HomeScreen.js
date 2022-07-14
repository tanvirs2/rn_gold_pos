import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customFetch} from '../../settings/networking';
import {taka} from '../../assets/symbols';
import {checkCameraPermissionFirst} from '../../settings/ComponentLib2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {LocalSelect} from '../../settings/ComponentLib';




const HomeScreen = () => {

    const useFocus = useIsFocused();

    const [stGetAllDailySummery, setGetAllDailySummery] = useState([]);
    const [stShopNameIndex, setShopNameIndex] = useState(0);
    const [stInfoBadgesData, setInfoBadgesData] = useState([]);

    const [stUser, setUser] = useState({username: '', userRole: ''});


    useEffect(()=>{

        (async ()=>{
            await checkCameraPermissionFirst();

            let menuObjectFromStorage = await AsyncStorage.getItem('@menuObject');
            let {username, userRole} = JSON.parse(menuObjectFromStorage); //username userRole
            setUser({username, userRole})
        })()

        dashboardDataFace();

        if (stGetAllDailySummery.length > 0) {
            infoBadgesPopulate(stGetAllDailySummery[stShopNameIndex])
        }


    }, [useFocus, stShopNameIndex]);


    const dashboardDataFace = () => {
        customFetch({
            url: 'Dashboard/GetAllDailySummery',
            callbackResult: (result) => {

                //console.log(result);

                setGetAllDailySummery(result);
                /*
                * {"shopName": "New Apan Jewellers", "totalDeposite": 0, "totalDueBill": 0, "totalExpence": 0, "totalPurchase": 0, "totalSale": 0, "totalWithdraw": 0}
                * */
                infoBadgesPopulate(result[stShopNameIndex])
            },
        });
    }

    const infoBadgesPopulate = (result) => {

        //console.log('-----', stGetAllDailySummery);

        const {
            totalDeposite,
            totalDueBill,
            totalExpence,
            totalPurchase,
            totalSale,
            totalWithdraw,
        } = result;


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
    }

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

                    <View style={{width: '80%'}}>
                        <LocalSelect
                            data={stGetAllDailySummery}
                            buttonTextAfterSelection="shopName"
                            selectProps={{
                                value: 0,
                                setValue: setShopNameIndex,
                                placeholder: 'Select Shop',
                                placeholderAlign: 'center'
                            }}
                        />
                    </View>

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
