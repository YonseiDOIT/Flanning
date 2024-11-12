import React, { memo, useEffect, useMemo, useState } from 'react';
import { Animated, Button, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import fcolor from '../src/assets/colors/fcolors';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import BoxGr from '../src/components/common/BoxGr';
import BottomBar from '../src/components/common/BottomBar';
import MText from '../src/components/common/MText';
import { usePlan } from '../src/components/common/PlanContext';
import { date } from '../src/lib/date';
import LinearGradient from 'react-native-linear-gradient';
import NeonGr from '../src/components/neongr';

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

        setPlan(planList.map(item => {
          let date_word = date(item.id);
          return { title: item.title, id: item.id, mon: date_word[0], day: date_word[1] };
        }));

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
        <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
          <BText fontSize={15} color={"#6AA1F7"}>{item.mon}/{item.day}</BText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }}>
          <View>
          <NeonGr colors={['#ffffff00', fcolor.lblue1]}><MText color={fcolor.gray4}>DAY{item.title}</MText></NeonGr>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('plande1',{day:item.title-1})}>
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
      <View style={{ width: '12%' }}>
        <RText fontSize={12} color={fcolor.gray4}>{item.time}</RText>
      </View>
      <View style={{ width: '12%' }}>
        <BoxGr name={item.locationtyp} />
      </View>
      <View style={{ width: '65%' }}>
        <View style={{ flexDirection: 'row' }}>
          <BText fontSize={15}>{item.location}</BText>

        </View>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {item.content[0] !== '' && <Icons name={item.content[0]} size={22} color="#6AA1F7" />}
          <RText fontSize={12} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
        </View>
      </View>
    </View>
  );

  const handlePress = () => {
    setOpend(!isOpend);
  };

  //그... 뭐냐... 칸 넘기기
  const [activeIndex, setActiveIndex]=useState(0);
  const handleOnScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const indexOfActiveSlide = Math.round(scrollPosition / event.nativeEvent.layoutMeasurement.width);
    setActiveIndex(indexOfActiveSlide);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17, marginTop: 10, alignItems: 'center',marginHorizontal:24 }}>
          <TouchableOpacity onPress={() => navigation.navigate('main1')}>
            <Icon name='arrow-back-ios' size={24} color="#717171" />
          </TouchableOpacity>
          <BText fontSize={18}>{planTitle.title}</BText>
          <TouchableOpacity onPress={get_plan}>
            <Icon name='more-vert' size={24} color="#717171" />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{flexDirection:'row',marginBottom: 20, marginLeft: 12}}>
                          {
                              plan.map((_, idx)=>{
                                  return <View key={idx.toString()}style={[styles.clickbox, idx === activeIndex && styles.dotfill]}>
                                    {idx === activeIndex?
                                    <RText color={fcolor.white}>{plan[idx].mon+'.'+plan[idx].day}</RText>
                                    :
                                    <RText color={fcolor.blue}>{plan[idx].mon+'.'+plan[idx].day}</RText>
                                    }
                                    </View>
                              })
                          }
          </View>
        </View>
        <View style={[{ paddingVertical: 10,alignItems:'center' }, isOpend ? { height: 530 } : { height: 565 }]}>
          <FlatList
            data={plan}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            initialNumToRender={10}
            windowSize={21}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false} 
            onScroll={handleOnScroll}
            
          />
        </View>
        
        {/* <Pressable
          style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}>
          <Icon name='edit' size={24} color={fcolor.white} />
        </Pressable> */}

      </View>
      <BottomBar checkcolor={fcolor.blue} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

  //여행 중요 메모
  clickbox: {
    backgroundColor: fcolor.white,
    borderWidth: 1,
    borderColor: fcolor.lblue1,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:13,
    paddingVertical:8,
    marginHorizontal:5
  },
  //일정내용
  travelplane: {
    width: 350,
    height: 540,
    marginHorizontal:10,
    backgroundColor: fcolor.white,
    borderColor: fcolor.lblue1,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 13,
    
  },
  trv_calendar: {
    height: 50,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderColor: fcolor.lblue1,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  planecontent: {
    justifyContent: 'center'

  },
  planebox: {
    marginVertical: 12,
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  dot:{
    width:8,
    height:8,
    borderRadius:50,
    backgroundColor:fcolor.gray2,
    margin:5
  },
  dotfill:{
      backgroundColor:fcolor.blue,
      borderColor:fcolor.blue,
  }
  ,

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
