import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {apiUrl} from '../../settings/networking';

export default function SignInScreen() {
  const {height} = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const onSignInPressed = () => {
    setIsLoading(true);

    fetch(
      apiUrl + `Device/Authenticate?userName=${username}&password=${password}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        setIsLoading(false);

        if (json.accessToken) {
          navigation.navigate('Home');
          setUserToken(json.accessToken);
        }

        console.log(json, json.accessToken);
      })
      .catch(err => alert(err));
  };
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

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
