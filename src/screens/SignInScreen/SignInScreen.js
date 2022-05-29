/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator, ToastAndroid,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../../settings/networking';
import loaderContext from '../../contexts/loaderContext';

export default function SignInScreen({route}) {
  const {height} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [username, setUsername] = useState('admin'); //'admin'
  const [password, setPassword] = useState('Admin@1'); //'Admin@1'
  const [stMenu, setMenu] = useState({}); //'Admin@1'

  useEffect(()=>{

    if (route.params) {

      //console.log(route.params);

      const { msg, token } = route.params;

      ToastAndroid.showWithGravity(
          msg,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
      );
    }


    return ()=>{
      setIsLoading(null)
      setUserToken(null)
      /*setUsername(null)
      setPassword(null)*/
    }
  }, []);


  const loadContext = useContext(loaderContext);


  const navigation = useNavigation();

  const onSignInPressed = () => {
    //setIsLoading(true);

    loadContext.loaderDispatch('loading');

    fetch(
      apiUrl + `Device/Authenticate?userName=${username}&password=${password}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'Admin@1',
        }),
      },
    )
      .then(res => res.json())
      .then(async json => {
        //alert('dd');
        setIsLoading(false);

        if (json.accessToken) {

          loadContext.loaderDispatch('loaded');

          setUserToken(json.accessToken);

          await storeToken(json.accessToken);


          navigation.navigate('Home');
        }

        //console.log(json, json.accessToken);
      })
      .catch(err => {
        setIsLoading(false);

        alert(err);
      });
  };

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_token', value)
      let loginToken = await AsyncStorage.getItem('@storage_token');

      const getMenu = () => {
        fetch(apiUrl + `ApplicationSettings/GetConfigurationMenuSettings`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${loginToken}`,
          },
        })
            .then(response => response.json())
            .then(async result=>{
              //console.log('----cccccccc',result.menuItems[0].items.length,result.menuItems[0].items)

              AsyncStorage.setItem('@storage_menu', JSON.stringify(result.menuItems[0].items))
                  .then(value=>console.log(value))

              /*let gg = await AsyncStorage.getItem('@storage_menu');
              console.log(gg)*/
              //setMenu(result.menuItems[0].items);
            })
      }

      getMenu();

    } catch (e) {
      // saving error

    }
  }
  /*const onSignInWithFacebookPressed = () => {
        console.warn('Hello')
    }
    const onSignInWithGooglePressed = () => {
        console.warn('Hello')
    }
    const onSignInWithApplePressed = () => {
        console.warn('Hello')
    }
    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed')
    }
    const onCreateOnePressed = () => {
        //console.warn('onCreateOnePressed')
        navigation.navigate('SignUp');
    }*/

  /*if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }*/

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.container, {height}]}>
          <Image
            source={logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />

          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry
          />
          <CustomButton text="Sign in" onPress={onSignInPressed} />

          {/*<CustomButton text="Forgot Password" onPress={onForgotPasswordPressed} type="tertiary"/>
                    <CustomButton text="Sign in with Facebook" onPress={onSignInWithFacebookPressed} bgColor="#B4BDFFCC" fgColor="#2846FFCC"/>
                    <CustomButton text="Sign in with Google" onPress={onSignInWithGooglePressed} bgColor="#ECD9DAFF" fgColor="#DA2C3DFF"/>
                    <CustomButton text="Sign in with Apple" onPress={onSignInWithApplePressed} bgColor="#93939347" fgColor="#202020CC"/>
                    <CustomButton text="Dont have an account? Create one" onPress={onCreateOnePressed} type="tertiary"/>*/}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    color: 'rgba(147,147,147,0.28)',
    backgroundColor: '#f39c12',
    height: '100%',
  },
  logo: {
    height: 100,
    width: 200,
    maxWidth: 500,
    maxHeight: 300,
  },
});
