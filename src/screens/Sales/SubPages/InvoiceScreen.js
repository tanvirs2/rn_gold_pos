/* eslint-disable */

import {Button, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Rows, Table} from 'react-native-table-component';
import IconButton from '../../../components/IconButton/IconButton';
import logo from '../../../../assets/images/logo_with_black.png';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LoaderViewScreen from '../../../components/LoaderView/LoaderViewScreen';
import moment from 'moment';
import {taka} from '../../../assets/symbols';
import {globalBackgroundColor} from '../../../settings/color';
import RNPrint from 'react-native-print';

const InvoiceScreen = ({route}) => {

    const navigation = useNavigation();
    const invoiceData = route.params;
    const {height} = useWindowDimensions();
    const isFocused = useIsFocused();

    const [stLoader, setLoader] = useState(false);
    const [stInvoiceData, setInvoiceData] = useState({});

    /*
    * "dueAmount": 2400,
    * "paidAmount": "2000",
    * "totalAmount": 4400,
    * "vatAmount": 600
    * */

    const [stTable, setTable] = useState({
        tableData: [
            ['Product’s Name', ':', 'Ear Ring'],
            ['Description', ':', 'Gold Ear Ring Retail.'],
            ['Karat', ':', '21k'],
            ['Weight', ':', '11.5g'],
            ['Price P/G', ':', '2300'],
            ['Barcode', ':', '111029H88N12'],
        ],
    });

    useEffect(()=>{
        setInvoiceData(route.params);
        console.log(route.params);
    },[isFocused]);

    const printThisSale = async () => {

        //setLoader(true);
        await RNPrint.print({
            html: '<h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3>'
        })

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
                      <Text style={{fontWeight:'bold', fontSize:30}}>Sales Invoice</Text>
                      <Text style={{fontStyle:'italic', fontSize:20, color:'red' }}>{stInvoiceData?.type}</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:19}}>
                      <Text style={{ fontSize:18, color:'#6e0000' }}>{stInvoiceData?.invoiceNo} </Text>
                      <Text style={{ fontSize:20 }}> { moment().format('DD/MM/Y') } </Text>
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

                                          <View style={{backgroundColor: globalBackgroundColor, borderRadius:3, padding:3, paddingLeft:10, marginBottom:3,
                                              marginLeft: -1}}>
                                              <Text style={{fontWeight:'bold', fontSize:18, color:'#000'}}>Item {index+1}</Text>
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

                  <View style={{borderStyle:'dotted', borderWidth:2, borderColor:globalBackgroundColor, padding:10}}>
                      <View>
                          <View >

                              <View style={{marginBottom: 20}}>


                                  <Table>
                                      <Rows data={[
                                          ['Sub Total', ':', `${taka} ${stInvoiceData.subTotal}/=`],
                                          [`VAT (${stInvoiceData.vatPercent}%)`, ':', `${taka} ${stInvoiceData.vatAmount}/=`],
                                      ]} />
                                  </Table>

                              </View>

                          </View>
                      </View>

                      <View>
                          <View >


                              <View style={{marginBottom: 20}}>

                                  <View style={{borderColor: 'gray', borderBottomWidth:1, marginBottom:10}}/>

                                  <Table>
                                      <Rows data={[
                                          ['Payable Amount', ':', `${taka} ${stInvoiceData.totalAmount}/=`],
                                          ['Paid', ':', `${taka} ${stInvoiceData.paidAmount}/=`],
                                          ['Due Amount', ':', `${taka} ${stInvoiceData.dueAmount}/=`],
                                      ]} />
                                  </Table>

                              </View>


                          </View>
                      </View>
                  </View>


                  <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical:10}}>
                      <View>
                          <IconButton name="print" color="#000" onPress={printThisSale}/>
                      </View>
                      <View>
                          <TouchableOpacity>
                              <IconButton name="share-social"/>
                          </TouchableOpacity>
                      </View>
                      <View>
                          <IconButton name="chevron-back-outline" onPress={()=>{
                              navigation.navigate('Sales')
                          }}/>
                      </View>

                  </View>


              </View>


          </View>
      </ScrollView>
  )
}

export default InvoiceScreen;
