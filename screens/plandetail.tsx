import React, { memo, useEffect, useState } from 'react';
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import NeonGr from '../src/components/neongr';
import BoxGr from '../src/components/common/BoxGr';
import BottomBar from '../src/components/common/BottomBar';
import MText from '../src/components/common/MText';
import { usePlan } from '../src/components/common/PlanContext';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};




const PlanDetail = () => {
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

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [planTitle, setPlanTitle] = useState({ title: '', memo: '' });
  const [plan, setPlan] = useState([]); // 큰 계획
  const [planList, setPlanList] = useState([]); // 작은 계획
  const [isOpend, setOpend] = useState(false);

  useEffect(() => {
    const plan_info = async () => {
      try {
        const plan = await get_plan();
        setPlanTitle(plan);

        const planList = await get_plan_list();
        setPlan(planList.map(item => ({ title: item.title, id: item.id })));

        let id1 = 0;
        let fullPlanList = [];
        planList.forEach(item => {
          item.plantext.forEach(planItem => {
            fullPlanList.push({ ...planItem, id: id1 += 1, date: item.id });
          });
        });
        setPlanList(fullPlanList);
      } catch (error) {
        console.error(error);
      }
    };
    plan_info();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.travelplane}>
      <View style={styles.trv_calendar}>
        <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
          <RText fontSize={10} color={fcolor.gray4}>JUNE</RText>
          <BText fontSize={16} color={fcolor.gray4}>6</BText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }}>
          <View>
            <NeonGr><MText color={fcolor.gray4}>{item.title}</MText></NeonGr>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('plande1')}>
            <Icon name='arrow-forward' size={24} color={fcolor.blue} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.planecontent}>
        <FlatList
          data={planList.filter(plan => plan.date === item.id)}
          renderItem={renderItem1}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </View>
  );

  const renderItem1 = ({ item }) => (
    <View style={styles.planebox}>
      <View style={{ width: '30%', marginRight: 10 }}>
        {item.state.map((ele, index) => (
          <BoxGr key={index} name={ele} />
        ))}
      </View>
      <View>
        <View style={{ flexDirection: 'row' }}>
          <BText fontSize={13}>{item.location}</BText>
          <RText fontSize={10} color={fcolor.gray4} style={{ marginTop: 3, marginLeft: 5 }}>{item.locationtyp}</RText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {item.content[0] && <Icons name={item.content[0]} size={18} color="#717171" />}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, marginTop: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('plan')}>
            <Icon name='arrow-back-ios' size={24} color="#717171" />
          </TouchableOpacity>
          <BText fontSize={18}>{planTitle.title}</BText>
          <TouchableOpacity onPress={get_plan}>
            <Icon name='more-vert' size={24} color="#717171" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={[styles.trvmemo, isOpend ? { height: 80 } : null]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <BText fontSize={14} color={fcolor.blue}>여행 중요 메모</BText>
              <TouchableOpacity onPress={handlePress}>
                <Icon name='expand-more' size={30} color={fcolor.gray2} />
              </TouchableOpacity>
            </View>
            {isOpend &&
              <View style={{ marginHorizontal: 8 }}>
                <RText fontSize={13} color={fcolor.gray4}>{planTitle.memo}</RText>
              </View>
            }
          </View>
        </View>
        <View style={[{ paddingVertical: 10 }, isOpend ? { height: 530 } : { height: 565 }]}>
          <FlatList
            data={plan}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            initialNumToRender={10}
            windowSize={21}
          />
        </View>
        <Pressable
          style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}>
          <Icon name='edit' size={24} color={fcolor.white} />
        </Pressable>
      </View>
      <BottomBar />
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
    width: '100%',
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
    marginBottom: 5,
    alignItems: 'center',
  },
  planecontent: {
    justifyContent: 'center',
    paddingHorizontal: 10

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
