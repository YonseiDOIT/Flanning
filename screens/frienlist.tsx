import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BoldText from '../src/components/common/BoldText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};



function FriendList ()  {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:40,alignItems:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('main')}><Icon name='arrow-back-ios' size={30} color="#717171"/></TouchableOpacity>
                <BoldText>친구 목록</BoldText>
                <Icon name= 'person-add-alt' size={30} color="#717171"/>
            </View>

            <View style={styles.friendbox}>
                {/* 친구 프사 */}
                <View style={{width:47,height:47, backgroundColor:'white', 
                justifyContent:'center', alignItems:'center',marginRight:40}}>
                    <Icon name='person' size={28} color='#858588'></Icon>
                </View>

                <View style={{flexDirection:'column'}}>
                    <Text style={{fontFamily:'Pretendard-SemiBold',fontSize:16,color:'black'}}>김연세</Text>
                    <Text>김연세</Text>
                </View>
            </View>
        
        </View>

    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      padding:25,
      backgroundColor: "#FFFFFF",
      flexDirection:'column'
  },
  friendbox:{
    width:'100%',
    height:96,
    flexDirection:'row',
    borderRadius:10,
    backgroundColor:"#F7F7F7",
    padding:20,
    alignItems:'center'
  }
})

export default FriendList;
