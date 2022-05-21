/*eslint-disable*/

import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

function withLoaderScreen(WrappedComponent, {loader}) {
    class Wrapper extends React.Component {

        //loader = false;

        render() {
            return (
                <View>
                    {loader && <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(196,196,196,0.72)',
                        zIndex: 1,
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    </View>}
                    <WrappedComponent {...this.props} />
                </View>
            )
        }
    }

    return Wrapper;
}

export default withLoaderScreen;
