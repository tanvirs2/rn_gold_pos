import loginToken from './loginToken';

export const apiUrl = "https://pos.newapanjewellers.com/api/";

export const customFetch = ({url, method, body, callbackResponse, callbackResult, callbackError, navigation}) => {

    (async ()=>{
        body = (method === 'GET') ? false : JSON.stringify(body);

        fetch(apiUrl + url, {
            method: method,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${await loginToken()}`,
            },
            body,
        })
            .then(response => {

                if (callbackResponse) {
                    callbackResponse(response);
                }


                switch (response.status) {
                    case 401:
                        navigation.navigate('SignIn')
                        break;
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
