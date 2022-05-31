/* eslint-disable */

import {Button, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rows, Table} from 'react-native-table-component';
import IconButton from '../../../components/IconButton/IconButton';
import logo from '../../../../assets/images/logo_with_black.png';
import {useIsFocused} from '@react-navigation/native';
import {customFetch} from '../../../settings/networking';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';

const InvoiceScreen = ({route}) => {

    const {height} = useWindowDimensions();
    const isFocused = useIsFocused();

    const [stLoader, setLoader] = useState(false);
    const [stInvoiceData, setInvoiceData] = useState({});

    const [stTable, setTable] = useState({
        tableData: [
            ['Product’s Name', ':', 'Ear Ring'],
            ['Description', ':', 'Gold Ear Ring Retail.'],
            ['Karat', ':', '21k'],
            ['Weight', ':', '11.5g'],
            ['Price P/G', ':', '2300'],
            ['Barcode', ':', '111029H88N12'],
        ],
        amountTable: [
            ['Sub Total', ':', '7689'],
            ['VAT (15%)', ':', '750'],
            ['Discount', ':', '0'],
        ],
        amountTable2: [
            ['Payable Amount', ':', '8450'],
            ['Due Amount', ':', '0'],
        ],
    });

    useEffect(()=>{
        setInvoiceData(route.params);
        //console.log(route.params);
    },[isFocused]);

    const saveSales = () => {

        setLoader(true);

        customFetch({
            url: 'Sale/Upsert',
            method: 'POST',
            body: {
                "id": 0,
                "shopId": 1,
                "cname": " Tanvir Sharkar",
                "cmobile": "01911223344",
                "caddress": "Savar",
                "totalAmount": 500,
                "vatAmount": 200,
                "paidAmount": 100,
                "dueAmount": 300,
                "typeId": 14902,
                "categoryId": 15101,
                "comment": "test",
                "productList": [
                    {
                        "id": 0,
                        "productId": 27,
                        "weight": 2,
                        "price": 300,
                        "ptotal": 600,
                        "discountAmount": 0
                    },
                    {
                        "id": 0,
                        "productId": 25,
                        "weight": 2,
                        "price": 300,
                        "ptotal": 600,
                        "discountAmount": 0
                    }
                ]
            },
            callbackResult: (result) => {
                console.log(result);
                setLoader(false);
            },
            callbackError: (err) => {
                alert(err);
                setLoader(false);
            },
        });
    };

  return (
      <ScrollView>

          <LoaderViewScreen viewThisComp={stLoader}/>

          <View style={{flex: 1, alignItems: 'center', color: '#fff'}}>

              <View style={{flex: 1, width: '90%'}}>

                  <View style={{alignItems: 'flex-end', marginTop:20 }}>
                      {/*<Text style={{fontWeight:'bold', fontSize:25}}>Gold Sale</Text>*/}
                      <Image
                          source={logo}
                          style={{height: height * 0.1, width:'50%'}}
                          resizeMode="contain"
                      />
                  </View>

                  <View style={{ marginTop: 25}}>
                      <Text style={{fontWeight:'bold', fontSize:30}}>Invoice</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:19}}>
                      <Text style={{ fontSize:20 }}>GS00111869 </Text>
                      <Text style={{ fontSize:20 }}> 15.5.2022</Text>
                  </View>

                  {/*{
                                    id :            0,
                                    shopId :        1,
                                    cname :         stCustomerName,
                                    cmobile :       stMobileNumber,
                                    caddress :      stAddress,
                                    comment :       stComment,
                                    productList :[
                                        ...stTable
                                    ]
                                }*/}

                  <View >
                      <Text style={{ fontSize:16 }}>Customer’s Name : {stInvoiceData?.cname}  </Text>
                  </View>

                  <View style={{marginBottom:19}}>
                      <Text style={{ fontSize:16 }}>Phone Number      : {stInvoiceData?.cmobile} </Text>
                  </View>


                  {/*Table*/}

                  <View>
                      <View>


                          {
                              stInvoiceData.productList?.map((elm, index) => {

                                  //console.log('tbl--------------->',elm)

                                  return <View key={index} style={{}}>

                                      <View style={{marginBottom: 20}}>

                                          <View style={{backgroundColor: 'gray', borderRadius:3, padding:3, paddingLeft:10, marginBottom:3,
                                              marginLeft: -1}}>
                                              <Text style={{fontWeight:'bold', fontSize:18}}>Item {index+1}</Text>
                                          </View>

                                          <Table>
                                              <Rows data={elm.table} />
                                          </Table>

                                      </View>

                                  </View>
                              })
                          }


                      </View>
                  </View>

                  <View>
                      <View >


                          {
                              [1].map((elm, index) => (
                                  <View key={index}>

                                      <View style={{marginBottom: 20}}>

                                          <View style={{borderColor: 'gray', borderBottomWidth:1, marginBottom:10}}/>

                                          <Table>
                                              <Rows data={stTable.amountTable} />
                                          </Table>

                                      </View>

                                  </View>
                              ))
                          }


                      </View>
                  </View>

                  <View>
                      <View >


                          {
                              [1].map((elm, index) => (
                                  <View key={index}>

                                      <View style={{marginBottom: 20}}>

                                          <View style={{borderColor: 'gray', borderBottomWidth:1, marginBottom:10}}/>

                                          <Table>
                                              <Rows data={stTable.amountTable2} />
                                          </Table>

                                      </View>

                                  </View>
                              ))
                          }


                      </View>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical:10}}>
                      <View>
                          <IconButton name="print" color="#000" onPress={saveSales}/>
                      </View>
                      <View>
                          <TouchableOpacity>
                              <IconButton name="share-social"/>
                          </TouchableOpacity>
                      </View>
                      <View>
                          <TouchableOpacity>
                              <IconButton name="close-circle"/>
                          </TouchableOpacity>
                      </View>

                  </View>


              </View>


          </View>
      </ScrollView>
  )
}

export default InvoiceScreen;
