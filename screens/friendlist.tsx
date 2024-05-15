import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database, { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import fcolors from '../src/assets/colors/fcolors';
import BText from '../src/components/common/BText';
import RText from '../src/components/common/RText';
import NeonGr from '../src/components/neongr';
import LinearGradient from 'react-native-linear-gradient';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};



function FriendList ()  {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  const [isMore,setMore]= useState(false)

  const changeView = () => {
      setMore({})
    };
  

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:30,marginTop:10,alignItems:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('main')}><Icon name='arrow-back-ios' size={24} color="#717171"/></TouchableOpacity>
                <BText fontSize={18}>친구 목록</BText>
                <Icon name= 'person-add-alt' size={24} color="#717171"/>
            </View>

            <View style={styles.friendbox}>
                {/* 친구 프사 */}
                <LinearGradient style={{width:47,height:47,borderRadius:10,marginRight:20,alignItems:'center',justifyContent:'center'}}
                start={{x:0,y:1}} end={{x:0,y:0}} locations={[0.8,0.9,1]} colors={[fcolors.white,fcolors.gray1,'#EDEDED']} >
  
                    <Icon name='person' size={28} color='#858588'></Icon>  
                </LinearGradient>

                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column'}}>
                        <BText fontSize={16} style={{marginBottom:4}}>김연세</BText>
                        <NeonGr><RText color={fcolors.gray4}>혼저옵서예</RText></NeonGr>
                    </View>
                    <View style={{position:'absolute',right:-185,bottom:20}}>
                      <TouchableOpacity
                        onPress={() => handlePress()}>
                        <Icon name='keyboard-arrow-down' size={30} color={fcolors.gray2}/>
                      </TouchableOpacity>
                      
                    </View>
                      
                </View>
                
            </View>
        
        </View>
        <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home-filled' size={25} color={fcolors.blue}/>
          <RText style={{marginTop:5}}color={fcolors.blue} fontSize={10}>홈</RText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}
          onPress={()=>navigation.navigate('test')}>
          <Icon name='checklist' size={25} color={fcolors.gray3}/>
          <RText style={{marginTop:5}}color={fcolors.gray3} fontSize={10}>여행 목록</RText>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='edit' size={25} color={fcolors.gray3}/>
          <RText style={{marginTop:5}}color={fcolors.gray3} fontSize={10}>리뷰</RText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='settings' size={25} color={fcolors.gray3}/>
          <RText style={{marginTop:5}}color={fcolors.gray3} fontSize={10}>설정</RText> 
        </TouchableOpacity>
      </View>

    </GestureHandlerRootView>
    
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      padding:25,
      backgroundColor: fcolors.white,
      flexDirection:'column'
  },
  friendbox:{
    width:'100%',
    height:74,
    flexDirection:'row',
    borderRadius:10,
    backgroundColor:fcolors.lblue,
    padding:20,
    alignItems:'center'
  },
  // 바텀바
  bottombar:{
    width:"100%",
    height:70,
    backgroundColor:fcolors.gray1,
    flexDirection:"row",
    justifyContent:'space-around',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10
    
  },
  icon:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  icontext:{
    fontSize:10,
    fontFamily:"Pretendard-Regular",
    padding:5,
    color:fcolors.gray4
  },
})

export default FriendList;
