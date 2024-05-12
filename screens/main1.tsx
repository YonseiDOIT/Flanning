import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/AppText';
import BoldText from '../src/components/common/BoldText';
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
        <View style={{flexDirection:'row',justifyContent:'flex-end',paddingBottom:20}}>
          <TouchableOpacity onPress={() => navigation.navigate('friend')}><Icon style={{marginRight:15}}name='group-add' size={28} color={fcolor.gray4}/></TouchableOpacity>
          <TouchableOpacity><Icon name='settings' size={28} color={fcolor.gray4}/></TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', paddingBottom:10}}>
          <TouchableOpacity>
            <Icons name='image-outline' size={28} color={fcolor.gray4}></Icons>
          </TouchableOpacity>
        </View>
        <BoldText color='white'>여행 제목</BoldText>
      </View>
        
      <View style={styles.white}>
          <View style={styles.travelplane}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontFamily:"Pretendard-SemiBold",fontSize:20,color:"black"}}>여행 일정</Text>
                  <TouchableOpacity><Text>상세보기{'>'}</Text></TouchableOpacity>
                </View>
                <View style={styles.planecontent}>
                    <TouchableOpacity onPress={()=> navigation.navigate("main1")}>
                        <View style={{width:207,height:208,backgroundColor:fcolor.gray1,justifyContent:'center',alignItems:'center', marginBottom:30}}>
                            <Text style={{color:fcolor.gray4}}>일러스트</Text>
                        </View>    
                    </TouchableOpacity>
                    <Text style={{color:fcolor.gray3}}>아직 일정이 없어요.</Text>
                    <Text style={{color:fcolor.gray3}}>플래닝과 함께 일정을 세워볼까요?</Text>

                </View>
                  
                
            </View>
          </View> 
      </View>
      
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home' size={30} color={fcolor.black}/>
          <Text style={[styles.icontext,{color:fcolor.black}]}>홈</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='checklist' size={25} color={fcolor.gray4}/>
          <Text style={styles.icontext}>여행 목록</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='edit' size={28} color={fcolor.gray4}/>
          <Text style={styles.icontext}>리뷰</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='settings' size={28} color={fcolor.gray4}/>
          <Text style={styles.icontext}>설정</Text>  
        </TouchableOpacity>
        
        
        
        
      </View>
    
    </GestureHandlerRootView>
    
  );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: fcolor.gray2,
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      justifyContent:'center',
      elevation:30,

    },
    travelplane:{
      height: 500,
      padding:20,
      margin:20,
      borderColor:fcolor.gray3,
      borderWidth:1,
      borderRadius:10,
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
      height:84,
      backgroundColor:fcolor.gray2,
      flexDirection:"row",
      justifyContent:'space-around',
      alignItems:'center'
      
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
