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
import MapView, { Circle, Marker,LatLng, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import NeonGr from '../src/components/neongr';
import MText from '../src/components/common/MText';
import BottomBar from '../src/components/common/BottomBar';
import BoxGr from '../src/components/common/BoxGr';
import { usePlan } from '../src/components/common/PlanContext';

import firestore from '@react-native-firebase/firestore';
import { date } from '../src/lib/date';
export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


export function PlanDetail1({ navigation: { navigate },route }) {
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
  const [plan, setPlan] = useState({ title: '', id: '',date:'' }); // 큰 계획
  const [planList, setPlanList] = useState([]); // 작은 계획
  const [isOpend, setOpend] = useState(false);

  useEffect(() => {
    const plan_info = async () => {
      try {
        const plan = await get_plan();
        console.log(plan)
        setPlanTitle(plan);


        const planlist = await get_plan_list();
        console.log(planlist[route.params.day].title)
        // setPlan을 호출할 때 planList[0]의 각 item을 변환하여 설정

        let s_date= planlist[route.params.day].id.split('-')
        console.log('뭐임?')
        console.log(s_date)
        let start_d=s_date[0].slice(2,4)+'.'+s_date[1]+'.'+s_date[2]

        setPlan({ title: planlist[route.params.day].title, id: planlist[route.params.day].id,date:start_d });


        // planList[0]만을 사용하여 fullPlanList를 구성
        let id1 = 0;
        let fullPlanList = [];
        planlist[route.params.day].plantext.forEach(planItem => {
          fullPlanList.push({ ...planItem, id: id1 += 1, date: planlist[route.params.day].id });
        });

        //지도 좌표 배열
        const polylist1 = [];

        //좌표
        setPlanList(fullPlanList);
        fullPlanList.map((num) => {
          polylist1.push({ latitude: num.latlng[0], longitude: num.latlng[1]}),
          setmark((prev) => ({ lat: [...prev.lat, num.latlng[0]], lng: [...prev.lng, num.latlng[1]] }))
        })

        console.log(polylist1);
        const region = calculateRegion(polylist1);
        movelocation(region);

      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);

  // 정보 더 보기 버튼 이벤트
  const [moreview, setmoreview] = useState({});
  const toggleMenu = (index) => {
    setmoreview((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // 현재 아이템의 상태를 토글
    }));
  };

  const renderItem = ({ item }) => {
    
    return(
      <View style={styles.planebox}>
      <View style={{width:'10%'}}>
        <RText fontSize={12} color={fcolor.gray4}>{item.time}</RText>
      </View>
      <View style={{width:'12%'}}>
        <BoxGr name={item.locationtyp}/>
      </View>
      <View style={{ width: '65%' }}>
        <View style={{ flexDirection: 'row' }}>
          <BText fontSize={15}>{item.location}</BText>
           <TouchableOpacity onPress={()=>{toggleMenu(item.id)}}>
            <Icons name='arrow-drop-down'style={{ marginLeft: 5 }} size={24} color={fcolor.lblue1}></Icons>
          </TouchableOpacity>
        </View>
        
        { moreview[item.id] && ( // 각 아이템에 대한 smallboxVisible 상태를 확인
          <>
            <View style={{ flexDirection: 'row',marginTop:5  }}>
              {item.content[0] && <Icon name={item.content[0]} size={18} color="#717171" />}
              <RText fontSize={11} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
            </View>
            <View style={{borderLeftWidth:1,borderColor:fcolor.lblue1, paddingLeft:14,marginTop:10,marginLeft:8,paddingVertical:5}}>
              <RText fontSize={10} color={fcolor.gray4}>{item.subcont}</RText>
            </View>
          </>
        )}
      </View>
    </View>
    )
      };

  const handlePress = () => {
    setOpend(!isOpend);
  };

  //지도
  var polylist: LatLng[] = [];
  const mapRef = useRef(null);
  //지도
  const [islocation, setlocation] = useState({
    lat: 0,
    lng: 0
  })

  const [ismark, setmark] = useState({
    lat: [],
    lng: [],
    title:[]
  })

//지도 중심 계산
const calculateRegion = (coordinates) => {
  const latitudes = coordinates.map(coord => coord.latitude);
  const longitudes = coordinates.map(coord => coord.longitude);

  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);

  const latitudeDelta = maxLatitude - minLatitude;
  const longitudeDelta = maxLongitude - minLongitude;

  const centerLatitude = (minLatitude + maxLatitude) / 2;
  const centerLongitude = (minLongitude + maxLongitude) / 2;

  return {
    latitude: centerLatitude,
    longitude: centerLongitude,
    latitudeDelta: latitudeDelta * 1.4, // 여유 공간을 위해 1.2를 곱해줌
    longitudeDelta: longitudeDelta * 1.4,
  };
};



//지도
async function movelocation(region) {
  setlocation({ lat: region.latitude, lng: region.longitude }); // 위치 상태 업데이트
  console.log(region.latitude)
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta
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
          <BText fontSize={18}>{planTitle.title}</BText>
          <Icons name='more-vert' size={24} color="#717171" />
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 30, marginBottom: 15, alignItems:'center'}}>
          <NeonGr colors={['#ffffff00',fcolor.lblue1]}><BText fontSize={16}>DAY{plan.title}</BText></NeonGr>
          <View style={{ marginLeft: 10 }}><RText fontSize={15} color={fcolor.gray4}>{plan.date}</RText></View>
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
            

            {ismark.lat.map((coord, index) => (
              polylist.push({ latitude: ismark.lat[index], longitude: ismark.lng[index] }),
              <Marker
                key={index}
                coordinate={{
                  latitude: ismark.lat[index],
                  longitude: ismark.lng[index],
                }}
                //title={String(ismark.title[index])}
                pinColor={fcolor.blue}
              />
              
              
            ))}

            <Polyline
              coordinates={polylist}
              strokeWidth={2}
              strokeColor={fcolor.blue}
            />
          </MapView>
        </View>



        <View style={{ marginVertical: 15, paddingHorizontal: 18, height: 330 }}>
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

      <BottomBar homecolor={fcolor.blue}></BottomBar>
    </GestureHandlerRootView>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 550,
    paddingTop: 20,
    backgroundColor: fcolor.lblue2,
  },
  statebox: {
    backgroundColor: fcolor.lblue2,
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
    borderColor: fcolor.lblue1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    elevation: 2
  },
  trv_calendar: {
    height: 50,
    borderRadius: 5,
    backgroundColor: fcolor.lblue2,
    flexDirection: 'row',
    marginBottom: 5
  },
  planecontent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,

  },
  planebox: {
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    width: '100%',
    backgroundColor:fcolor.white,
    borderRadius:8,
    padding:14,
    borderWidth:1,
    borderColor: fcolor.lblue1,
    justifyContent:'space-around',
    alignItems:'baseline'
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
