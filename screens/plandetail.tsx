import React, { useEffect, useRef, useState } from 'react';
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
import MText from '../src/components/common/MText';
import Collapsible from 'react-native-collapsible';
import Accordion from '../src/components/common/Accordion'
import BottomBar from '../src/components/common/BottomBar';
import BoxGr from '../src/components/common/BoxGr';
import firestore, { FieldValue } from "@react-native-firebase/firestore";

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)

const plan_id = 'L8WdV6LrBUuCS1qeXKlW'
let plan_title = ''

// 친구id 가져오기
const get_plan = async () => {
  const usersCollection = firestore().collection('plan').doc(plan_id).get();
  const db = (await usersCollection).data();
  console.log(db);
  return db.title;
};




// 백엔드 할 때는 데이터를 파이어베이스에서 가져오도록


export function PlanDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const renderItem = ({ item }) => {
    console.log(plan)
    return (
      <View style={styles.travelplane}>
        <View style={styles.trv_calendar}>

          <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
            <RText fontSize={10} color={fcolor.gray4}>JUNE</RText>
            <TouchableOpacity onPress={() => { navigation.navigate('plande1') }}>
              <BText fontSize={16} color={fcolor.gray4}>6</BText>
            </TouchableOpacity>

          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <NeonGr><MText color={fcolor.gray4}>{item.weather}</MText></NeonGr>
          </View>
        </View>
        <View style={styles.planecontent}>
          <FlatList
            data={planlist}
            renderItem={renderItem1}
            keyExtractor={(item) => String(item.id)}
          />

        </View>

      </View>
    );
  };

  const renderItem1 = ({ item }) => {
    // console.log(item)
    return (
      <View style={styles.planebox}>
        <View style={{ width: '30%' }}>
          {item.state.map((ele,index) => (
            <BoxGr key={`${item.id}-${index}`} name={ele} />
          ))}
        </View>
        <View>
          <BText fontSize={13}>{item.title}</BText>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Icons name={item.content[0]} size={18} color="#717171"/>
              <RText fontSize={10} color={fcolor.gray4}>{item.content[1]}</RText>
            </View>
        </View>
      </View>
    );
  };

  const [isOpend, setOpend] = useState(false);

  //   const transYCamera=useShredValue(0);

  const handlePress = () => {
    setOpend(!isOpend);
  }
  //여기 아래부터는 다 데이터 가져오기
  const [planTitle, setPlanTitle] = useState(null);
  const [plan, setplan] = useState([]);//큰 계획
  const [planlist, setplanlist] = useState([]);//작은 계획


  // // 친구 목록 불러오기
  useEffect(() => {
    const plan_info = async () => {
      try {
        console.log('돌아감');
        let plan = await get_plan();
        console.log(plan)
        //여행 제목
        setPlanTitle(plan)
        let usersCollection = firestore().collection('plan').doc(plan_id).collection('planlist').doc('06.06').get();
        let db = (await usersCollection).data();

        let usersCollection1 = firestore().collection('plan').doc(plan_id).collection('planlist').doc('06.07').get();
        let db1 = (await usersCollection1).data();
        console.log(db.weather)
        setplan(prevState => [
          ...prevState, 
          { weather: db.weather, id: 1 },
          { weather: db1.weather, id: 2 }
        ]);

        const list = db1.plantext
        for (let id = 0; id < list.length; id++) {
          console.log(list[id].state)
          setplanlist(prevState => [...prevState, { ...list[id], id: id + 1 }]);
        }

        // setplanlist(db)

      } catch (error) {
        console.log('안돌아감');
      }
    };
    plan_info();
  }, []);





  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('plan')}><Icon name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>{planTitle}</BText>
          <TouchableOpacity onPress={get_plan}>
            <Icon name='more-vert' size={24} color="#717171" />
          </TouchableOpacity>

        </View>
        <View>
          {/* 여행 중요 메모 */}
          <View style={[styles.trvmemo, isOpend ? { height: 80 } : null]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <BText fontSize={14} color={fcolor.blue}>여행 중요 메모</BText>
              <TouchableOpacity onPress={handlePress}>
                <Icon name='expand-more' size={30} color={fcolor.gray2} />
              </TouchableOpacity>
            </View>
            {isOpend &&
              <View style={{ marginHorizontal: 8 }}>
                <RText fontSize={13} color={fcolor.gray4}>와!</RText>
              </View>
            }


          </View>
        </View>

        <View style={[{ paddingVertical: 10 }, isOpend ? { height: 530 } : { height: 565 }]}>
          {/* 여행 일정 */}
          <FlatList
            data={plan}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
          />


        </View>
        <Pressable
          style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}>
          <Icon name='edit' size={24} color={fcolor.white} />
        </Pressable>

      </View>

      <BottomBar></BottomBar>



    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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

  //여행 중요 메모
  trvmemo: {
    height: 50,
    flexDirection: 'column',
    backgroundColor: '#EEF6FF',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10
  },
  //일정내용
  travelplane: {
    height: 314,
    marginVertical: 10,
    backgroundColor: fcolor.white,
    borderColor: fcolor.skyblue,
    borderWidth: 2,
    borderRadius: 10,
    padding: 14
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
  statebox_g: {
    width: 50,
    height: 20,
    marginRight: 5,
    backgroundColor: fcolor.gray1,
    borderWidth: 1,
    borderColor: fcolor.gray4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statebox_b: {
    width: 50,
    height: 20,
    marginRight: 5,
    backgroundColor: '#F3F7FF',
    borderWidth: 1,
    borderColor: fcolor.blue,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statebox_p: {
    width: 50,
    height: 20,
    marginRight: 5,
    backgroundColor: '#F3ECFF',
    borderWidth: 1,
    borderColor: '#6F19FC',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  statebox_o: {
    width: 50,
    height: 20,
    marginRight: 5,
    backgroundColor: '#FEF3EA',
    borderWidth: 1,
    borderColor: fcolor.orange,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  planebox: {
    margin: 10,
    flexDirection: 'row',
    height: 60,
    width: '100%',
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

export default PlanDetail;
