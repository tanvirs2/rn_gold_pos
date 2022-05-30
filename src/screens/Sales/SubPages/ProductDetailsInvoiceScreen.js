import React, {Fragment, useEffect, useState} from 'react';
import {Alert, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {customFetch} from '../../../settings/networking';
import {taka} from '../../../assets/symbols';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import {DetailsModal} from '../../../settings/ComponentLib';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const CustomDataTable = () => {

    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [stRefreshing, setRefreshing] = useState(false);

    const [stLoader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [stIdForModal, setIdForModal] = useState(0);

    const [stProducts, setProducts] = useState({
        tableHead: ['Product', 'Category', 'Amount', 'Invoice No.', 'Status', 'Action'],
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

                        '',

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
            <View>

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
                                                                        <View style={{flexDirection:'row', paddingLeft:5}}>
                                                                            {cellData ?
                                                                                <View style={{
                                                                                    flexDirection: 'row', backgroundColor: 'green',
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center', borderRadius: 3, padding: 2
                                                                                }}>

                                                                                    <View>
                                                                                        <Text style={{
                                                                                            color: '#fff',
                                                                                            fontSize: 10,
                                                                                        }}> Active </Text>
                                                                                    </View>

                                                                                    <View>
                                                                                        <View style={{
                                                                                            width: 10,
                                                                                            height: 10,
                                                                                            backgroundColor: '#fff',
                                                                                            borderRadius: 3,
                                                                                            marginTop:1,
                                                                                            marginRight: 1,
                                                                                        }}/>
                                                                                    </View>
                                                                                </View>
                                                                                :
                                                                                <View style={{flexDirection:'row',
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center', borderRadius:3,
                                                                                    borderColor: '#000', borderWidth: 1, padding:2
                                                                                }}>
                                                                                    <View>
                                                                                        <View style={{width:10, height:10, backgroundColor:'#000', borderRadius:3}}/>
                                                                                    </View>
                                                                                    <View>
                                                                                        <Text style={{fontSize:8}}> Deactive </Text>
                                                                                    </View>
                                                                                </View>}
                                                                        </View>
                                                                    );
                                                                case 5:
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

const ProductDetailsInvoiceScreen = () => {

    return (
        <View>
            <View style={{margin:10}}>
                <View style={{margin:10}}>
                    <Text style={{fontWeight: 'bold', fontSize: 30}}>Invoice</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontWeight: '300', fontSize: 15, color: '#000'}}>GS00111869</Text>
                        <Text style={{fontWeight: '300', fontSize: 15, color: '#000'}}>{moment().format('DD-MM-Y')}</Text>
                    </View>
                </View>
                <CustomDataTable/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {backgroundColor: '#fff'},
    head: {height: 60, backgroundColor: '#f1f8ff'},
    headText: {margin: 5, width: 60},
    text: {margin: 6},
    row: { flexDirection: 'row', backgroundColor: '#ffffff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default ProductDetailsInvoiceScreen;
