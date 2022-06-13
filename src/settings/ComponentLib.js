import {ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import CustomInput from '../components/CustomInput';
import React, {Fragment, useContext, useEffect, useState} from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';

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

export const CommonListScreen = (props) => {

    return (
        <Fragment>
            <TransactionalListScreen {...props}/>
        </Fragment>
    );
}

const GenericInput = ({name, type, value, setValue}) => {
    const [stAmount, setAmount] = useState()

    return (
        <Fragment>
            <Text style={{fontSize: 20, marginBottom: 10}}> {name} </Text>

            <CustomInput
                value={value}
                setValue={setValue}
                placeholder={name}
                keyboardType={type}
            />
        </Fragment>
    );
}

const GenericCommentInput = ({name, value, setValue}) => {
    const [stAmount, setAmount] = useState()

    return (
        <Fragment>
            <Text style={{fontSize:20, marginBottom:10}}>{name}</Text>
            <CustomInput
                value={value}
                setValue={setValue}
                multiline={true}
                numberOfLines={4}
                placeholder={name}
            />
        </Fragment>
    );
}

const DateField = ({name, value, setValue}) => {

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)


    return (
        <Fragment>
            <Text style={{fontSize:20, marginBottom:10}}> {name} </Text>
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
        </Fragment>
    );
}

