
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {useEffect, useState} from "react";
import {Camera, useCameraDevices} from "react-native-vision-camera";


const checkCameraPermission = async () => {
    let status = await Camera.getCameraPermissionStatus();
    if (status !== 'authorized') {
        await Camera.requestCameraPermission();
        status = await Camera.getCameraPermissionStatus();
        if (status === 'denied') {
            alert(
                'You will not be able to scan if you do not allow camera access',
            );
        }
    }
};


export default function CameraScreen() {

    /*const devices = useCameraDevices()
    const device = devices.back

    console.log('ddd');
    console.log('ddd', devices);

    alert('cccc')*/

    /*Camera.getCameraPermissionStatus().then((a,ad)=>{
        alert('ddd')
    })*/

    useEffect(()=>{

        checkCameraPermission();

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
