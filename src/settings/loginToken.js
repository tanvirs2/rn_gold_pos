import AsyncStorage from '@react-native-async-storage/async-storage';

const loginToken = async () => {
    return await AsyncStorage.getItem('@storage_token');
};

export default loginToken;
