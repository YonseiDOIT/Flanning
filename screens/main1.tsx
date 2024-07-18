import React, { memo, useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import BText from '../src/components/common/BText';
import RText from '../src/components/common/RText';
import LinearGradient from 'react-native-linear-gradient';
import MText from '../src/components/common/MText';
import NeonGr from '../src/components/neongr';
import BottomBar from '../src/components/common/BottomBar';
import { useUser } from '../src/components/common/UserContext';
import { usePlan } from '../src/components/common/PlanContext';

import firestore from '@react-native-firebase/firestore';
import BoxGr from '../src/components/common/BoxGr';



export function Main1({ navigation: { navigate } }) {

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
        <View style={{ flexDirection: 'row'}}>
          <BText fontSize={13}>{item.location}</BText>
          <RText fontSize={10} color={fcolor.gray4} style={{marginTop:3,marginLeft:5}}>{item.locationtyp}</RText>
        </View>
        <View style={{ flexDirection: 'row',marginTop:3}}>
        {item.content[0] !== '' && <Icons name={item.content[0]} size={16} color="#717171" />}
          <RText fontSize={10} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
        </View>
      </View>
    </View>

  );

  const handlePress = () => {
    setOpend(!isOpend);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.imagebanner}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50 }}>
            <Image source={require('../src/assets/images/logo.png')} style={{ width: 89, height: 34 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Icons name='bell' size={22} color={fcolor.white}></Icons>
              <TouchableOpacity onPress={() => navigate('friend')}><Icon name='group' size={25} color={fcolor.white} style={{ marginHorizontal: 16 }} /></TouchableOpacity>
              <TouchableOpacity><Icon name='settings' size={25} color={fcolor.white} /></TouchableOpacity>
            </View>
          </View>

          <BText color='white' fontSize={23} style={{ marginBottom: 5 }}>{planTitle.title}</BText>
        </View>


        <View style={styles.white}>
          <View>
            {/* 여행 중요 메모 */}
            <View style={styles.trvmemo}>
              <BText fontSize={14} color={fcolor.blue} style={{ marginBottom: 5 }}>여행 중요 메모</BText>
              <RText>{planTitle.memo}</RText>

            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            {/* 여행 일정 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
              <BText fontSize={15} color={fcolor.gray4}>여행 일정</BText>
              <TouchableOpacity onPress={() => navigate('plan')}><RText color={fcolor.gray4}>상세보기{'>'}</RText></TouchableOpacity>
            </View>
            <View style={styles.travelplane}>
              <View style={styles.trv_calendar}>
                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                  <RText fontSize={10} color={fcolor.gray4}>JULY</RText>
                  <BText fontSize={16} color={fcolor.gray4}>25</BText>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <MText color={fcolor.gray4}>{plan.title}</MText>
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

          <View style={{ marginTop: 15 }}>
            {/* 여행 예산 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
              <BText fontSize={15} color={fcolor.gray4}>여행 예산</BText>

            </View>
            <View style={styles.trvmoney}>
              <View style={styles.moneybar}></View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 }}>
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
  container: {
    flex: 1,
    backgroundColor: fcolor.gray4,
    justifyContent: 'flex-end'
  },
  imagebanner: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    backgroundColor: fcolor.blue
  },
  white: {
    width: '100%',
    height: 544,
    padding: 25,
    paddingHorizontal: 28,
    backgroundColor: fcolor.white,
    elevation: 30,
    marginBottom:60

  },
  //여행 중요 메모
  trvmemo: {
    height: 88,
    flexDirection: 'column',
    backgroundColor: '#EEF6FF',
    padding: 24,
    borderRadius: 10
  },
  //일정내용
  travelplane: {
    height: 235,
    marginTop: 10,
    backgroundColor: fcolor.skyblue,
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
    paddingHorizontal: 10

  },

  planebox: {
    marginTop: 5,
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-around'
  },

  //여행 예산
  trvmoney: {
    height: 75,
    marginTop: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  moneybar: {
    height: 20,
    borderRadius: 5,
    backgroundColor: '#EDEDED',

  },


})

export default Main1;