export const CommonEntryScreen = (props) => {

    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);


    const {type, inputs} = props;


    /*let myObj = {};

    inputs.forEach((currentVal, index) => {
        myObj[currentVal.dbName] = currentVal.value;
        //console.log(currentVal.dbName);
    });

    console.log(myObj);

    console.log(object);

    console.log(bodyMapped)*/

    const dataSave = async () => {

        setLoader(true);

        const bodyMapped = inputs.map((inpObj, ind)=>{

            return {
                [inpObj.dbName]: inpObj.value
            };
        })

        let bodyMappedSingle = Object.assign({}, ...bodyMapped);


        customFetch({
            url: type+'/Upsert',
            method: 'POST',
            body: bodyMappedSingle,
            callbackResult: (result)=>{
                setLoader(false);
                //console.log('result---->', result);

                inputs.forEach((currentVal, index) => {
                    if (currentVal.setValue) {
                        currentVal.setValue(null);
                    }
                });
            },
            navigation
        });
    }



    const inputsElm = (inpObj) => {

        let input = null;

        switch (inpObj.type) {
            case 'hide':
                input = <Fragment/>
                break;

            case 'text':
                input = <GenericInput
                    name={inpObj.name}
                    setValue={inpObj.setValue}
                    value={inpObj.value}
                />
                break;

            case 'numeric':
                input = <GenericInput
                    name={inpObj.name}
                    setValue={inpObj.setValue}
                    value={inpObj.value}
                    type="numeric"
                />
                break;

            case 'date':
                input = <DateField
                    name={inpObj.name}
                    setValue={inpObj.setValue}
                    value={inpObj.value}
                />
                break;

            case 'comment':
                input = <GenericCommentInput
                    name={inpObj.name}
                    setValue={inpObj.setValue}
                    value={inpObj.value}
                />
                break;

            default:
                input = <GenericInput
                    name={inpObj.name}
                    setValue={inpObj.setValue}
                    value={inpObj.value}
                />
        }

        return input;
    }

    return (
        <Fragment>
            <View>

                <LoaderViewScreen viewThisComp={stLoader}/>

                <ScrollView>
                    <View style={{padding:20}}>

                        {
                            inputs.map((inpObj, ind)=>{
                                return (
                                    <View key={ind} style={{marginTop: inpObj.type==='hide' ? 0 : 30}}>
                                        {inputsElm(inpObj)}
                                    </View>
                                );
                            })
                        }


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
        </Fragment>
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

    const [stCustomerName, setCustomerName] = useState('');
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
                'name': stCustomerName,
                'comment': stComment,
                'amount': stAmount,
                'date': moment(date).format('Y-MM-DD'),
                'shopId': stShopId,
            },
            callbackResult: (result)=>{
                setLoader(false);
                console.log(result);

                setCustomerName('');
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
                            value={stCustomerName}
                            setValue={setCustomerName}
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

export const DeuTransactionalEntryScreen = ({type}) => {

    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);

    const [stId, setId] = useState(0);
    const [stCustomerName, setCustomerName] = useState('');
    const [stAmount, setAmount] = useState('');
    const [stComment, setComment] = useState('');
    const [stShopId, setShopId] = useState(1);

    const [stInvoicesArray, setInvoicesArray] = useState([]);
    const [stInvoiceId, setInvoiceId] = useState(0);

    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        getInvoices();
    },[]);


    const dataSave = async () => {
        setLoader(true);

        /*{
            "id": 0,
            "name": "string",
            "invoiceId": 18,
            "amount": 10,
            "date": "2022-06-06",
            "description": "string",
            "comment": "string",
            "shopId": 1
        }*/


        customFetch({
            url: 'DueBill/Upsert',
            method: 'POST',
            body: {
                'id': stId,
                'name': stCustomerName,
                'invoiceId': stInvoiceId,
                'amount': stAmount,
                'date': moment(date).format('Y-MM-DD'),
                'description': stComment,
                'shopId': stShopId,
            },
            callbackResult: (result)=>{
                setLoader(false);
                console.log(result);

                setCustomerName('');
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

    const getInvoices = () => {

        customFetch({
            url: 'DueBill/Get/2',
            callbackResult: (result) => {
                setInvoicesArray(result.invoiceCodes);
                console.log(result.invoiceCodes);
            },
        });
    }

    return (
        <View>

            <LoaderViewScreen viewThisComp={stLoader}/>

            <ScrollView>
                <View style={{marginTop:30,padding:20}}>
                    <View>
                        <Text style={{fontSize:20, marginBottom:10}}> Customer Name</Text>
                        <CustomInput
                            value={stCustomerName}
                            setValue={setCustomerName}
                            placeholder={`Customer Name`}
                        />
                    </View>

                    {/*<View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Invoice Number *</Text>
                        <CustomInput
                            value={stAmount}
                            setValue={setAmount}
                            placeholder="Invoice Number"
                        />
                    </View>*/}

                    <LocalSelect
                        data={stInvoicesArray}
                        selectProps={{
                            value: stInvoiceId,
                            setValue: setInvoiceId,
                            placeholder: 'Invoice Number',
                        }}
                    />

                    <View style={{marginTop:30}}>
                        <Text style={{fontSize:20, marginBottom:10}}>Amount</Text>
                        <CustomInput
                            keyboardType="numeric"
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

export const DueTransactionalListScreen = ({type, tableHead}) => {

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
            url: 'DueBill/GetAll?pageIndex=0&pageSize=2000',
            method: 'GET',
            callbackResult: (result)=>{
                loadContext.loaderDispatch('loaded');

                let listArray = result.data.map((data)=>{

                    return [
                        data.name,

                        moment(data.date).format('MMMM Do'),

                        'notReady',

                        `${taka} ${data.amount}`,

                        data.description,
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


export const LocalSelect = ({selectProps, data}) => {

    const [stDropdownOpen, setDropdownOpen] = useState(false);


    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{selectProps.placeholder}</Text>

            <View style={{
                borderRadius:5,
                borderColor: '#988686',
                borderWidth: 1,
            }}>

                <SelectDropdown
                    onFocus={()=>{
                        setDropdownOpen(true);
                        //console.log(data);
                    }}
                    onBlur={()=>{
                        setDropdownOpen(false);
                    }}
                    buttonStyle={{
                        width: '100%',
                        borderRadius: 5,
                    }}
                    renderDropdownIcon={()=><Ionicons
                        name={stDropdownOpen ? 'chevron-up': 'chevron-down'}
                        size={28}
                        color="#988686FF"
                    />}
                    data={data}
                    onSelect={(selectedItem, index) => {
                        //console.log(selectedItem.name, index);
                        selectProps.setValue(selectedItem.id)
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.name;
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.name;
                    }}
                />

            </View>
        </View>
    );
}



