/* eslint-disable */
import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  ScrollView, ImageBackground,
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
import {globalBlackColor, globalButtonColor} from '../../settings/color';
import golden_ratio_image_hd from '../../../assets/images/golden_ratio_hd.jpg';

export default function SignInScreen({route}) {
  const {height} = useWindowDimensions();

  //const screenMiddle = Math.floor(height / 2);

  //console.log('screenMiddle', screenMiddle)

  const [username, setUsername] = useState('admin'); //'admin'
  const [password, setPassword] = useState('Admin@1'); //'Admin@1'
  //const [stMenu, setMenu] = useState({}); //'Admin@1'

  useEffect(()=>{

    return ()=>{
      /*setUsername(null)
      setPassword(null)*/
    }
  }, []);


  const loadContext = useContext(loaderContext);


  const navigation = useNavigation();

  const onSignInPressed = () => {

    loadContext.loaderDispatch('loading');

    fetch(
      apiUrl + `Device/Login`,
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

        if (json.accessToken) {

          loadContext.loaderDispatch('loaded');

          await storeToken(json.accessToken);

          navigation.navigate('DrawerNavigation');
        }

        //console.log(json, json.accessToken);
      })
      .catch(err => {
        alert(err);
      });
  };

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_token', value)
      /*let loginToken = await AsyncStorage.getItem('@storage_token');

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

              /!*AsyncStorage.setItem('@storage_menu', JSON.stringify(result.menuItems[0].items))
                  .then(value=>console.log('value', value))*!/

              /!*let gg = await AsyncStorage.getItem('@storage_menu');
              console.log(gg)*!/
              //setMenu(result.menuItems[0].items);
            })
      }

      getMenu();*/
    } catch (e) {
      // saving error
    }
  }


  return (
    <SafeAreaView>
      <ImageBackground source={golden_ratio_image_hd} resizeMode="cover" style={{height:'100%'}}>
        <View style={[styles.container, {height, alignItems: 'center'}]}>
        <Image
            source={logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
        />

        <View style={{width:'95%', marginTop:100}}>
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
          <View style={{marginTop:20}}>
            <CustomButton text="Log in" bgColor={globalButtonColor} onPress={onSignInPressed} />
          </View>
        </View>

      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    color: 'rgba(147,147,147,0.28)',
    //backgroundColor: globalBlackColor,
    height: '100%',
  },
  logo: {
    height: 100,
    width: 200,
    maxWidth: 500,
    maxHeight: 300,
  },
});
