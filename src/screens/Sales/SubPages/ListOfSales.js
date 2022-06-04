/*eslint-disable*/
import React, {Fragment, useEffect, useState} from 'react';
import {Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {customFetch} from '../../../settings/networking';
import {taka} from '../../../assets/symbols';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import {DetailsModal} from '../../../settings/ComponentLib';


const CustomDataTable = () => {

    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [stRefreshing, setRefreshing] = useState(false);

    const [stLoader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [stIdForModal, setIdForModal] = useState(0);

    const [stProducts, setProducts] = useState({
        tableHead: ['Product', 'Category', 'Amount', 'Invoice No.', 'Action'],
        tableData: [
            ['', '', '', '', '', ''],
        ],
    });


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    useEffect(()=>{

        setLoader(true);


        customFetch({
            url: 'Sale/GetAll?pageIndex=0&pageSize=200',
            method: 'GET',
            callbackResult: (result)=>{

                console.log(result.data[0])

                let listArray = result.data.map((data)=>{

                    return [

                        data.name,

                        data.category,

                        `${taka} `+data.amount,

                        data.isActive !== 'No',

                        data.id,

                    ];
                })

                setProducts((prevState)=>{
                    return {
                        ...prevState,
                        tableData: [
                            ...listArray
                        ]
                    };
                })

                setRefreshing(false);
                setLoader(false);
            },
            navigation
        });


    }, [isFocused, stRefreshing]);

    function alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    const element = (data, index) => (
        <TouchableOpacity onPress={() => alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <View style={{height:'83%'}}>

                <LoaderViewScreen viewThisComp={stLoader}/>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={stRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View>
                        <View style={styles.container}>

                            {
                                modalVisible && <DetailsModal setModalVisible={setModalVisible} stIdForModal={stIdForModal} url="Sale/Get/"/>
                            }

                            <Table borderStyle={{borderWidth: 1, borderColor: '#f1f1f1'}}>
                                <Row
                                    data={stProducts.tableHead}
                                    style={styles.head}
                                    textStyle={styles.headText}
                                />


                                {
                                    stProducts.tableData.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {rowData.map((cellData, cellIndex) => (
                                                <Cell
                                                    key={cellIndex}
                                                    data={
                                                        (()=>{
                                                            switch (cellIndex) {

                                                                case 4:
                                                                    return (
                                                                        <Fragment>
                                                                            <Pressable onPress={()=>{
                                                                                setModalVisible(true)
                                                                                setIdForModal(cellData);
                                                                            }} style={{alignItems:'center'}}>

                                                                                <Ionicons name="ellipsis-vertical" size={24} color="#000"/>

                                                                            </Pressable>

                                                                        </Fragment>
                                                                    );
                                                                default:
                                                                    return cellData;
                                                            }
                                                        })()
                                                    }
                                                    textStyle={styles.text}
                                                />
                                            ))}
                                        </TableWrapper>
                                    ))
                                }


                            </Table>
                        </View>
                    </View>
                </ScrollView>


            </View>
        </View>
    );
};

const ListOfSales = () => {

    return (
        <View style={{ alignItems: 'center'}}>
            <View style={{width:'95%', }}>
                <View style={{marginTop:15, alignItems: 'center'}}>
                    <Text style={{fontSize:28, fontWeight:'bold'}}>List of Sales</Text>
                </View>

                <View style={{height:100, alignItems: 'flex-start', marginTop:20, width:'100%'}}>
                    <Text style={{fontSize:18, marginBottom:5}}>Search Invoice Number </Text>

                    <View style={{width:'100%', flexDirection:'row'}}>
                        <View style={{width:'75%', marginRight:'5%'}}>
                            <CustomInput/>
                        </View>

                        <View style={{width:'20%'}}>
                            <CustomButton
                                text={<Ionicons color="red" size={23} name={'search-outline'}/>}
                                bgColor="white"
                            />
                        </View>

                    </View>

                </View>

                <View >
                    <CustomDataTable/>
                </View>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {backgroundColor: '#fff'},
    head: {height: 60, backgroundColor: '#f1f8ff'},
    headText: {margin: 5, width: 60},
    text: {margin: 6},
    row: { flexDirection: 'row', backgroundColor: '#ffffff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default ListOfSales;
