import {
    Alert,
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
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import loaderContext from '../contexts/loaderContext';
import {taka} from '../assets/symbols';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import SelectDropdown from 'react-native-select-dropdown';
import IconButton from '../components/IconButton/IconButton';
import {ActiveStatusShow} from './ComponentLib2';
import {showMessage} from 'react-native-flash-message';

export const CustomDataTable = ({searchValue, toggleBtn, tableHead, tableDB, type, searchPlaceholder, modalData, editRoute}) => {

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

        //console.log(stSearchValue)

        customFetch({
            url: `${type}/GetAll?pageIndex=0&pageSize=200&searchValue=${stSearchValue}&sortDirection=desc&sortFieldName=id`,
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
                                    <ActiveStatusShow status={data[name]}/>
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
                                modalVisible && <DetailsModal navigation={navigation} setModalVisible={setModalVisible} stIdForModal={stIdForModal} urlBaseName={type} modalData={modalData} editRoute={editRoute}/>
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
                                                    data={cellData}
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

export const CommonEntryScreen = (props) => {

    const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);

    const {type, inputs, btnName, btnPress, afterSaveInputs} = props;


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

                showMessage({
                    message: `"${type}" Successfully save data`,
                    type: "success",
                });

                if (typeof afterSaveInputs === 'function') {
                    afterSaveInputs();
                }
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

export const DetailsModal = ({setModalVisible, stIdForModal, navigation, urlBaseName, tableCallback, modalData, editRoute}) => {

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
    const [stProductModal, setProductModal] = useState(modalData);

    useEffect(()=>{

        setLoader(true);

        //console.log(stIdForModal);

        let url = `${urlBaseName}/Get/${stIdForModal}`;

        customFetch({
            url,
            method:'GET',
            callbackResult: (result)=>{

                let productModel = result.model;

                //console.log(productModel);
                //console.log(modalData[1][2].split('|'));

                let table = modalData.map((data)=>{
                    return modalTable(data[0], productModel[ data[2].split('|')[0] ], data[2].split('|')[1]);
                });

                //console.log(table);

                setProductModal(table);

                setLoader(false);

                //tableCallback(setProductModal, productModel);

            },
            navigation,
        })


    }, [])

    const statusToggler = () => {
        customFetch({
            url: urlBaseName + '/Upsert',
            method: 'POST',
            body: {
                id: stIdForModal,
                isActive: false
            },
            callbackResult: (result)=>{
                //setLoader(false);
                console.log('result---->', result);

                showMessage({
                    message: `"${type}" Successfully save data`,
                    type: "success",
                });

            },
            navigation
        });
    }

    const modalTable = (header, data, type) => {

        let modifiedText = '';

        switch (type) {
            case 'text':
                modifiedText = [header, ':', data];
                break;
            case 'taka':
                modifiedText = [header, ':', taka +' '+ data];
                break;
            case 'date':
                modifiedText = [header, ':', moment(data).format('MMMM Do')];
                break;
            case 'status':
                modifiedText = [
                    header, ':',
                    <TouchableOpacity onPress={()=>{
                        showMessage({
                            message: `Change Not Ready yet!`,
                            type: "danger",
                        });
                    }}>
                        <ActiveStatusShow status={data}/>
                    </TouchableOpacity>
                ];
                break;
            default:
                modifiedText = [header, ':', data];
        }

        return modifiedText;
    }

    const editData = () => {
        setModalVisible(prevState => !prevState);
        //console.log(stIdForModal, typeof editRoute, typeof [], typeof {});

        if (typeof editRoute === 'object') {
            navigation.navigate(editRoute.main, {
                id: stIdForModal,
                name: editRoute.name,
                screen: editRoute.child,
            });
        } else {
            navigation.navigate(editRoute, {
                id: stIdForModal
            });
        }
    }

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
                        {editRoute && <CustomButton
                            text="Edit"
                            bgColor={globalButtonColor}
                            onPress={editData}
                        />}
                    </View>

                </View>
            </View>
        </Modal>
    );
}

export const DateField = ({name, value, setValue}) => {

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

export const GenericInput = ({name, type, value, setValue}) => {
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

export const GenericCommentInput = ({name, value, setValue}) => {
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

export const LocalInput = ({inputProps}) => {

    return (
        <View style={{marginTop:30}}>
            <Text style={{fontSize:20, marginBottom:10}}>{inputProps.placeholder}</Text>

            <CustomInput {...inputProps} />
        </View>
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
