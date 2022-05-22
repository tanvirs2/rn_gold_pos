/*eslint-disable*/

import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import loaderContext from '../contexts/loaderContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function withLoaderScreen(WrappedComponent) {

    //const loadContext = useContext(loaderContext);

    /*const storeToken = async (value) => {
        try {
            const token = await AsyncStorage.getItem('@storage_token')
        } catch (e) {
            // saving error
        }
    }

    useEffect(()=>{
        (async ()=>{
            const token = await AsyncStorage.getItem('@storage_token')
            alert(token)
        })()

    });*/


    class Wrapper extends React.Component {

        //loader = false;


        render() {

            //console.log(loadContext);

            return (
                <View>
                    <loaderContext.Consumer>
                        {
                            ({loader})=>(
                                loader && <View style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(196,196,196,0.72)',
                                    zIndex: 1,
                                }}>
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <ActivityIndicator size="large" color="#0000ff"/>
                                    </View>
                                </View>
                            )
                        }
                    </loaderContext.Consumer>
                    {/*{loadContext.loader && <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(196,196,196,0.72)',
                        zIndex: 1,
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    </View>}*/}
                    <WrappedComponent {...this.props} />
                </View>
            )
        }
    }

    return Wrapper;
}

export default withLoaderScreen;
