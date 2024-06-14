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

import firestore from "@react-native-firebase/firestore";
import Nickname from './nickname';
import DialogInput from 'react-native-dialog-input';


const mycode='iE5G8'
const fr_code='zORE2'

function FriendList ({navigation:{navigate}})  {
  
  const [isMore,setMore]= useState(false)
  const [isDialogVisible, setDialogVisible] = useState(false);
  
  const changeView = () => {
      setMore({})
    };

  //데이터 가져오기
  const [users, setUsers] = useState({
    nickname: '',
    intro:'',
    trvtg:[]
  });
  const usersCollection = firestore().collection('users').doc(fr_code).get();

  const frd_info = async () => {
    try {
      console.log('돌아감');
      const db = (await usersCollection).data();
      setUsers(prevState => ({nickname: db.nickname, intro:db.intro, trvtg: db.trvtg}));
      
      console.log(db);
    } catch (error) {
      console.log(error.message);
    }
  };  

  const toggleDialog = (isVisible) => {
    setDialogVisible(isVisible);
  };

  const handleDialogSubmit = (inputText) => {
    console.log(inputText); // Implement your logic to handle the input text
    toggleDialog(false);
  };
  

  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      
        <View style={styles.container}>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:30,marginTop:10,alignItems:'center'}}>
                <TouchableOpacity onPress={() => navigate('main')}><Icon name='arrow-back-ios' size={24} color="#717171"/></TouchableOpacity>
                <BText fontSize={18}>친구 목록</BText>
                <TouchableOpacity>
                  <Icon name= 'person-add-alt' size={24} color="#717171"/>
                </TouchableOpacity>
                <DialogInput isDialogVisible={isDialogVisible}
                         title={"Add a Friend"}
                         message={"Enter your friend's code:"}
                         hintInput ={"Friend Code"}
                         submitInput={handleDialogSubmit}
                         closeDialog={() => toggleDialog(false)}>
            </DialogInput>
            </View>
           
            <View style={styles.friendbox}>
                {/* 친구 프사 */}
                <LinearGradient style={{width:47,height:47,borderRadius:10,marginRight:20,alignItems:'center',justifyContent:'center'}}
                start={{x:0,y:1}} end={{x:0,y:0}} locations={[0.8,0.9,1]} colors={[fcolors.white,fcolors.gray1,'#EDEDED']} >
  
                    <Icon name='person' size={28} color='#858588'></Icon>  
                </LinearGradient>

                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column'}}>
                        <BText fontSize={16} style={{marginBottom:4}}>{users.nickname}</BText>
                        <NeonGr><RText color={fcolors.gray4}>{users.intro}</RText></NeonGr>
                    </View>
                    <View style={{position:'absolute',right:-185,bottom:20}}>
                      <TouchableOpacity
                        onPress={() => handlePress()}>
                        <Icon name='keyboard-arrow-down' size={30} color={fcolors.gray2}/>
                      </TouchableOpacity>
                      
                    </View>
                      
                </View>
                
            </View>
            <TouchableOpacity style={styles.smallbox}
            onPress={() => frd_info()}>
                    <View><Text style={{color:fcolors.white}}>친구 초대하기</Text></View>
                    
            </TouchableOpacity>
        </View>
        <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home-filled' size={25} color={fcolors.blue}/>
          <RText style={{marginTop:5}}color={fcolors.blue} fontSize={10}>홈</RText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}
          onPress={()=>navigate('test')}>
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
  smallbox:{
    position:'absolute',
    top:-88,
    right:-10,
    backgroundColor:fcolors.blue,
    padding:10,
    borderRadius:10

  }
})

export default FriendList;
