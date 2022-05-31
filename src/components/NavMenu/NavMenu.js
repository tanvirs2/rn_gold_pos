import React, {Fragment, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import {View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {globalBackgroundColor, globalBlackColor, globalButtonColor} from '../../settings/color';

const SubCustomDrawerItem = ({label, route}) => {
    const navigation = useNavigation();

    const navigateRoute = () => {
        if (route) {
            navigation.navigate(route);
        }
    };

    return (
        <DrawerItem
            label={label}
            style={{
                backgroundColor: '#F3E8CBFF',
                borderLeftWidth: 6,
                borderColor: globalBackgroundColor,
            }}
            labelStyle={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: route ? '#000': '#f00',
            }}
            onPress={navigateRoute}
        />
    );
};

const CustomDrawerItem = ({label, isSetCollapsed, isCollapsed, icon, dropdown = true}) => {

    //console.log(dropdown)

    return (
        <DrawerItem
            label={label}
            style={{
                backgroundColor: isCollapsed?'#3D3D3DCC': '#000',
            }}
            labelStyle={{
                position: 'absolute',
                top: -10,
                left: -20,
                fontWeight: 'bold',
                color:'#fff'
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
                            color="#fff"
                        />
                    )}
                </Fragment>
            )}
        />
    );
};


const NavMenu = ({mainMenu}) => {

    const [isCollapsed, isSetCollapsed] = useState(true);

    //console.log(!!mainMenu.subMenu[0]);

    return (
        <Fragment>
            <CustomDrawerItem
                label={mainMenu.mainMenuLabel}
                icon={
                    <Ionicons
                        name={isCollapsed ? `${mainMenu.mainIcon}-outline` : mainMenu.mainIcon}
                        size={24}
                        color={globalButtonColor}
                    />
                }
                isSetCollapsed={isSetCollapsed}
                isCollapsed={isCollapsed}
                dropdown={!!mainMenu.subMenu[0]}
            />


            <Collapsible collapsed={isCollapsed}>
                <View>
                    {
                        mainMenu.subMenu.map((subMenu, subMenuIndex) => {

                            return (
                                <Fragment key={subMenuIndex}>
                                    <SubCustomDrawerItem label={subMenu.name} route={subMenu.route}/>
                                </Fragment>
                            );
                        })
                    }
                </View>
            </Collapsible>

        </Fragment>
    );
};

export default NavMenu;
