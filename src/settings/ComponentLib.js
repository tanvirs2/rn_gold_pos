import {ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import React, {useContext, useEffect, useState} from 'react';
import {customFetch} from './networking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoaderViewScreen from '../components/LoaderView/LoaderViewScreen';
import {Row, Rows, Table} from 'react-native-table-component';
import CustomButton from '../components/CustomButton';
import {globalButtonColor} from './color';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import loaderContext from '../contexts/loaderContext';
import {taka} from '../assets/symbols';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

export const LocalInput = ({inputProps}) => {

    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{inputProps.placeholder}</Text>

            <CustomInput {...inputProps} />
        </View>
    );
}

export const DetailsModal = ({setModalVisible, stIdForModal, navigation, url, tableCallback}) => {

    //const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: {backgroundColor: '#fff'},
        head: {height: 60, backgroundColor: '#f1f8ff'},
        headText: {margin: 5, width: 60},
        text: {margin: 6},
        row: { flexDirection: 'row', backgroundColor: '#ffffff' },
        btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
        btnText: { textAlign: 'center', color: '#fff' }
    });

    const [stLoader, setLoader] = useState(false);
    const [stProductModal, setProductModal] = useState([
        ['', ':', ''],
    ]);

    useEffect(()=>{

        setLoader(true);

        customFetch({
            url: url + stIdForModal,
            method:'GET',
            callbackResult: (result)=>{

                let productModel = result.model;

                tableCallback(setProductModal, productModel);

                setLoader(false);
            },
            navigation,
        })


    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalVisible(prevState => !prevState);
            }}
        >
            <View style={{
                width: '100%', height:'100%',
                backgroundColor: 'rgba(222,222,222,0.34)',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <Pressable onPress={() => setModalVisible(prevState => !prevState)} style={{width: '90%', justifyContent:'center', alignItems:'flex-end'}}>
                    <Ionicons name="close-circle" size={24} color="#000" style={{backgroundColor:'#fff', borderRadius: 60}}/>
                </Pressable>

                <View style={{width: '80%', height:'63%',
                    borderWidth: 1,
                    borderColor: '#c5c5c5',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 10,
                    filter: 'blur',
                    shadowColor: '#000',
                    elevation: 30
                }}>

                    <View style={{position: 'absolute', width: '100%', height: '100%', margin:10}}>
                        <LoaderViewScreen viewThisComp={stLoader}/>
                    </View>



                    <Table>
                        <Rows data={stProductModal} textStyle={styles.text}/>
                    </Table>

                    <View style={{margin:40}}>
                        <CustomButton
                            text="Edit"
                            bgColor={globalButtonColor}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    );
}

export const TransactionalListScreen = ({type, tableHead}) => {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 16, paddingTop: 30 },
        head: { height: 60, backgroundColor: '#cccccc' },
        text: { margin: 6, fontWeight:'bold' },
        cell: { margin: 6 }
    });

    const isFocused = useIsFocused();

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [stDeposits, setDeposits] = useState({
        tableHead, //['Deposit Name', 'Amount', 'Comment', 'Date']
        tableData: [
            ['', '', '', ''],
        ]
    })

    const loadContext = useContext(loaderContext);

    useEffect( ()=>{

        loadContext.loaderDispatch('loading');

        customFetch({
            url: type+'/GetAll?pageIndex=0&pageSize=200',
            method: 'GET',
            callbackResult: (result)=>{
                loadContext.loaderDispatch('loaded');

                let listArray = result.data.map((data)=>{

                    return [
                        data.name,

                        `${taka} ${data.amount}`,

                        data.description,

                        moment(data.date).format('MMMM Do'),
                    ];
                })



                setDeposits((prevState)=>{
                    return {
                        ...prevState,
                        tableData: [
                            ...listArray
                        ]
                    };
                })
            },
            navigation,
            callbackError: (err)=>{
                loadContext.loaderDispatch('loaded');
            }
        });

    }, [isFocused]);

    return (
        <View>

            <ScrollView>
                <View style={{marginTop:10,padding:20, justifyContent:'center', alignItems:'center'}}>

                    <View>
                        <Pressable onPress={() => setOpen(true)} >
                            <View style={{backgroundColor:'#000', paddingHorizontal:10, paddingVertical:5, borderRadius:10, flexDirection:'row', marginTop:1}}>


                                <View>
                                    <Ionicons name="calendar-outline" size={24} color="#fff"/>
                                </View>

                                <View>
                                    <Text style={{color: 'gray', fontWeight:'bold', fontSize:15}}> {moment().diff(date, 'days') === 0 ? 'Today':'Day' } &nbsp;</Text>
                                </View>

                                <View>
                                    <Text style={{color: '#fff', fontWeight:'bold', fontSize:15}}>{moment(date).format('MMMM Do')} &nbsp;</Text>
                                </View>

                                <View>
                                    <Ionicons name="chevron-down-outline" size={20} color="#fff"/>
                                </View>


                            </View>
                        </Pressable>


                        <DatePicker
                            mode="date"

                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>

                </View>

                <View>
                    {loadContext.loader && <View style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(196,196,196,0.72)',
                        zIndex: 1,
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                    </View>}

                    <View style={styles.container}>

                        <Table>
                            <Row data={stDeposits.tableHead} style={styles.head} textStyle={styles.text}/>
                            <Rows data={stDeposits.tableData} textStyle={styles.cell}/>
                        </Table>

                    </View>
                </View>
            </ScrollView>

        </View>
    );
}

export const TransactionalEntryScreen = ({type}) => {

    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);

    const [stDepositName, setDepositName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');
    const [stShopId, setShopId] = useState(1);
    const [stId, setId] = useState(0);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const dataSave = async () => {
        setLoader(true);

        customFetch({
            url: type+'/Upsert',
            method: 'POST',
            body: {
                'id': stId,
                'description': stComment,
                'name': stDepositName,
                'comment': stComment,
                'amount': stAmount,
                'date': moment(date).format('Y-MM-DD'),
                'shopId': stShopId,
            },
            callbackResult: (result)=>{
                setLoader(false);
                console.log(result);

                setDepositName('');
                setAmount('');
                setComment('');
                setShopId(1);
                setId(0);

                setDate(new Date());
                setOpen(false);
            },
            navigation
        });
    }

    return (
        <View>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <ScrollView>
                <View style={{marginTop:30,padding:20}}>
                    <View>
                        <Text style={{fontSize:20, marginBottom:10}}> {type} Name</Text>
                        <CustomInput
                            value={stDepositName}
                            setValue={setDepositName}
                            placeholder={`${type} Name`}
                        />
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Amount</Text>
                        <CustomInput
                            value={stAmount}
                            setValue={setAmount}
                            placeholder="Amount"
                        />
                    </View>

                    <View style={{marginTop:30}}>

                        <Text style={{fontSize:20, marginBottom:10}}>Date </Text>
                        <CustomButton
                            text={
                                <Text>

                                    {moment(date).format('Y-MM-DD')}

                                    &nbsp; ( {moment(date).format('MMMM Do')} )

                                    &nbsp;<Ionicons name="calendar-outline" size={24} color="#000"/>

                                </Text>
                            }
                            type="border"
                            onPress={() => {
                                //console.log(moment(date).format('Y-MM-DD'));
                                setOpen(true);
                            }}
                        />


                        <DatePicker
                            mode="date"

                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>

                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Comment</Text>
                        <CustomInput
                            value={stComment}
                            setValue={setComment}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <View style={{marginTop:30}}>

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



