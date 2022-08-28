import loginToken from './loginToken';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const apiUrl = "https://pos.newapanjewellers.com/api/";

const pleaseLogging = (navigation) => {
    ToastAndroid.showWithGravity(
        'Please Logging !',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
    );
    if (navigation) {
        navigation.navigate('SignIn');
    }
};

export const customFetch = ({url, method, body, callbackResponse, callbackResult, callbackError, navigation}) => {

    (async ()=>{

        let loginTokenString = await loginToken();

        method = method ? method : 'GET';
        body = (method === 'GET') ? false : JSON.stringify(body);

        fetch(apiUrl + url, {
            method: method,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loginTokenString}`,
            },
            body,
        })
            .then(response => {

                if (callbackResponse) {
                    callbackResponse(response);
                }

                if (loginTokenString === null) {
                    pleaseLogging(navigation);
                }

                switch (response.status) {
                    case 401:

                        pleaseLogging(navigation);

                        break;
                    /*case 200:
                        alert('200');
                        break;*/
                    default:
                        //alert('ok');
                }

                return response.json();
            })
            .then(result => {

                if (callbackResult) {
                    callbackResult(result);
                }

            })
            .catch((error)=>{

                if (loginTokenString === null) {
                    //console.log('navigation', navigation);
                    pleaseLogging(navigation);
                }

                if (callbackError) {
                    callbackError(error);
                }
            });
    })()

    /*async function apiHandler() {
        //setLoader(true);
        //console.log(typeof callbackResponse)
    }

    apiHandler();*/
}
