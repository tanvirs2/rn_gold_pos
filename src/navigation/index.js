
import {View, Text} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useState} from "react";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = () => {

    const [drawer, setDrawer] = useState(false);

    /*setTimeout(()=>{
        //setDrawer(drawer);
    }, 50000)*/


    return (
        <NavigationContainer>
            {
                drawer ? (
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen}/>
                    </Drawer.Navigator>
                ):(
                    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
                        <Stack.Screen name="SignIn" component={SignInScreen}/>
                        <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    </Stack.Navigator>
                )
            }

        </NavigationContainer>
    );
};

function TexComp() {
    return <View>
        <Text>dddd</Text>
    </View>
}

export default Navigation;
