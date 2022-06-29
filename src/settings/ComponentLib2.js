import React from 'react';
import {Text, View} from 'react-native';

export const ActiveStatusShow = ({status}) => {

    return (
        <View style={{alignItems:'center'}}>
            {status ?
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
                        <Text style={{fontSize:8}}> Deactivate </Text>
                    </View>
                </View>}
        </View>
    );
}
