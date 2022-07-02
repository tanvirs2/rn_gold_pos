/*eslint-disable*/

import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderViewScreen from '../../components/LoaderView/LoaderViewScreen';
import {ScrollView, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {apiUrl} from '../../settings/networking';
import {globalButtonColor} from '../../settings/color';
import {LocalInput} from '../../settings/ComponentLib';


const ProductCategoryEntryScreen = () => {

    const [stLoader, setLoader] = useState(false);

    const [stId, setId] = useState(0);
    const [stCategoryName, setCategoryName] = useState('');

    const dataSave = async () => {
        setLoader(true);

        let loginToken = await AsyncStorage.getItem('@storage_token');

        fetch(apiUrl + `ProductCategory/Upsert`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${loginToken}`,
            },
            body: JSON.stringify({
                "id": stId,
                "name": stCategoryName,
                "isActive": true
            })
        })
            .then(response => response.json())
            .then(result => {
                setId(0);
                setLoader(false);

                console.log(result);

            })
    }

    return (
        <View>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <ScrollView>
                <View style={{marginTop:30,padding:20}}>

                    <LocalInput inputProps={{
                        value: stCategoryName,
                        setValue: setCategoryName,
                        placeholder: 'Category Name',
                    }}/>



                    <View style={{marginTop:50}}>

                        <CustomButton
                            text="Add"
                            bgColor={globalButtonColor}
                            onPress={dataSave}
                        />

                    </View>

                </View>
            </ScrollView>
        </View>
    );
}


export default ProductCategoryEntryScreen;
