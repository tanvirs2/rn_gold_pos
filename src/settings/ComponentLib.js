import {
    ActivityIndicator, Alert,
    Modal,
    Pressable, RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {customFetch} from './networking';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoaderViewScreen from '../components/LoaderView/LoaderViewScreen';
import {Cell, Row, Rows, Table, TableWrapper} from 'react-native-table-component';
import CustomButton from '../components/CustomButton';
import {globalBackgroundColor, globalButtonColor} from './color';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import loaderContext from '../contexts/loaderContext';
import {taka} from '../assets/symbols';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import IconButton from '../components/IconButton/IconButton';

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

export const CustomDataTable = ({searchValue, toggleBtn, tableHead, tableDB, type, searchPlaceholder}) => {

    const styles = StyleSheet.create({
        container: {backgroundColor: '#fff'},
        head: {height: 60, backgroundColor: '#f1f8ff'},
        headText: {margin: 5, textAlign: 'center'},
        text: {margin: 6},
        row: { flexDirection: 'row', backgroundColor: '#ffffff' },
        btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
        btnText: { textAlign: 'center', color: '#fff' }
    });

    const navigation = useNavigation();

    const isFocused = useIsFocused();
    const [stRefreshing, setRefreshing] = useState(false);

    const [stLoader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [stIdForModal, setIdForModal] = useState(0);

    const [stSearchValue, setSearchValue] = useState('');
    const [stSearchBtn, setSearchBtn] = useState('');


    const [stProducts, setProducts] = useState({
        tableHead,
        tableData: [
            ['', '', '', '', '', ''],
        ],
    });


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, []);


    useEffect(()=>{

        setLoader(true);

        console.log(stSearchValue)

        customFetch({
            url: `${type}/GetAll?pageIndex=0&pageSize=200&searchValue=${stSearchValue}`,
            method: 'GET',
            callbackResult: (result)=>{

                //console.log(result)

                let listArray = result.data.map((data)=>{

                    let tableFacedDB = tableDB.map(dbName=> {

                        let name = dbName.split('|')[0];
                        let type = dbName.split('|')[1];
                        //return dbName.split('|')[1];

                        let processedData = null;

                        switch (type){
                            case 'text':
                                processedData = String(data[name]);
                                break;
                            case 'taka':
                                processedData = `${taka} ${data[name]}`;
                                break;
                            case 'status':
                                processedData = (
                                    <View style={{alignItems:'center'}}>
                                        {data[name] ?
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
                                break;
                            case 'date':
                                processedData = moment(data[name]).format('MMMM Do');
                                break;
                            case 'action':
                                processedData = (
                                    <Pressable onPress={()=>{
                                        setModalVisible(true)
                                        setIdForModal(data[name]);
                                    }} style={{alignItems:'center'}}>

                                        <Ionicons name="ellipsis-vertical" size={24} color="#000"/>

                                    </Pressable>
                                );
                                break;

                            case 'centerText':
                                processedData = (
                                    <View style={{alignItems:'center'}}>
                                        <Text>
                                            {String(data[name])}
                                        </Text>
                                    </View>
                                );
                                break;

                            default:
                                processedData = (
                                    <View style={{alignItems:'center'}}>
                                        <Text>
                                            {String(data[name])}
                                        </Text>
                                    </View>
                                );
                        }

                        return processedData;
                    })

                    //console.log('tableFacedDB---->', tableFacedDB);


                    return tableFacedDB;
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


    }, [isFocused, stRefreshing, stSearchBtn]);

    function alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }

    /*const element = (data, index) => (
        <TouchableOpacity onPress={() => alertIndex(index)}>
            <View style={styles.btn}>
                <Text style={styles.btnText}>button</Text>
            </View>
        </TouchableOpacity>
    );*/

    return (
        <View style={{margin:10}}>

            <View style={{height: 80, alignItems: 'flex-start', marginTop: 5, width: '100%'}}>
                {/*<Text style={{fontSize: 18, marginBottom: 5}}>Search Invoice Number </Text>*/}

                <View style={{width: '100%', flexDirection: 'row'}}>
                    <View style={{width: '75%', marginRight: '5%'}}>
                        <CustomInput
                            value={stSearchValue}
                            setValue={setSearchValue}
                            placeholder={searchPlaceholder}
                        />
                    </View>

                    <View style={{width: '20%'}}>
                        <CustomButton
                            text={<Ionicons color="red" size={23} name={'search-outline'}/>}
                            bgColor="white"
                            onPress={()=>setSearchBtn(prevState => !prevState)}
                        />
                    </View>

                </View>

            </View>

            <View style={{height:'86%'}}>

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

export const CommonListScreen = ({type, tableHead, tableDB}) => {

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

                    let tableFacedDB = tableDB.map(dbName=> {

                        let name = dbName.split('|')[0];
                        let type = dbName.split('|')[1];
                        //return dbName.split('|')[1];

                        let processedData = null;

                        switch (type){
                            case 'text':
                                processedData = String(data[name]);
                                break;
                            case 'taka':
                                processedData = `${taka} ${data[name]}`;
                                break;
                            case 'date':
                                processedData = moment(data[name]).format('MMMM Do');
                                break;

                        }

                        return processedData;
                    })

                    //console.log('tableFacedDB---->', tableFacedDB);


                    return tableFacedDB;
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

    const [stIfArrayType, setIfArrayType] = useState(['', '']);

    const {type, inputs, btnName, btnPress} = props;

    //console.log(typeof btnPress)

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



    const inputsElm = (inpObj, child = false, childOptions) => {

        let input = null;

        //arrayAbstraction

        //console.log(inpObj.arrayAbstraction)

        const valueChangeWhenInputTypeArray = (inpText) => {

            if (child) {
                //alert('dd')
                //console.log('---zzzxxxxx-->', childOptions.rootField)
                //console.log('---xxxxx-->', list[childOptions.rootIndex][childOptions.inputIndex].value);
                //list[key][2].value = inpData;
                //setProductsArr(list);
                //console.log('---ccccc-->', list)

                let list = [...childOptions.childInputs];

                list[childOptions.rootIndex][childOptions.inputIndex].value = inpText;

                return childOptions.rootField.setValue(list);

            }

            return inpObj.setValue(inpText);
        }

        switch (inpObj.type) {
            case 'hide':
                input = <Fragment/>
                break;

            case 'text':
                input = <GenericInput
                    name={inpObj.name}
                    setValue={valueChangeWhenInputTypeArray}
                    value={inpObj.value}
                />
                break;

            case 'select':
                input = <LocalSelect
                    data={inpObj.selectOptions}
                    selectProps={{
                        setValue: inpObj.setValue,
                        value: inpObj.value,
                        placeholder: inpObj.name,
                    }}
                />
                break;


            case 'numeric':
                input = <GenericInput
                    name={inpObj.name}
                    setValue={valueChangeWhenInputTypeArray}
                    value={inpObj.value}
                    type="numeric"
                />
                break;

            case 'date':
                input = <DateField
                    name={inpObj.name}
                    setValue={valueChangeWhenInputTypeArray}
                    value={inpObj.value}
                />
                break;

            case 'comment':
                input = <GenericCommentInput
                    name={inpObj.name}
                    setValue={valueChangeWhenInputTypeArray}
                    value={inpObj.value}
                />
                break;

            case 'array':
                input = <View>

                    <View style={{borderWidth:1, borderColor: globalBackgroundColor, marginBottom:15}}/>

                    <View style={{flexDirection:'row', justifyContent: 'space-between', marginBottom:5}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                            {inpObj.name}
                        </Text>
                        <View>
                            <IconButton
                                onPress={()=>{
                                    inpObj.setValue(prevState => {

                                        //console.log(prevState);
                                        Vibration.vibrate(100)

                                        return [...prevState, inpObj.arrayAbstraction]
                                    });
                                    //console.log(inpObj.arrayAbstraction)
                                }}
                                name="add-outline"
                            />
                        </View>
                    </View>

                    {
                        inpObj.value.map((arr, key)=>{

                            //console.log('---aa-->', arr); //inpObj.setValue

                            return (
                                <View key={key} style={{borderWidth: 1,
                                    borderColor: globalBackgroundColor, padding: 10, borderRadius: 5, marginBottom: 15, backgroundColor:'rgba(255,199,0,0.32)'}}>
                                    {
                                        arr.map((inpObj2, ind)=>{

                                            //console.log('---aa-->', ind);

                                            return (
                                                <View key={ind} style={{marginTop: inpObj2.type==='hide' ? 0 : 30}}>
                                                    {inputsElm(inpObj2, true, {
                                                        rootIndex: key,
                                                        inputIndex: ind,
                                                        rootField: inpObj,
                                                        childInputs: inpObj.value,
                                                    })}
                                                </View>
                                            );
                                        })
                                    }
                                </View>
                            )
                        })
                    }


                </View>
                break;

            default:
                input = <GenericInput
                    name={inpObj.name}
                    setValue={valueChangeWhenInputTypeArray}
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

                            {
                                (props.defaultBtn !== false) && <CustomButton
                                    text={btnName ? btnName : 'Save'}
                                    bgColor={globalButtonColor}
                                    onPress={btnPress ? btnPress : dataSave}
                                />
                            }

                        </View>

                    </View>
                </ScrollView>
            </View>
        </Fragment>
    );
}


export const TransactionalInput = ({stValue, setValue}) => {

    return <TextInput
        keyboardType="numeric"
        placeholder="............"
        placeholderTextColor="#f00"
        style={{padding: 0, color: '#0048ff', fontWeight:'bold'}}
        value={stValue}
        onChangeText={setValue}
    />
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



