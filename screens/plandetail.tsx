import React, { useRef } from 'react';
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/RText';
import BoldText from '../src/components/common/BText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NeonGr from '../src/components/neongr';

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
        <Icons style={{paddingBottom:10}} name={item.bigicontype} size={32} color={fcolor.gray4}/>
          <View style={styles.planeline}></View>
      </View>
      {/* 일정 상세 */}
      <View style={{flexDirection:'column',paddingRight:20,}}>
        <Text style={{fontFamily:"Pretendard-Bold",color:'black',fontSize:16}}>{item.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15,marginLeft:5}}>
            <Icons style={{paddingRight:10}} name={item.smicontype} size={24} color={fcolor.gray3}/>
              <RText color={fcolor.gray4}>{item.subtitle}</RText>
          </View>
          <View style={styles.memo}>
              <RText color={fcolor.gray4}>{item.memo}</RText>
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

export function PlanDetail() {
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
        <View style={{flexDirection:'row', justifyContent:'space-between',marginBottom:30,marginTop:10,alignItems:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('main')}><Icon name='arrow-back-ios' size={24} color="#717171"/></TouchableOpacity>
                <BText fontSize={18}>여행 제목</BText>
                <Icon name= 'person-add-alt' size={24} color="#717171"/>
        </View>

        <View style={styles.statebox}>
            <View style={{flexWrap:'wrap'}}>
                <NeonGr><BText fontSize={13} color={fcolor.gray4}>여행 정보 상세보기</BText></NeonGr>
            </View>
            
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
                        <Icon name='edit' size={24} color={fcolor.white}/>
                    </Pressable>
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
    height:550,
    padding:30,
    paddingTop:20,
    backgroundColor:fcolor.white,
  },
  statebox:{
    backgroundColor:fcolor.lblue,
    height:50,
    borderRadius:10,
    padding:17,
    paddingLeft:22
  },

  white:{
    width:'100%',
    height:550,
    padding:30,
    paddingTop:20,
    backgroundColor:fcolor.white,
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
    height:'85%',
    paddingTop:25,
    padding:17,
    flexDirection:'column'
  },
  planeline:{
    width:1,
    height:100,
    backgroundColor:fcolor.gray4
  },
  memo:{
    borderColor:fcolor.orange,
    borderLeftWidth:4,
    width:'auto',
    height:'auto',
    padding:18,
    marginLeft:5,
    marginTop:5,
    alignItems:'center',
    justifyContent:'center'
  },

  //플로팅 버튼
  fab:{
    width: 40,
    height:40,
    backgroundColor:fcolor.blue ,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:0,
    bottom:0,
    elevation:2
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

export default PlanDetail;
