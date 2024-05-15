import React from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MText from '../src/components/common/MText';
import fcolor from '../src/assets/colors/fcolors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';




export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)


export function Main1() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
      <View style={styles.imagebanner}>
        <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:50}}>
          <Image source={require('../src/assets/images/logo.png')} style={{width:89,height:34}}/>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('friend')}><Image style={{width:22,height:16,marginTop:2}}source={require('../src/assets/images/friends.png')}/></TouchableOpacity>
            <TouchableOpacity><Image style={{width:20,height:20,marginLeft:20}}source={require('../src/assets/images/setting.png')}/></TouchableOpacity>
          </View>
        </View>
        
        <BText color='white' fontSize={23} style={{marginBottom:5}}>여행 제목</BText>
      </View>
        
      <View style={styles.white}>
          <View style={styles.travelplane}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <BText fontSize={18}>여행 일정</BText>
                </View>
                <View style={styles.planecontent}>
                    <TouchableOpacity onPress={()=> navigation.navigate("main1")}>
                      <Image source={require('../src/assets/images/pen.png')} style={{width:152,height:152}}/>    
                    </TouchableOpacity>
                    <MText color={fcolor.gray3}>아직 일정이 없어요.</MText>
                    <Text style={{color:fcolor.gray3}}>플래닝과 함께 일정을 세워볼까요?</Text>

                </View>
                  
                
            </View>
          </View> 
      </View>
      
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home-filled' size={25} color={fcolor.blue}/>
          <RText style={{marginTop:5}}color={fcolor.blue} fontSize={10}>홈</RText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='checklist' size={25} color={fcolor.gray3}/>
          <RText style={{marginTop:5}}color={fcolor.gray3} fontSize={10}>여행 목록</RText>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='edit' size={25} color={fcolor.gray3}/>
          <RText style={{marginTop:5}}color={fcolor.gray3} fontSize={10}>리뷰</RText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='settings' size={25} color={fcolor.gray3}/>
          <RText style={{marginTop:5}}color={fcolor.gray3} fontSize={10}>설정</RText> 
        </TouchableOpacity>
      </View>
    
    </GestureHandlerRootView>
    
  );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: fcolor.blue,
        justifyContent:'flex-end'
    },
    imagebanner:{
      paddingLeft: 30,
      paddingRight:30,
      paddingBottom:10
    },
    white:{
      width:'100%',
      height:550,
      backgroundColor:fcolor.white,
      justifyContent:'center',
      elevation:30,

    },
    travelplane:{
      height: 500,
      padding:20,
      margin:20,
      
    },
    //일정내용
    planecontent:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        paddingBottom:30
    },
    planeline:{
      width:1,
      height:100,
      backgroundColor:fcolor.gray4
    },

    // 바텀바
    bottombar:{
      width:"100%",
      height:70,
      backgroundColor:fcolor.gray1,
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
      color:fcolor.gray4
    },

})

export default Main1;
