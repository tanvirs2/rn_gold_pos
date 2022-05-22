/*eslint-disable*/
import React, {Fragment, useState} from 'react';
import {View, Text, Button} from 'react-native';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
/*import CameraScreen from '../screens/CameraScreen';*/

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

import Collapsible from 'react-native-collapsible';

//import {Ionicons, AntDesign} from '../components/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Sales from '../screens/Sales';
import InvoiceScreen from '../screens/Sales/SubPages/InvoiceScreen';
import ListOfSales from '../screens/Sales/SubPages/ListOfSales';
import withLoaderScreen from '../HOC/withLoaderScreen';
import DepositEntryScreen from '../screens/Deposit/DepositEntryScreen/DepositEntryScreen';
//import DepositListScreen from '../screens/Deposit/DepositListScreen/DepositListScreen';
import DepositAndWithdraw from '../screens/Deposit/DepositAndWithdraw/DepositAndWithdraw';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [isSalesCollapsed, isSetSalesCollapsed] = useState(true);
  const [isPurchaseCollapsed, isSetPurchaseCollapsed] = useState(true);
  const [isDepositCollapsed, isSetDepositCollapsed] = useState(true);
  const [isExpenseCollapsed, isSetExpenseCollapsed] = useState(true);
  const [isInventoryCollapsed, isSetInventoryCollapsed] = useState(true);
  const [isCrmCollapsed, isSetCrmCollapsed] = useState(true);
  const [isReportCollapsed, isSetReportCollapsed] = useState(true);
  const [isSettingsCollapsed, isSetSettingsCollapsed] = useState(true);


  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

        {/*<View style={{position:'absolute', right:-10, top:'30%', zIndex:999}}>
            <View>
                <Text style={{fontSize:50, fontWeight:'bold', color: 'red'}}>d</Text>
            </View>
        </View>*/}

      <CustomDrawerItem
        label="Sell Management"
        icon={
          <Ionicons
            name={isSalesCollapsed ? 'reader-outline' : 'reader'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetSalesCollapsed}
        isCollapsed={isSalesCollapsed}
      />

      <Collapsible collapsed={isSalesCollapsed}>
        {/*<View>
              <Text>ddd</Text>
              <Button
                  onPress={() => navigation.navigate('Sales')}
                  title="Go to notifications"
              />
          </View>*/}
        <View>
          <SubCustomDrawerItem label="SaleRetail/Wholesale" route="Sales" />
          <SubCustomDrawerItem label="Sales Return" />
          <SubCustomDrawerItem label="List of sales" />
          <SubCustomDrawerItem label="Due bill receive" />
        </View>
      </Collapsible>

      <CustomDrawerItem
        label="Stock Search"
        icon={
          <Ionicons name="file-tray-full-outline" size={24} color="black" />
        }
        dropdown={false}
      />
      {/*Puchase*/}
      <CustomDrawerItem
        label="Purchase"
        icon={
          <Ionicons
            name={isPurchaseCollapsed ? 'cart-outline' : 'cart'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetPurchaseCollapsed}
        isCollapsed={isPurchaseCollapsed}
      />

      <Collapsible collapsed={isPurchaseCollapsed}>
        <View>
          <SubCustomDrawerItem label="New Gold Purchase" />
          <SubCustomDrawerItem label="New Gold Purchase List" />
          <SubCustomDrawerItem label="Old Gold Purchase" />
          <SubCustomDrawerItem label="Old Gold Purchase List" />
        </View>
      </Collapsible>

      <CustomDrawerItem
        label="Deposit/Withdraw"
        icon={
          <Ionicons
            name={isDepositCollapsed ? 'card-outline' : 'card'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetDepositCollapsed}
        isCollapsed={isDepositCollapsed}
      />
      <Collapsible collapsed={isDepositCollapsed}>
        <View>
          <SubCustomDrawerItem label="Deposit /Withdraw Entry" />
          <SubCustomDrawerItem label="Deposit /Withdraw List" />
        </View>
      </Collapsible>

      <CustomDrawerItem
        label="Expense"
        icon={
          <Ionicons
            name={isExpenseCollapsed ? 'cash-outline' : 'cash'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetExpenseCollapsed}
        isCollapsed={isExpenseCollapsed}
      />
      <Collapsible collapsed={isExpenseCollapsed}>
        <View>
          <SubCustomDrawerItem label="Expense Entry" />
          <SubCustomDrawerItem label="Expense List" />
        </View>
      </Collapsible>

        <CustomDrawerItem
        label="Inventory"
        icon={
          <Ionicons
            name={isInventoryCollapsed ? 'file-tray-stacked-outline' : 'file-tray-stacked'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetInventoryCollapsed}
        isCollapsed={isInventoryCollapsed}
      />
      <Collapsible collapsed={isInventoryCollapsed}>
        <View>
          <SubCustomDrawerItem label="Product List" />
          <SubCustomDrawerItem label="Product Categories" />
        </View>
      </Collapsible>

        <CustomDrawerItem
        label="CRM (Wholesale)"
        icon={
          <Ionicons
            name={isCrmCollapsed ? 'people-outline' : 'people'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetCrmCollapsed}
        isCollapsed={isCrmCollapsed}
      />
      <Collapsible collapsed={isCrmCollapsed}>
        <View>
          <SubCustomDrawerItem label="Wholesaler Entry" />
          <SubCustomDrawerItem label="Wholesaler List" />
        </View>
      </Collapsible>

        <CustomDrawerItem
        label="Report"
        icon={
          <Ionicons
            name={isReportCollapsed ? 'newspaper-outline' : 'newspaper'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetReportCollapsed}
        isCollapsed={isReportCollapsed}
      />
      <Collapsible collapsed={isReportCollapsed}>
        <View>
          <SubCustomDrawerItem label="Daily Report" />
          <SubCustomDrawerItem label="Category Wise Report" />
        </View>
      </Collapsible>

        <CustomDrawerItem
        label="Settings"
        icon={
          <Ionicons
            name={isSettingsCollapsed ? 'settings-outline' : 'settings'}
            size={24}
            color="black"
          />
        }
        isSetCollapsed={isSetSettingsCollapsed}
        isCollapsed={isSettingsCollapsed}
      />
      <Collapsible collapsed={isSettingsCollapsed}>
        <View>
          <SubCustomDrawerItem label="VAT/TAX" />
          <SubCustomDrawerItem label="Category" />
          <SubCustomDrawerItem label="Carats" />
          <SubCustomDrawerItem label="Users" />
        </View>
      </Collapsible>

    </DrawerContentScrollView>
  );
}

const SubCustomDrawerItem = ({label, route}) => {
  const navigation = useNavigation();

  const navigateRoute = () => {
    navigation.navigate(route);
  };

  return (
    <DrawerItem
      label={label}
      style={{
        backgroundColor: '#F3E8CBFF',
      }}
      labelStyle={{
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#000',
      }}
      onPress={navigateRoute}
    />
  );
};

const CustomDrawerItem = ({
  label,
  isSetCollapsed,
  isCollapsed,
  icon,
  dropdown = true,
}) => {
  return (
    <DrawerItem
      label={label}
      style={{
        backgroundColor: 'rgba(177,185,114,0.8)',
      }}
      labelStyle={{
        position: 'absolute',
        top: -10,
        left: -20,
        fontWeight: 'bold',
      }}
      onPress={() => (dropdown ? isSetCollapsed(!isCollapsed) : null)}
      activeTintColor="red"
      icon={({focused, color, size}) => (
        <Fragment>
          {icon}

          {dropdown && (
            <AntDesign
              style={{
                alignSelf: 'center',
                position: 'absolute',
                right: 10,
              }}
              name={isCollapsed ? 'downcircleo' : 'upcircle'}
              size={24}
              color="black"
            />
          )}
        </Fragment>
      )}
    />
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{headerShown: true}}
        initialRouteName="Deposit & Withdraw">
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
        <Drawer.Screen name="Deposit Entry" component={DepositEntryScreen} />
        <Drawer.Screen name="Deposit & Withdraw" component={DepositAndWithdraw} />
        {/*<Drawer.Screen name="Camera" component={CameraScreen} />*/}
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
