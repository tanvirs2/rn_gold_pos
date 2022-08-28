import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import DrawerNavigation from '../navigationDrawer';
import withLoaderScreen from '../HOC/withLoaderScreen';
//import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={withLoaderScreen(SignInScreen, {token: false})}/>
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation}/>
                {/*<Stack.Screen name="SignUp" component={SignUpScreen}/>*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Navigation;
