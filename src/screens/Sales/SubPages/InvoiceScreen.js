/* eslint-disable */

import {Button, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Rows, Table} from 'react-native-table-component';
import IconButton from '../../../components/IconButton/IconButton';

const InvoiceScreen = () => {

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

  return (
      <ScrollView>
          <View style={{flex: 1, alignItems: 'center'}}>

              <View style={{flex: 1, width: '90%'}}>

                  <View style={{alignItems: 'flex-end', marginTop:20 }}>
                      <Text style={{fontWeight:'bold', fontSize:25}}>Gold Sale</Text>
                  </View>

                  <View style={{ marginTop: 25}}>
                      <Text style={{fontWeight:'bold', fontSize:30}}>Invoice</Text>
                  </View>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom:19}}>
                      <Text style={{ fontSize:20 }}>GS00111869 </Text>
                      <Text style={{ fontSize:20 }}> 15.5.2022</Text>
                  </View>


                  <View >
                      <Text style={{ fontSize:16 }}>Customer’s Name : Numaan Hussain  </Text>
                  </View>

                  <View style={{marginBottom:19}}>
                      <Text style={{ fontSize:16 }}>Phone Number      : 01625286551 </Text>
                  </View>


                  {/*Table*/}

                  <View>
                      <View>


                          {
                              [1, 2, 3].map((elm, index) => (
                                  <View key={index} style={{}}>

                                      <View style={{marginBottom: 20}}>

                                          <View style={{backgroundColor: 'gray', borderRadius:3, padding:3, paddingLeft:10}}>
                                              <Text style={{fontWeight:'bold', fontSize:18}}>Item {index+1}</Text>
                                          </View>

                                          <Table>
                                              <Rows data={stTable.tableData} />
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
                          <IconButton name="print"/>
                      </View>
                      <View>
                          <IconButton name="share-social"/>
                      </View>
                      <View>
                          <IconButton name="close-circle" color="red"/>
                      </View>

                  </View>


              </View>


          </View>
      </ScrollView>
  )
}

export default InvoiceScreen;
