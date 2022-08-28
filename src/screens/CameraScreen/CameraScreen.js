import React from 'react';
import {StyleSheet, Text, View, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useEffect, useState} from "react";


class RefreshableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: true});

        setTimeout(()=>{
            alert('ddd')

            this.setState({refreshing: false});
        }, 2000);

    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            />
        );
    }

}



function CameraScreen() {

    /*const devices = useCameraDevices()
    const device = devices.back

    console.log('ddd');
    console.log('ddd', devices);

    alert('cccc')*/

    /*Camera.getCameraPermissionStatus().then((a,ad)=>{
        alert('ddd')
    })*/

    useEffect(()=>{


    }, []);






    //if (device == null) return <ActivityIndicator size="large" color="#0000ff" />


    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Camera</Text>

                {/*<Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                />*/}

            </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 10,
        color: "rgba(147,147,147,0.28)"
    },
    title: {
        color: "#051C60",
        margin: 10,
        fontSize: 24,
        fontWeight: "bold"
    },
    text: {
        marginVertical: 10,
        color: "gray"
    },
    link: {
        color: "#fdb075"
    }

});


export default RefreshableList;
