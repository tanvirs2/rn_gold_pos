import AsyncStorage from '@react-native-async-storage/async-storage';

const loginToken = async () => {
    //await AsyncStorage.setItem('@storage_token', 'aa');
    return await AsyncStorage.getItem('@storage_token');
};

export default loginToken;
