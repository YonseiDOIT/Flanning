import React, { useRef } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/AppText';
import BoldText from '../src/components/common/BoldText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)

const renderItem = ({ item }) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',paddingBottom:20}}>
      <View style={{flexDirection:'column',alignItems:'center',paddingRight:20,}}>
        <Icons style={{paddingBottom:10}} name={item.bigicontype} size={28} color="#717171"/>
          <View style={styles.planeline}></View>
      </View>
      {/* 일정 상세 */}
      <View style={{flexDirection:'column',paddingRight:20,}}>
        <Text style={{fontFamily:"Pretendard-Bold",color:'black',fontSize:16}}>{item.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
            <Icons style={{paddingRight:10}} name={item.smicontype} size={18} color="#9E9E9E"/>
              <Text style={{fontSize:13}}>{item.subtitle}</Text>
          </View>
          <View style={{borderColor:'#9E9E9E',width:'auto',height:'auto',padding:20,borderWidth:1,borderRadius:4, alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:13}}>{item.memo}</Text>
          </View>
      </View>
      
    </View>
  );
};


// 백엔드 할 때는 데이터를 파이어베이스에서 가져오도록
const data=[
  {
    id:'1',
    bigicontype:'airplane',
    smicontype:'airplane-takeoff',
    title:'출발지',
    subtitle: "출발지 > 도착지",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'2',
    bigicontype:'map-marker-outline',
    smicontype:'bus',
    title:'여행코스1',
    subtitle: "이동시간 (~분 소요)",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'3',
    bigicontype:'map-marker-outline',
    smicontype:'bus',
    title:'여행코스2',
    subtitle: "이동시간 (~분 소요)",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'4',
    bigicontype:'airplane',
    smicontype:'airplane-landing',
    title:'출발지',
    subtitle: "출발지 > 도착지",
    memo:'여행이나 일정에 대한 메모 '
  },


]

const LIMIT = 5;

export function Plan() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const isOpend=useRef(false);
//   const transYCamera=useShredValue(0);

  function handlePress(){
    if(isOpend.current){

    }else{

    }
    
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
      <View style={styles.imagebanner}>
        
      </View>
        
      <View style={styles.white}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontFamily:"Pretendard-SemiBold",fontSize:20,color:"black"}}>여행 일정</Text>
            </View>
            <View style={styles.planecontent}>
                {/* 일정 종류 */}

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                />
                <Pressable 
                    onPress={handlePress}
                    style={({pressed})=> pressed ? [styles.fab,{transform: [{scale:0.9}]} ] : [styles.fab]}>
                    <Icon name='edit' size={28} color="#717171"/>
                </Pressable>
            </View>
        </View>
      </View>
      
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home' size={30} color="#000000"/>
          <Text style={[styles.icontext,{color:"#000000"}]}>홈</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='checklist' size={25} color="#717171"/>
          <Text style={styles.icontext}>여행 목록</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='edit' size={28} color="#717171"/>
          <Text style={styles.icontext}>리뷰</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='settings' size={28} color="#717171"/>
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
    height:470,
    padding:30,
    paddingTop:50,
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
    paddingTop:20,
    flexDirection:'column'
  },
  planeline:{
    width:1,
    height:100,
    backgroundColor:fcolor.gray4
  },

  //플로팅 버튼
  fab:{
    width: 56,
    height:56,
    backgroundColor:fcolor.gray2,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:0,
    bottom:0
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

export default Plan;
