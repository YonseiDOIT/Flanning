import React, { useRef } from 'react';
import { Animated, Button, Dimensions, FlatList, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
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

const { height: screenHeight } = Dimensions.get('window');  // 디바이스의 화면 높이

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

export function Plan() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const heightAnim = useRef(new Animated.Value(550)).current; // 초기 높이 값 설정
  

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy < 0) {
          let newHeight = 550 - gesture.dy;
          if (newHeight > screenHeight) newHeight = screenHeight; // 높이 제한
          heightAnim.setValue(newHeight);
        }
      },
      onPanResponderRelease: () => {
        if (heightAnim._value >= screenHeight-70) {
          // 높이가 화면 높이 이상일 때 다음 화면으로 넘어가기
          navigation.navigate('plande'); // 'Test'는 다음 화면의 route name으로 교체 필요
        } else {
          // 그렇지 않을 경우 원래 크기로 복귀
          Animated.spring(heightAnim, {
            toValue: 550,
            useNativeDriver: false
          }).start();
        }
      }
    })
  ).current;
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imagebanner}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            region={{
              latitude: 37.279748,
              longitude: 127.901427,
              latitudeDelta: 3,
              longitudeDelta: 3,
            }}/>
        </View>
   
        <Animated.View style={[styles.white,{ height: heightAnim }]}
          {...panResponder.panHandlers}>
            <View style={{flexDirection:'row',justifyContent:'center',marginBottom:20}}>
              <View style={{width:80,height:4,backgroundColor:fcolor.gray2,borderRadius:50}}/>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <BText fontSize={18}>여행 일정</BText>
            </View>
            <View style={styles.planecontent}>
                {/* 일정 종류 */}

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                />
            </View>
        </Animated.View>
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
      backgroundColor: fcolor.gray2,
      justifyContent:'flex-end'
  },
  imagebanner:{
    flex:1,
    paddingLeft: 30,
    paddingRight:30,
    paddingBottom:10
  },

  white:{
    width:'100%',
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
    height:'93%',
    paddingTop:25,
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

export default Plan;
