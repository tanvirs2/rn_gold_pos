
import React, {Fragment, useEffect, useState} from 'react';
import {View, Text, Image, useWindowDimensions, TouchableOpacity, ToastAndroid, ImageBackground} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Sales from '../screens/Sales';
import InvoiceScreen from '../screens/Sales/SubPages/InvoiceScreen';
//import DepositListScreen from '../screens/Deposit/DepositListScreen/DepositListScreen';
import DepositAndWithdraw from '../screens/Deposit/DepositAndWithdraw/DepositAndWithdraw';
import DepositAndWithdrawEntry from '../screens/Deposit/DepositNwithdrawEntryScreen/DepositAndWithdrawEntry';
import ProductListScreen from '../screens/Product/ProductListScreen';
import menuObject from '../settings/menuObject';
import NavMenu from '../components/NavMenu/NavMenu';
import ProductEntryScreen from '../screens/Product/ProductEntry/ProductEntryScreen';
import ExpenseEntryScreen from '../screens/Expense/ExpenseEntryScreen';
import ExpenseListScreen from '../screens/Expense/ExpenseListScreen';
import ProductCategoryListScreen from '../screens/ProductCategory/ProductCategoryListScreen';
import ProductCategoryEntryScreen from '../screens/ProductCategory/ProductCategoryEntryScreen';
import TabListOfSales from '../screens/Sales/SubPages/TabListOfSales';
import ProductDetailsInvoiceScreen from '../screens/Sales/SubPages/ProductDetailsInvoiceScreen';
import {globalBackgroundColor, globalBlackColor} from '../settings/color';
import logo from '../../assets/images/logo.png';
import golden_ratio_image from '../../assets/images/golden_ratio.jpg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customFetch} from '../settings/networking';
import DueBillsReceivedListScreen from '../screens/Due/DueBillsReceivedList/DueBillsReceivedListScreen';
import DueBillsReceivedEntryScreen from '../screens/Due/DueBillsReceivedEntry/DueBillsReceivedEntryScreen';
import CustomerListScreen from '../screens/Customer/CustomerListScreen';
import CustomerEntryScreen from '../screens/Customer/CustomerEntryScreen';
import PurchaseEntryTab from '../screens/Purchase/PurchaseEntryTab';
import PurchaseListTab from '../screens/Purchase/PurchaseListTab';
import UserContactScreen from '../screens/UserContact/UserContactScreen';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    let homeMenu = [
        {
            'label': 'Dashboard',
            'items': [
                {
                    'label': 'Home',
                    'url': '/home',
                },
            ],
        },
    ];

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const [stMenuObject, setMenuObject] = useState(homeMenu); //

    useEffect(()=>{
        (async ()=>{
            //alert('ddddd')
            let menuObjectFromStorage = await AsyncStorage.getItem('@menuObject');
            let mainMenuFromDB = JSON.parse(menuObjectFromStorage).menuItems[0].items;
            //console.log([...mainMenuFromDB])
            setMenuObject(homeMenu.concat(mainMenuFromDB));
        })()
    }, []);

    return (
        <Fragment>

            <View style={{height: 104,
                alignItems: 'center',
                shadowColor:'#000',
                elevation: 50,
                backgroundColor: '#2a2a2a'
            }}>

                <ImageBackground source={golden_ratio_image} resizeMode="cover" style={{justifyContent:'center',
                    height: '100%', width:'100%'}}>
                    <View  style={{justifyContent:'center', alignItems: 'center',
                        height: '100%', width:'100%', backgroundColor:'rgba(54,49,16,0.8)'}} >

                        <Image
                            source={logo}
                            style={{height: height * 0.1, width: '70%'}}
                            resizeMode="contain"
                        />
                    </View>

                </ImageBackground>

                {/**/}
            </View>

            <DrawerContentScrollView {...props}>

                {/*<DrawerItemList {...props} />*/}


                {/*<View style={{position:'absolute', right:-10, top:'30%', zIndex:999}}>
                        <View>
                            <Text style={{fontSize:50, fontWeight:'bold', color: 'red'}}>d</Text>
                        </View>
                    </View>*/}

                {
                    stMenuObject.map((mainMenu, mainMenuIndex) => {

                        return (
                            <NavMenu key={mainMenuIndex} mainMenu={mainMenu}/>
                        );
                    })
                }

                <View style={{height:10}}/>

            </DrawerContentScrollView>

            <View style={{
                height: 50,
                padding: 5,
                alignItems: 'center',
                shadowColor:'#000',
                elevation: 50,
                borderTopWidth: 1,
                borderColor: '#888888',
                backgroundColor: '#b2b2b2'
            }}>
                <TouchableOpacity style={{width:'100%'}} onPress={()=>{
                    (async ()=>{
                        await AsyncStorage.removeItem('@storage_token');

                        ToastAndroid.showWithGravity(
                            'Logout !',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        );

                        navigation.navigate('SignIn');
                    })()
                }}>
                    <View style={{padding: 5, borderColor: '#545454',
                        borderWidth: 1, borderRadius: 3, backgroundColor:globalBackgroundColor, alignItems: 'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:20, color: globalBlackColor}}>
                            <Ionicons name="log-out-outline" size={24} color={globalBlackColor} />&nbsp;
                            LOGOUT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </Fragment>
    );
}


const DrawerNavigation = () => {
  return (
      <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          screenOptions={{headerShown: true, cardStyle: { backgroundColor: 'red' }}}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Sales" component={Sales} />
          <Drawer.Screen name="Invoice" component={InvoiceScreen} />
          <Drawer.Screen name="Deposit & Withdraw List" component={DepositAndWithdraw} />
          <Drawer.Screen name="Deposit & Withdraw Entry" component={DepositAndWithdrawEntry} />
          <Drawer.Screen name="Deposit & Withdraw Edit" component={DepositAndWithdrawEntry} />
          <Drawer.Screen name="Product List" component={ProductListScreen} />
          <Drawer.Screen name="Stock Entry" component={ProductEntryScreen} />
          <Drawer.Screen name="Stock Edit" component={ProductEntryScreen} />
          <Drawer.Screen name="Expense Entry" component={ExpenseEntryScreen} />
          <Drawer.Screen name="Expense Edit" component={ExpenseEntryScreen} />
          <Drawer.Screen name="Expense List" component={ExpenseListScreen} />
          <Drawer.Screen name="Product Categories" component={ProductCategoryListScreen} />
          <Drawer.Screen name="Product Category Entry" component={ProductCategoryEntryScreen} />
          <Drawer.Screen name="Product Category Edit" component={ProductCategoryEntryScreen} />
          <Drawer.Screen name="List Of Sales" component={TabListOfSales} />
          <Drawer.Screen name="Product Details Invoice" component={ProductDetailsInvoiceScreen} />
          <Drawer.Screen name="Due Receive List" component={DueBillsReceivedListScreen} />
          <Drawer.Screen name="Due Receive Entry" component={DueBillsReceivedEntryScreen} />
          <Drawer.Screen name="Due Receive Edit" component={DueBillsReceivedEntryScreen} />
          <Drawer.Screen name="Customer Entry" component={CustomerEntryScreen} />
          <Drawer.Screen name="Customer Edit" component={CustomerEntryScreen} />
          <Drawer.Screen name="Customer List" component={CustomerListScreen} />
          <Drawer.Screen name="Purchase Entry" component={PurchaseEntryTab} />
          <Drawer.Screen name="Purchase List" component={PurchaseListTab} />
          <Drawer.Screen name="Users" component={UserContactScreen} />
          <Drawer.Screen name="Camera" component={CameraScreen} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigation;
