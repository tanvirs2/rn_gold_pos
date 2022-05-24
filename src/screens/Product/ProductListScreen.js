/*eslint-disable*/
import React, {Fragment, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert, Pressable, Modal, ScrollView} from 'react-native';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {apiUrl} from '../../settings/networking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {taka} from '../../assets/symbols';
import moment from 'moment';
import CustomButton from '../../components/CustomButton';

const ProductListScreen = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const [stProducts, setProducts] = useState({
        tableHead: ['Product', 'Category', 'B/P', 'Barcode', 'Status', 'Action'],
        tableData: [
            ['', '', '', '', '', ''],
        ],
    });

    const [stProductModal, setProductModal] = useState({
        tableData: [
            ['Product’s Name', ':', 'Ear Ring'],
            ['Description ', ':', 'Gold Ear Ring Retail.'],
            ['Karat', ':', '21k'],
            ['Weight', ':', '11.5g'],
            ['Price P/G', ':', '2300'],
            ['Buying Price', ':', '5500'],
            ['Selling Price', ':', '7500'],
            ['TAX Effect', ':', 'Yes'],
            ['Barcode', ':', '111029H88N12'],
        ],
    });



    useEffect(()=>{
        async function fetchData() {
            let loginToken = await AsyncStorage.getItem('@storage_token');

            fetch(apiUrl + `Product/GetAll?pageIndex=0&pageSize=20`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${loginToken}`,
                }
            })
                .then(response=>response.json())
                .then(result=>{

                    console.log(result.data);


                    let listArray = result.data.map((data)=>{

                        return [
                            data.name,

                            `cat`,

                            `${taka} `+data.buyingPrice,

                            data.code,

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

                })
        }

        fetchData();
    }, []);

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
      <View style={{margin: 10}}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, paddingBottom: 15}}>
            Product List
          </Text>
        </View>

          <ScrollView>
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
                                      <Rows data={stProductModal.tableData} textStyle={styles.text}/>
                                  </Table>

                                  <CustomButton
                                      text="Edit"
                                      bgColor="gold"
                                  />

                              </View>
                          </View>
                      </Modal>

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
                                                                      <Pressable onPress={()=>{setModalVisible(true)}} style={{alignItems:'center'}}>

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
