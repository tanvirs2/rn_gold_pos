import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {Fragment} from 'react';

let today = (
  <Fragment>
    <Ionicons name="calendar-outline" size={24} color="white" />
    &nbsp;
    <Text style={{color: 'gray'}}>Today</Text>{' '}
    <Text> {moment().format('MMMM Do')}</Text>
  </Fragment>
);

const countries = [today, 'Canada', 'Australia', 'Ireland'];
const infoBadgesData = [
  {value: '$45,000', iconName: 'reader-outline', label: 'Total Sale'},
  {value: '$76,000', iconName: 'card-outline', label: 'Total Deposit'},
  {value: '$12,000', iconName: 'wallet-outline', label: 'Total Withdrawn'},
  {
    value: '$45,000',
    iconName: 'thumbs-down-outline',
    label: 'Total Due Receive',
  },
  {value: '$76,000', iconName: 'cart-outline', label: 'Total Purchase'},
  {value: '$12,000', iconName: 'receipt-outline', label: 'Total Sale Return'},
  {value: '$45,000', iconName: 'cash-outline', label: 'Total Expense'},
  {value: '$76,000', iconName: 'podium-outline', label: 'Total Profit'},
];

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginTop: 10}}>
            Welcome Back!
          </Text>
          <Text style={{fontSize: 25, marginTop: 10, color: '#525151'}}>
            Manager
          </Text>

          <View>
            <SelectDropdown
              buttonTextStyle={{
                backgroundColor: '#000',
                color: 'white',
                paddingVertical: 3,
                borderRadius: 10,
                width: 100,
              }}
              defaultValue={today}
              data={countries}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            {infoBadgesData.map(({value, iconName, label}, index) => {
              return (
                <InfoBadge
                  key={index}
                  value={value}
                  iconName={iconName}
                  label={label}
                />
              );
            })}
          </View>
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
        height: 170,
        padding: 10,
        width: 170,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{padding: 10, backgroundColor: '#aed9a8', borderRadius: 10}}>
        <Ionicons name={iconName} size={35} color="green" />
      </View>
      <Text style={{fontSize: 15, fontWeight: 'bold', color: '#6b6565'}}>
        {label}
      </Text>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>{value}</Text>
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
