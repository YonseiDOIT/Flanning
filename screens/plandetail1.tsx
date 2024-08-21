import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Alarm from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AppText from '../src/components/common/RText';
import BoldText from '../src/components/common/BText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MapView, { Circle, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import NeonGr from '../src/components/neongr';
import MText from '../src/components/common/MText';
import BottomBar from '../src/components/common/BottomBar';
import BoxGr from '../src/components/common/BoxGr';
import { usePlan } from '../src/components/common/PlanContext';

import firestore from '@react-native-firebase/firestore';
export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


export function PlanDetail1({ navigation: { navigate } }) {
  //메인 계획 코드 가져오기
  const { plancode } = usePlan();

  //여행 제목
  const get_plan = async () => {
    const planDoc = await firestore().collection('plan').doc(plancode).get();
    const planData = planDoc.data();
    return { title: planData?.title, memo: planData?.memo };
  };

  //여행 계획
  const get_plan_list = async () => {
    const planListCollection = await firestore().collection('plan').doc(plancode).collection('planlist').get();
    let planList = [];
    planListCollection.forEach(doc => {
      planList.push({ id: doc.id, ...doc.data() });
    });
    return planList;
  };

  const [planTitle, setPlanTitle] = useState({ title: '', memo: '' });
  const [plan, setPlan] = useState({ title: '', id: '' }); // 큰 계획
  const [planList, setPlanList] = useState([]); // 작은 계획
  const [isOpend, setOpend] = useState(false);

  useEffect(() => {
    const plan_info = async () => {
      try {
        const plan = await get_plan();
        console.log(plan)
        setPlanTitle(plan);


        const planList = await get_plan_list();
        console.log(planList[0].title)
        // setPlan을 호출할 때 planList[0]의 각 item을 변환하여 설정
        setPlan({ title: planList[0].title, id: planList[0].id });


        // planList[0]만을 사용하여 fullPlanList를 구성
        let id1 = 0;
        let fullPlanList = [];
        planList[0].plantext.forEach(planItem => {
          fullPlanList.push({ ...planItem, id: id1 += 1, date: planList[0].id });
        });

        setPlanList(fullPlanList);
        fullPlanList.map((num) => {
          setmark((prev) => ({ lat: [...prev.lat, num.latlng[0]], lng: [...prev.lng, num.latlng[1]] }))
        })

        movelocation(fullPlanList[0].latlng[0], fullPlanList[0].latlng[1])

      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.planebox}>
      <View style={{flexDirection:'row',marginTop:3}}>
        <RText fontSize={11} color={fcolor.gray3} style={{marginRight:10}}>18:00</RText>
        <Alarm name='alarm-sharp' size={16} color={fcolor.gray3}/>
      </View>
      <View style={{ width: '23%', marginLeft: 15 }}>
        {item.state.map((ele, index) => (
          <BoxGr key={index} name={ele} />
        ))}
      </View>
      <View style={{ width: '60%' }}>
        <View style={{ flexDirection: 'row' }}>
          <BText fontSize={13}>{item.location}</BText>
          <RText fontSize={10} color={fcolor.gray4} style={{ marginTop: 3, marginLeft: 5 }}>{item.locationtyp}</RText>
        </View>
        <View style={{ flexDirection: 'row',marginTop:5  }}>
          {item.content[0] && <Icon name={item.content[0]} size={18} color="#717171" />}
          <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
        </View>
      </View>
    </View>

  );

  const handlePress = () => {
    setOpend(!isOpend);
  };

  //지도
  const mapRef = useRef(null);
  //지도
  const [islocation, setlocation] = useState({
    lat: 0,
    lng: 0
  })

  const [ismark, setmark] = useState({
    lat: [],
    lng: []
  })


  //지도
  async function movelocation(latitude, longitude) {
    setlocation({ lat: latitude, lng: longitude }); // 위치 상태 업데이트
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0321
        },
        0.1,
      );
    }
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 30, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigate('plande')}><Icons name='arrow-back-ios' size={24} color="#717171" /></TouchableOpacity>
          <BText fontSize={18}>여행 제목</BText>
          <Icons name='more-vert' size={24} color="#717171" />
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 30, marginBottom: 20 }}>
          <NeonGr><BText fontSize={18} color={fcolor.gray4}>DAY1</BText></NeonGr>
        </View>

        <View style={styles.imagebanner}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: 37.541,
              longitude: 126.986,
              latitudeDelta: 0.0722,
              longitudeDelta: 0.0221
            }}>

            <Polyline
              coordinates={[
                { latitude: 33.5070772, longitude: 126.4934311 },
                { latitude: 33.51274309999999, longitude: 126.5283168 },
                { latitude: 33.4934657, longitude: 126.5343138 },
              ]}
              strokeWidth={2}
              strokeColor={fcolor.blue}
            />

            {ismark.lat.map((coord, index) => (
              <Circle
                key={index}
                center={{
                  latitude: coord,
                  longitude: ismark.lng[index],
                }}
                radius={400}
                strokeColor={fcolor.blue}
                strokeWidth={5}
                fillColor={"#fff"}
                zIndex={1}

              />
            ))}
          </MapView>
        </View>



        <View style={{ marginVertical: 15, paddingHorizontal: 26, height: 330 }}>
          {/* 여행 일정 */}
          <FlatList
            data={planList.filter(dplan => dplan.date === plan.id)}
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
  imagebanner: {
    height: 220,
    width: '100%'
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
    marginVertical: 10,
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
    marginTop: 10,
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
