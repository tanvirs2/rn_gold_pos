import React, {Fragment, useEffect, useState} from 'react';
import {
    Alert,
    Modal,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {apiUrl, customFetch} from '../../settings/networking';
import loginToken from '../../settings/loginToken';
import LoaderViewScreen from '../../components/LoaderView/LoaderViewScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Cell, Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import CustomButton from '../../components/CustomButton';
import {CustomDataTable, LocalInput} from '../../settings/ComponentLib';

const CenterHeader = ({headerText}) => (
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text>{headerText}</Text>
    </View>
);

const ProductCategoryListScreen = () => {



    return (
        <Fragment>

            <CustomDataTable
                type="ProductCategory"
                tableHead={['Category', 'Status', 'Action']}
                searchPlaceholder="Category Name..."
                tableDB={[
                    'name|text',
                    'isActive|status',
                    'id|action'
                ]}
                modalData={[
                    ['ID', ':', 'id|text'],
                    ['Name', ':', 'name|text'],
                    ['Status', ':', 'isActive|status'],
                ]}
                editRoute="Product Category Entry"
            />

        </Fragment>
    );
}

export default ProductCategoryListScreen;
