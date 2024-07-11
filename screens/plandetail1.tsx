import React, { useRef, useState } from 'react';
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
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
    <View style={styles.planecontent}>
        <View style={styles.planebox}>
          <View style={{ width: '30%'}}>
          {item.state.map((ele,index) => (
            <BoxGr key={`${item.id}-${index}`} name={ele} />
          ))}
            
          </View>
          <View>
            <BText fontSize={13}>{item.title}</BText>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Icon name={item.icon} size={18} color="#717171"/>
              <RText>{item.subtitle}</RText>

            </View>

          </View>
        </View>
      
      </View>
  );
};


// 백엔드 할 때는 데이터를 파이어베이스에서 가져오도록
const data = [
  {
    id: '1',
    state:['진행 완료','예약 확정'],
    title: '곽지해수욕장 석양 구경',
    icon: 'bus',
    subtitle:'버스 타고 이동'

  },
  {
    id: '2',
    state:['진행 중','예약 확정'],
    title: '제주 흑돼지 거리',
    icon: 'calendar-start',
    subtitle:'테이블링으로 가서 직접 예약'
  },
  {
    id: '3',
    state:['진행 중','예약 확정'],
    title: '숙소 가기',
    icon: 'calendar-start',
    subtitle:'고등어회 포장 예약 픽업'
  },
  {
    id: '4',
    state:['진행 중','예약 확정'],
    title: '곽지해수욕장 석양 구경',
    icon: 'bus',
    subtitle:'버스 타고 이동'

  },
  {
    id: '5',
    state:['진행 중','예약 확정'],
    title: '제주 흑돼지 거리',
    icon: 'calendar-start',
    subtitle:'테이블링으로 가서 직접 예약'
  },
  {
    id: '6',
    state:['진행 중','예약 전'],
    title: '숙소 가기',
    icon: 'calendar-start',
    subtitle:'고등어회 포장 예약 픽업'
  }


]

const LIMIT = 5;

export function PlanDetail1() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isOpend, setOpend] = useState(false);
  
  //   const transYCamera=useShredValue(0);

  const handlePress = () => {
    setOpend(!isOpend);
  }

  function handlePress1() {
    if (isOpend) {

    } else {

    }

  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 30,flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('plande')}><Icons name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 제목</BText>
          <Icons name='more-vert' size={24} color="#717171" />
        </View>
        <View style={{flexDirection:'row',paddingHorizontal: 30,marginBottom:20}}>
          <NeonGr><BText fontSize={18} color={fcolor.gray4}>DAY1</BText></NeonGr>
        </View>

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

        

        <View style={{ marginVertical: 15, paddingHorizontal: 30, height:330}}>
          {/* 여행 일정 */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />


        </View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}>
          <Icons name='edit' size={24} color={fcolor.white} />
        </Pressable>



      </View>

      <BottomBar></BottomBar>
    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 550,
    paddingTop: 20,
    backgroundColor: fcolor.white,
  },
  statebox: {
    backgroundColor: fcolor.lblue,
    height: 50,
    borderRadius: 10,
    padding: 17,
    paddingLeft: 22
  },

  white: {
    width: '100%',
    padding: 30,
    paddingTop: 20,
    backgroundColor: fcolor.white,
    elevation: 30,
  },
  imagebanner:{
    height:220,
    width:'100%'
  },


  //여행 중요 메모
  trvmemo: {
    height: 90,
    flexDirection: 'column',
    backgroundColor: '#EEF6FF',
    padding: 24,
    borderRadius: 10
  },
  //일정내용
  travelplane: {
    height: 314,
    marginVertical:10,
    backgroundColor: fcolor.white,
    borderColor: fcolor.skyblue,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    elevation: 2
  },
  trv_calendar: {
    height: 50,
    borderRadius: 5,
    backgroundColor: fcolor.lblue,
    flexDirection: 'row',
    marginBottom: 5
  },
  planecontent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  planebox: {
    marginTop:10,
    marginBottom: 30,
    flexDirection: 'row',
    width: '100%'
  },


  //플로팅 버튼
  fab: {
    width: 40,
    height: 40,
    backgroundColor: fcolor.blue,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    elevation: 2
  }

})

export default PlanDetail1;
