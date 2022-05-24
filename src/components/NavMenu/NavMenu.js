import React, {Fragment, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import {View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const SubCustomDrawerItem = ({label, route}) => {
    const navigation = useNavigation();

    const navigateRoute = () => {
        navigation.navigate(route);
    };

    return (
        <DrawerItem
            label={label}
            style={{
                backgroundColor: '#F3E8CBFF',
            }}
            labelStyle={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000',
            }}
            onPress={navigateRoute}
        />
    );
};

const CustomDrawerItem = ({
                              label,
                              isSetCollapsed,
                              isCollapsed,
                              icon,
                              dropdown = true,
                          }) => {
    return (
        <DrawerItem
            label={label}
            style={{
                backgroundColor: 'rgba(177,185,114,0.8)',
            }}
            labelStyle={{
                position: 'absolute',
                top: -10,
                left: -20,
                fontWeight: 'bold',
            }}
            onPress={() => (dropdown ? isSetCollapsed(!isCollapsed) : null)}
            activeTintColor="red"
            icon={({focused, color, size}) => (
                <Fragment>
                    {icon}

                    {dropdown && (
                        <AntDesign
                            style={{
                                alignSelf: 'center',
                                position: 'absolute',
                                right: 10,
                            }}
                            name={isCollapsed ? 'downcircleo' : 'upcircle'}
                            size={24}
                            color="black"
                        />
                    )}
                </Fragment>
            )}
        />
    );
};


const NavMenu = ({mainMenu}) => {

    const [isSalesCollapsed, isSetSalesCollapsed] = useState(true);

    return (
        <Fragment>
            <CustomDrawerItem
                label="Sell Management"
                icon={
                    <Ionicons
                        name={isSalesCollapsed ? 'reader-outline' : 'reader'}
                        size={24}
                        color="black"
                    />
                }
                isSetCollapsed={isSetSalesCollapsed}
                isCollapsed={isSalesCollapsed}
            />


            <Collapsible collapsed={isSalesCollapsed}>
                <View>
                    {
                        mainMenu.subMenu.map((subMenu, subMenuIndex)=>{

                            return (
                                <Fragment key={subMenuIndex}>
                                    <SubCustomDrawerItem label="SaleRetail/Wholesale" route="Sales"/>
                                </Fragment>
                            );
                        })
                    }
                </View>
            </Collapsible>

        </Fragment>
    );
}

export default NavMenu;
