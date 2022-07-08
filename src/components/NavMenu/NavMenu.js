import React, {Fragment, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Collapsible from 'react-native-collapsible';
import {View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {globalBackgroundColor, globalBlackColor, globalButtonColor} from '../../settings/color';
import {iconMapping, routeMapping} from '../../settings/menuObject';

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

    //console.log(dropdown) Dashboard

    const backgroundColor = label === 'Dashboard' ? 'rgba(44,1,0,0.8)' : isCollapsed?'#3D3D3DCC': '#000';

    return (
        <DrawerItem
            label={label}
            style={{
                backgroundColor: backgroundColor,
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

    //console.log(!!mainMenu.subMenu[0], iconMapping[mainMenu.icon] ? iconMapping[mainMenu.icon]: 'nai');



    return (
        <Fragment>
            <CustomDrawerItem
                label={mainMenu.label}
                icon={
                    <Ionicons
                        name={isCollapsed ? `${iconMapping[mainMenu.label]}-outline` : iconMapping[mainMenu.label]}
                        size={24}
                        color={globalButtonColor}
                    />
                }
                isSetCollapsed={isSetCollapsed}
                isCollapsed={isCollapsed}
                dropdown={!!mainMenu.items[0]}
            />


            <Collapsible collapsed={isCollapsed}>
                <View>
                    {
                        mainMenu.items.map((subMenu, subMenuIndex) => {

                            //console.log(routeMapping[subMenu.url]);

                            return (
                                <Fragment key={subMenuIndex}>
                                    {
                                        routeMapping[subMenu.url].map((menChild, index)=>{
                                            return (
                                                <SubCustomDrawerItem key={index} label={menChild.name} route={menChild.route}/>
                                            );
                                        })
                                    }

                                </Fragment>
                            );
                        })
                    }
                </View>
            </Collapsible>

        </Fragment>
    );
};

//{subMenu.route}

export default NavMenu;
