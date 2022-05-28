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
import {useIsFocused} from '@react-navigation/native';
import {apiUrl} from '../../settings/networking';
import loginToken from '../../settings/loginToken';
import LoaderViewScreen from '../../components/LoaderView/LoaderViewScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Cell, Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import CustomButton from '../../components/CustomButton';
import {LocalInput} from '../../settings/ComponentLib';

const CenterHeader = ({headerText}) => (
    <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text>{headerText}</Text>
    </View>
);

const ProductCategoryListScreen = () => {
    const isFocused = useIsFocused();
    const [stRefreshing, setRefreshing] = useState(false);

    const [stLoader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [stProducts, setProducts] = useState({
        tableHead: ['Category', <CenterHeader headerText="Status"/>, <CenterHeader headerText="Action"/>],
        tableData: [
            ['', '', ''],
        ],
    });

    const [stProductModal, setProductModal] = useState({
        EditTableData: [
            ['', ':', ''],
        ],
    });


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);



    useEffect(()=>{
        async function fetchData() {

            setLoader(true);

            fetch(apiUrl + `ProductCategory/GetAll?pageIndex=0&pageSize=200`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${await loginToken()}`,
                }
            })
                .then(response=>response.json())
                .then(result=>{

                    //console.log(result.data);


                    let listArray = result.data.map((data)=>{

                        return [

                            data.name,

                            data.isActive !== 'No',

                            'Action'

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


                })
        }

        fetchData();
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
            <LoaderViewScreen viewThisComp={stLoader}/>

            <View style={{margin: 10, marginBottom: 310}}>
                {/*<View style={{alignItems: 'center'}}>
                    <Text style={{fontWeight: 'bold', fontSize: 25, paddingBottom: 15}}>
                        Product Categories
                    </Text>
                </View>*/}


                <View style={{marginBottom: 20}}>
                    <LocalInput inputProps={
                        {
                            placeholder: 'Search Category',
                        }
                    }/>
                </View>

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

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    //Alert.alert("Modal has been closed.");
                                    setModalVisible(prevState => !prevState);
                                }}
                            >
                                <View style={{width: '100%', height:'100%',
                                    backgroundColor: 'rgba(222,222,222,0.34)', justifyContent:'center', alignItems:'center'}}>
                                    <Pressable onPress={() => setModalVisible(prevState => !prevState)} style={{width: '90%', justifyContent:'center', alignItems:'flex-end'}}>
                                        <Ionicons name="close-circle" size={24} color="#000" style={{backgroundColor:'#fff', borderRadius: 60}}/>
                                    </Pressable>
                                    <View style={{width: '80%', height:'60%',
                                        borderWidth: 1,
                                        borderColor: '#c5c5c5',
                                        backgroundColor: '#fff',
                                        borderRadius: 5,
                                        padding: 10,
                                        filter: 'blur',
                                    }}>


                                        <Table>
                                            <Rows data={stProductModal.EditTableData} textStyle={styles.text}/>
                                        </Table>

                                        <CustomButton
                                            text="Edit"
                                            bgColor="gold"
                                        />

                                    </View>
                                </View>
                            </Modal>

                            <Table>
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
                                                                case 1:
                                                                    return (
                                                                        <View style={{flexDirection:'row', paddingLeft:5,justifyContent: 'center',
                                                                            alignItems: 'center',}}>
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
                                                                case 2:
                                                                    return (
                                                                        <Fragment>
                                                                            <Pressable onPress={()=>{setModalVisible(true)}} style={{alignItems:'center'}}>

                                                                                <Ionicons name="pencil" size={24} color="#000"/>

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
}

const styles = StyleSheet.create({
    container: {backgroundColor: '#fff'},
    head: {height: 60, backgroundColor: '#f1f8ff'},
    headText: {margin: 5},
    text: {margin: 6},
    row: { flexDirection: 'row', backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#f1f1f1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default ProductCategoryListScreen;
