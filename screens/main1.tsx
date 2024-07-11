import React, { memo } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/RText';
import BoldText from '../src/components/common/BText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import BText from '../src/components/common/BText';
import RText from '../src/components/common/RText';
import LinearGradient from 'react-native-linear-gradient';
import MText from '../src/components/common/MText';
import NeonGr from '../src/components/neongr';
import BottomBar from '../src/components/common/BottomBar';

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
    bigicontype:'map-marker',
    smicontype:'bus',
    title:'여행코스1',
    subtitle: "이동시간 (~분 소요)",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'3',
    bigicontype:'map-marker',
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

export function Main1() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imagebanner}>
       
          <View style={{flexDirection:'row', justifyContent:'space-between',paddingBottom:50}}>
            <Image source={require('../src/assets/images/logo.png')} style={{width:89,height:34}}/>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <Icons name='bell' size={22} color={fcolor.white}></Icons>
              <TouchableOpacity onPress={() => navigation.navigate('friend')}><Icon name='group' size={25} color={fcolor.white} style={{marginHorizontal:16}}/></TouchableOpacity>
              <TouchableOpacity><Icon name='settings' size={25} color={fcolor.white}/></TouchableOpacity>
            </View>
          </View>
          
          <BText color='white' fontSize={23} style={{marginBottom:5}}>여행 제목</BText>
        </View>
      
        
      <View style={styles.white}>
          <View>
            {/* 여행 중요 메모 */}
            <View style={styles.trvmemo}>
              <BText fontSize={14} color={fcolor.blue} style={{marginBottom:5}}>여행 중요 메모</BText>
              <RText>{"어쩌구저쩌구"}</RText>
                  
            </View>
          </View>

          <View style={{marginTop:15}}>
            {/* 여행 일정 */}
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20, alignItems:'center'}}>
              <BText fontSize={15} color={fcolor.gray4}>여행 일정</BText>
              <TouchableOpacity onPress={()=>navigation.navigate('plan')}><RText color={fcolor.gray4}>상세보기{'>'}</RText></TouchableOpacity>
            </View>
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
                    <View style={{width:'42%',flexDirection:'row'}}>
                      <View style={styles.statebox_g}>
                          <RText fontSize={10}>진행중</RText>
                      </View>
                    </View>
                    <View>
                      <BText fontSize={13}>곽지해수욕장 석양 구경</BText>
                    </View>
                  </View>
                  <View style={styles.planebox}>
                    <View style={{width:'42%',flexDirection:'row'}}>
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
                    <View style={{width:'42%',flexDirection:'row'}}>
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

          <View style={{marginTop:15}}>
            {/* 여행 예산 */}
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20, alignItems:'center'}}>
              <BText fontSize={15} color={fcolor.gray4}>여행 예산</BText>
              
            </View>
            <View style={styles.trvmoney}>
              <View style={styles.moneybar}></View>            
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:7}}>
                <RText fontSize={10} color={fcolor.gray4}>예산 - 원</RText>
                <MText fontSize={10} color={fcolor.gray4}>남은 예산 - 원</MText>
              </View>
            </View>
          </View>
               
      </View>
      </View>

      <BottomBar></BottomBar>
    
    </GestureHandlerRootView>
    
  );
};


const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor: fcolor.gray4,
      justifyContent:'flex-end'
  },
  imagebanner:{
    flex:1,
    paddingTop:30,
    paddingLeft: 30,
    paddingRight:30,
    paddingBottom:10,
    backgroundColor:fcolor.blue
  },
  white:{
    width:'100%',
    height:544,
    padding:25,
    paddingHorizontal:28,
    backgroundColor:fcolor.white,
    elevation:30,

  },
  //여행 중요 메모
  trvmemo:{
    height:88,
    flexDirection:'column',
    backgroundColor:'#EEF6FF',
    padding:24,
    borderRadius:10
  },
  //일정내용
  travelplane:{
    height:235,
    marginTop:10,
    backgroundColor:fcolor.skyblue,
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
    paddingHorizontal:10
    
  },
  statebox_g:{
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
    margin:8,
    flexDirection:'row',
    height:40,
    width:'100%', 
  },

  //여행 예산
  trvmoney:{
    height:75,
    marginTop:10,
    backgroundColor:'#FAFAFA',
    borderRadius:10,
    paddingVertical:16,
    paddingHorizontal:24
  },
  moneybar:{
    height:20,
    borderRadius:5,
    backgroundColor:'#EDEDED',

  },


})

export default Main1;
