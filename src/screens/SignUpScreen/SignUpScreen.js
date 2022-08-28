import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {useState} from 'react';
import logo from '../../../assets/images/nature-logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  //const navigation = useNavigation();

  const onSignInPressed = () => {
    //console.warn('Hello')
    navigation.navigate('SignIn');
  };
  const onSignInWithFacebookPressed = () => {
    console.warn('Hello');
  };
  const onSignInWithGooglePressed = () => {
    console.warn('Hello');
  };
  const onSignInWithApplePressed = () => {
    console.warn('Hello');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Create an Account</Text>

          <CustomInput
            placeholder="Username"
            value={username}
            setValue={setUsername}
          />
          <CustomInput placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput
            placeholder="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry
          />
          <CustomInput
            placeholder="Repeat Password"
            value={passwordRepeat}
            setValue={setPasswordRepeat}
            secureTextEntry
          />

          <CustomButton text="Register" onPress={onSignInPressed} />

          <Text style={styles.text}>
            By registering, you confirm that you accept our
            <Text style={styles.link}> terms of use </Text>
            and
            <Text style={styles.link}> privacy policy</Text>
          </Text>

          <CustomButton
            text="Sign in with Facebook"
            onPress={onSignInWithFacebookPressed}
            bgColor="#B4BDFFCC"
            fgColor="#2846FFCC"
          />
          <CustomButton
            text="Sign in with Google"
            onPress={onSignInWithGooglePressed}
            bgColor="#ECD9DAFF"
            fgColor="#DA2C3DFF"
          />
          <CustomButton
            text="Sign in with Apple"
            onPress={onSignInWithApplePressed}
            bgColor="#93939347"
            fgColor="#202020CC"
          />
          <CustomButton
            text="Sign In"
            onPress={onSignInPressed}
            type="tertiary"
          />
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
  },
  title: {
    color: '#051C60',
    margin: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 10,
    color: 'gray',
  },
  link: {
    color: '#fdb075',
  },
});
