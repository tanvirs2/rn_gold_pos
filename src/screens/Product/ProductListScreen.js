/*eslint-disable*/
import React, {Fragment, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Pressable,
    Modal,
    ScrollView,
    RefreshControl,
} from 'react-native';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {customFetch} from '../../settings/networking';
import {taka} from '../../assets/symbols';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';
import LoaderViewScreen from '../../components/LoaderView/LoaderViewScreen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {globalButtonColor} from '../../settings/color';

const DetailsModal = ({setModalVisible, stIdForModal, navigation}) => {

    //const navigation = useNavigation();

    const [stLoader, setLoader] = useState(false);
    const [stProductModal, setProductModal] = useState([
        ['Product’s Name', ':', 'Ear Ring'],
        ['Description ', ':', 'Gold Ear Ring Retail.'],
        ['Karat', ':', '21k'],
        ['Weight', ':', '11.5g'],
        ['Price P/G', ':', '2300'],
        ['Buying Price', ':', '5500'],
        ['Selling Price', ':', '7500'],
        ['TAX Effect', ':', 'Yes'],
        ['Barcode', ':', '111029H88N12'],
    ]);

    useEffect(()=>{

        //console.log('stIdForModal', stIdForModal)
        //console.log(props)

        setLoader(true);

        customFetch({
            url:'Product/Get/' + stIdForModal,
            method:'GET',
            callbackResult: (result)=>{

                //console.log(result.model)

                let productModel = result.model;

                setProductModal([
                    ['Product’s Name',  ':', productModel.name],
                    ['Description ',    ':', productModel.description],
                    ['Karat',           ':', productModel.grade],
                    ['Weight',          ':', productModel.weight],
                    ['Price P/G',       ':', ''],
                    ['Buying Price',    ':', productModel.buyingPrice],
                    ['Selling Price',   ':', productModel.sellingPrice],
                    ['TAX Effect',      ':', productModel.typeId],
                    ['Barcode',         ':', productModel.code],
                ]);

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
                //Alert.alert("Modal has been closed.");
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

                {/*<LoaderViewScreen viewThisComp={stLoader}/>*/}

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

const ProductListScreen = ({navigation}) => {

    const isFocused = useIsFocused();
    const [stRefreshing, setRefreshing] = useState(false);

    const [stLoader, setLoader] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [stIdForModal, setIdForModal] = useState(0);

    const [stProducts, setProducts] = useState({
        tableHead: ['Product', 'Category', 'B/P', 'Barcode', 'Status', 'Action'],
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
            url: 'Product/GetAll?pageIndex=0&pageSize=200',
            method: 'GET',
            callbackResult: (result)=>{

                let listArray = result.data.map((data)=>{

                    return [

                        data.name,

                        data.categoryName,

                        `${taka} `+data.buyingPrice,

                        data.code,

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

        /*async function fetchData() {





            fetch(apiUrl + `Product/GetAll?pageIndex=0&pageSize=200`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${await loginToken()}`,
                }
            })
                .then(response=>response.json())
                .then(result=>{

                    //console.log(result.data);


                })
        }

        fetchData();*/

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
      <View style={{margin: 10, marginBottom:100}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, paddingBottom: 15}}>
            Product List
          </Text>
        </View>

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
                          modalVisible && <DetailsModal setModalVisible={setModalVisible} stIdForModal={stIdForModal}/>
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

                                                              //console.log(cellData)

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

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff'},
  head: {height: 60, backgroundColor: '#f1f8ff'},
  headText: {margin: 5, width: 60},
  text: {margin: 6},
   row: { flexDirection: 'row', backgroundColor: '#ffffff' },
   btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
   btnText: { textAlign: 'center', color: '#fff' }
});

export default ProductListScreen;
