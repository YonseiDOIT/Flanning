import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Dimensions, FlatList, PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/RText';
import BoldText from '../src/components/common/BText';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import NeonGr from '../src/components/neongr';
import MText from '../src/components/common/MText';
import BottomBar from '../src/components/common/BottomBar';
import BoxGr from '../src/components/common/BoxGr';
import { usePlan } from '../src/components/common/PlanContext';

import firestore from '@react-native-firebase/firestore';

const { height: screenHeight } = Dimensions.get('window');  // 디바이스의 화면 높이

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


export function Plan() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const heightAnim = useRef(new Animated.Value(550)).current; // 초기 높이 값 설정

  //지도
  const [islocation, setlocation] = useState({
    lat: 37.541,
    lng: 126.986
  })


  //아래 내용 끌어오기
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
        if (heightAnim._value >= screenHeight - 70) {
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

  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스될 때 높이를 초기값으로 재설정
      heightAnim.setValue(550);
    }, [heightAnim])
  );



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
      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);


  const renderItem = ({ item }) => (
    <View style={styles.planebox}>
      <View style={{ width: '30%' }}>
        {item.state.map((ele, index) => (
          <BoxGr key={index} name={ele} />
        ))}
      </View>
      <View style={{ width: '60%' }}>
        <View style={{ flexDirection: 'row' }}>
          <BText fontSize={13}>{item.location}</BText>
          <RText fontSize={10} color={fcolor.gray4} style={{ marginTop: 3, marginLeft: 5 }}>{item.locationtyp}</RText>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <Icons name={item.content[0]} size={18} color="#717171" />
          <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
        </View>
      </View>
    </View>

  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imagebanner}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              latitude: islocation.lat,
              longitude: islocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }} />
        </View>

        <Animated.View style={[styles.white, { height: heightAnim }]}{...panResponder.panHandlers}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={() => (panResponder)}>
              <View style={{ width: 80, height: 4, backgroundColor: fcolor.gray2, borderRadius: 50 }} />
            </TouchableOpacity>
            <BText fontSize={18} style={{ marginTop: 20 }}>{planTitle.title}</BText>
          </View>


          <View>
            {/* 여행 중요 메모 */}
            <View style={styles.trvmemo}>
              <BText fontSize={14} color={fcolor.blue} style={{ marginBottom: 5 }}>여행 중요 메모</BText>
              <RText>{planTitle.memo}</RText>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            {/* 여행 일정 */}

            <View style={styles.travelplane}>
              <View style={styles.trv_calendar}>
                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                  <RText fontSize={10} color={fcolor.gray4}>JUNE</RText>
                  <BText fontSize={16} color={fcolor.gray4}>6</BText>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <NeonGr><MText color={fcolor.gray4}>{plan.title}</MText></NeonGr>
                </View>
              </View>
              <View style={styles.planecontent}>
                <FlatList
                  data={planList.filter(dplan => dplan.date === plan.id)}
                  renderItem={renderItem}
                  keyExtractor={(item) => String(item.id)}
                />
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
  container: {
    flex: 1,
    backgroundColor: fcolor.gray2,
    justifyContent: 'flex-end'
  },
  imagebanner: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10
  },

  white: {
    width: '100%',
    height: 544,
    padding: 15,
    paddingHorizontal: 28,
    backgroundColor: fcolor.white,
    elevation: 30,

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
    marginTop: 5,
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
    marginTop: 5,
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
    marginTop: 5,
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
    marginTop: 5,
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

  // 바텀바
  bottombar: {
    width: "100%",
    height: 70,
    backgroundColor: fcolor.gray1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10

  },
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icontext: {
    fontSize: 10,
    fontFamily: "Pretendard-Regular",
    padding: 5,
    color: fcolor.gray4
  },

})

export default Plan;
