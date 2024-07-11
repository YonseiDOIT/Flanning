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
import NeonGr from '../src/components/neongr';
import MText from '../src/components/common/MText';
import BottomBar from '../src/components/common/BottomBar';
import BoxGr from '../src/components/common/BoxGr';

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
   
        <Animated.View style={[styles.white,{ height: heightAnim }]}{...panResponder.panHandlers}>
            <View style={{alignItems:'center',marginBottom:20}}>
              <TouchableOpacity onPress={()=>(panResponder)}>
                <View style={{width:80,height:4,backgroundColor:fcolor.gray2,borderRadius:50}}/>
              </TouchableOpacity>
              <BText fontSize={18} style={{marginTop:20}}>여행 일정</BText>
            </View>
            

            <View>
                {/* 여행 중요 메모 */}
                <View style={styles.trvmemo}>
                  <BText fontSize={14} color={fcolor.blue} style={{marginBottom:5}}>여행 중요 메모</BText>
                  <RText>{"어쩌구저쩌구"}</RText>
                </View>
              </View>

              <View style={{marginTop:15}}>
                {/* 여행 일정 */}
                
                <View style={styles.travelplane}>
                    <View style={styles.trv_calendar}>
                      <View style={{width:'30%',alignItems:'center',justifyContent:'center'}}>
                        <RText fontSize={10} color={fcolor.gray4}>JUNE</RText>
                        <BText fontSize={16} color={fcolor.gray4}>6</BText>
                      </View>
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                        <NeonGr><MText color={fcolor.gray4}>여행 소제목</MText></NeonGr>
                      </View>
                    </View>
                    <View style={styles.planecontent}>
                      <View style={styles.planebox}>
                        <View style={{width:'30%',flexDirection:'row'}}>
                          <BoxGr></BoxGr>
                        </View>
                        <View>
                          <BText fontSize={13}>곽지해수욕장 석양 구경</BText>
                        </View>
                      </View>
                      <View style={styles.planebox}>
                        <View style={{width:'42%'}}>
                          <View style={styles.statebox_b}>
                              <RText fontSize={10} color={fcolor.blue}>진행예정</RText>
                          </View>
                          <View style={styles.statebox_o}>
                              <RText fontSize={10} color={fcolor.orange}>예약전</RText>
                          </View>
                        </View>
                        <View>
                          <BText fontSize={13}>제주 흑돼지 거리</BText>
                          <RText fontSize={10} color={fcolor.gray4}>가서 직접 예약하기</RText>
                        </View>
                      </View>
                      <View style={styles.planebox}>
                        <View style={{width:'42%'}}>
                          <View style={styles.statebox_b}>
                              <RText fontSize={10} color={fcolor.blue}>진행예정</RText>
                          </View>
                          <View style={styles.statebox_p}>
                              <RText fontSize={10} color='#6F19FC'>예약확정</RText>
                          </View>
                        </View>
                        <View>
                          <BText fontSize={13}>숙소 가기</BText>
                        </View>
                      </View>
                    </View>
        
                </View>
              </View>


        </Animated.View>
      </View>
      
      <BottomBar></BottomBar>
    
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
    height:544,
    padding:15,
    paddingHorizontal:28,
    backgroundColor:fcolor.white,
    elevation:30,

  },
  //여행 중요 메모
  trvmemo:{
    height:90,
    flexDirection:'column',
    backgroundColor:'#EEF6FF',
    padding:24,
    borderRadius:10
  },
  //일정내용
  travelplane:{
    height:314,
    backgroundColor:fcolor.white,
    borderColor:fcolor.skyblue,
    borderWidth:2,
    borderRadius:10,
    padding:14
  },
  trv_calendar:{
    height:50,
    borderRadius:5,
    backgroundColor:fcolor.lblue,
    flexDirection:'row',
    marginBottom:5
  },
  planecontent:{
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10,
    
  },
  statebox_g:{
    marginTop:5,
    width:50,
    height:20,
    marginRight:5,
    backgroundColor:fcolor.gray1,
    borderWidth:1,
    borderColor:fcolor.gray4,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  statebox_b:{
    marginTop:5,
    width:50,
    height:20,
    marginRight:5,
    backgroundColor:'#F3F7FF',
    borderWidth:1,
    borderColor:fcolor.blue,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  statebox_p:{
    marginTop:5,
    width:50,
    height:20,
    marginRight:5,
    backgroundColor:'#F3ECFF',
    borderWidth:1,
    borderColor:'#6F19FC',
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  statebox_o:{
    marginTop:5,
    width:50,
    height:20,
    marginRight:5,
    backgroundColor:'#FEF3EA',
    borderWidth:1,
    borderColor:fcolor.orange,
    borderRadius:4,
    alignItems:'center',
    justifyContent:'center'
  },
  planebox:{
    margin:10,
    flexDirection:'row',
    height:60,
    width:'100%', 
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
