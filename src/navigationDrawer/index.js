/*eslint-disable*/
import React, {Fragment, useState} from 'react';
import {View, Text, Button, Image, useWindowDimensions, TouchableOpacity} from 'react-native';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';


//import {Ionicons, AntDesign} from '../components/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sales from '../screens/Sales';
import InvoiceScreen from '../screens/Sales/SubPages/InvoiceScreen';
import withLoaderScreen from '../HOC/withLoaderScreen';
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
import {globalBackgroundColor} from '../settings/color';
import logo from '../../assets/images/logo.png';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

    const {height} = useWindowDimensions();

    return (
        <Fragment>

            <View style={{height: 104, alignItems: 'center', shadowColor:'#000', elevation: 50, backgroundColor: '#3b3b3b'}}>
                <Image
                    source={logo}
                    style={{height: height * 0.13, width: 170}}
                    resizeMode="contain"
                />
            </View>

            <DrawerContentScrollView {...props}>

                <DrawerItemList {...props} />


                {/*<View style={{position:'absolute', right:-10, top:'30%', zIndex:999}}>
            <View>
                <Text style={{fontSize:50, fontWeight:'bold', color: 'red'}}>d</Text>
            </View>
        </View>*/}

                {
                    menuObject.menuItems.map((mainMenu, mainMenuIndex) => {

                        return (
                            <NavMenu key={mainMenuIndex} mainMenu={mainMenu}/>
                        );
                    })
                }


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
                <TouchableOpacity style={{width:'100%'}}>
                    <View style={{padding: 5, borderColor: '#545454',
                        borderWidth: 1, borderRadius: 3, backgroundColor:'#fff', alignItems: 'center'}}>
                        <Text style={{fontWeight:'bold', fontSize:20, color: '#000'}}>
                            <Ionicons name="log-out-outline" size={24} color="black" />&nbsp;
                            LOGOUT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </Fragment>
    );
}


const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{headerShown: true}}
        initialRouteName="Sales">
        <Drawer.Screen
          options={{
            drawerIcon: ({focused, color, size}) => (
              <Ionicons
                color={color}
                size={size}
                name={focused ? 'heart-circle-outline' : 'heart-outline'}
              />
            ),
          }}
          name="SignIn"
          component={withLoaderScreen(SignInScreen, {token: false})}
        />
        <Drawer.Screen name="SignUp" component={SignUpScreen} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Sales" component={Sales} />
        <Drawer.Screen name="Invoice" component={InvoiceScreen} />
        <Drawer.Screen name="Deposit & Withdraw List" component={DepositAndWithdraw} />
        <Drawer.Screen name="Deposit & Withdraw Entry" component={DepositAndWithdrawEntry} />
        <Drawer.Screen name="Product List" component={ProductListScreen} />
        <Drawer.Screen name="Stock Entry" component={ProductEntryScreen} />
        <Drawer.Screen name="Expense Entry" component={ExpenseEntryScreen} />
        <Drawer.Screen name="Expense List" component={ExpenseListScreen} />
        <Drawer.Screen name="Product Categories" component={ProductCategoryListScreen} />
        <Drawer.Screen name="Product Categories Entry" component={ProductCategoryEntryScreen} />
        <Drawer.Screen name="List Of Sales" component={TabListOfSales} />
        <Drawer.Screen name="Product Details Invoice" component={ProductDetailsInvoiceScreen} />
        <Drawer.Screen name="Camera" component={CameraScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
/*
function TexComp() {
  return (
    <View>
      <Text>dddd</Text>
    </View>
  );
}*/

export default Navigation;
