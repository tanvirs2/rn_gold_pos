/*eslint-disable*/
import React, {Fragment, useState} from 'react';
import {View, Text, Button} from 'react-native';

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
import ListOfSales from '../screens/Sales/SubPages/ListOfSales';
import withLoaderScreen from '../HOC/withLoaderScreen';
//import DepositListScreen from '../screens/Deposit/DepositListScreen/DepositListScreen';
import DepositAndWithdraw from '../screens/Deposit/DepositAndWithdraw/DepositAndWithdraw';
import DepositAndWithdrawEntry from '../screens/Deposit/DepositNwithdrawEntryScreen/DepositAndWithdrawEntry';
import ProductListScreen from '../screens/Product/ProductListScreen';
import menuObject from '../settings/menuObject';
import NavMenu from '../components/NavMenu/NavMenu';
import ProductEntryScreen from '../screens/Product/ProductEntry/ProductEntryScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {


    return (
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
    );
}


const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{headerShown: true}}
        initialRouteName="Product Entry">
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
        <Drawer.Screen name="Sale List" component={ListOfSales} />
        <Drawer.Screen name="Deposit & Withdraw List" component={DepositAndWithdraw} />
        <Drawer.Screen name="Deposit & Withdraw Entry" component={DepositAndWithdrawEntry} />
        <Drawer.Screen name="Product List" component={ProductListScreen} />
        <Drawer.Screen name="Product Entry" component={ProductEntryScreen} />
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
