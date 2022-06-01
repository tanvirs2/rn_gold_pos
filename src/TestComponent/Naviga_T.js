import * as React from 'react';
import {Button, Modal, ScrollView, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {globalBackgroundColor} from '../settings/color';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const ConfirmModal = ({setModalVisible}) => {

    return (
        <View>
            <View>
                <Modal animationType="slide" transparent={true}>
                    <View style={{padding:30, backgroundColor: 'rgba(70,51,0,0.65)'}}>
                        <ScrollView style={{backgroundColor: '#fff', minHeight:'100%',
                            borderColor: globalBackgroundColor, borderWidth:2, borderRadius:5, padding:10}}>
                            <Button title="Close" onPress={()=>{
                                setModalVisible(false)
                            }}/>
                            <View>
                                <View>
                                    <Text>ConfirmModal</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            </View>

        </View>
    );
};
