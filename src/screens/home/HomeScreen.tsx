import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View
} from 'react-native';
// import database from '@react-native-firebase/database';
import {
  GestureHandlerRootView,
  ScrollView,
  // ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import MtC_Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import fcolor from '../../assets/colors/fcolors';
import BText from 'src/components/common/BText';
import RText from 'src/components/common/RText';
// import LinearGradient from 'react-native-linear-gradient';
import MText from 'src/components/common/MText';
// import NeonGr from '../src/components/neongr';
import BottomBar from 'src/components/common/BottomBar';
import { useUser } from 'src/context/UserContext';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from 'src/utils/firebase';
import NeonGr from 'src/components/neongr';
import { getPlan, havePlan } from 'src/components/common/getPlan';
import globalStyles from 'src/assets/styles/globalStyles';
import TypeBox from 'src/components/common/TypeBox';
import { getUserdata } from 'src/components/common/getUserdata';
import { daySlice, getDay, getTime } from 'src/components/common/dataManagement';
import ReservationBox from 'src/components/common/reservationBox';

function HomeScreen({ navigation }) {

  //저장된 유저명
  const { usercode } = useUser();
  //닉네임
  const [user, setUser] = useState('')

  //일정이 있음
  const [have, setHave] = useState(false);

  //일정 제목 데이터
  const [plan, setPlan] = useState({
    title:'',
    dayNumber:0,
    date:'',
    dayOfWeek:'',
    place:'',
  })
  //일정 리스트 데이터
  const [planList, setPlanList] = useState([]);

  //무한반복 막는 용
  const [count, setCount] = useState(0);

  //임시 추천여행지 데이터
  const data = [
    {
      image: require('src/assets/images/home/recommandImage.jpg'),
      location: '양양 서피비치',
      locationInfo: '국내에서 만나는 이국적인 바다감성'
    },
    {
      image: require('src/assets/images/home/recommandImage.jpg'),
      location: '양양 서피비치',
      locationInfo: '국내에서 만나는 이국적인 바다감성'
    },
    {
      image: require('src/assets/images/home/recommandImage.jpg'),
      location: '양양 서피비치',
      locationInfo: '국내에서 만나는 이국적인 바다감성'
    }

  ]
  //임시 가볼만한 곳 데이터
  const data1 = [
    {
      image: require('src/assets/images/home/recommandImage1.jpg'),
      location: '올레길',
      locationInfo: '자연을 만끽하며 걷는 트레킹 코스'
    },
    {
      image: require('src/assets/images/home/recommandImage1.jpg'),
      location: '올레길',
      locationInfo: '자연을 만끽하며 걷는 트레킹 코스'
    },
    {
      image: require('src/assets/images/home/recommandImage1.jpg'),
      location: '올레길',
      locationInfo: '자연을 만끽하며 걷는 트레킹 코스'
    }

  ]


  const getPlanlist = async () => {
    try {
      
      const userdata = await getUserdata(usercode);
      const {have,mainPlan}= await havePlan(usercode); 
      setUser(userdata);
      setHave(have);


      if (have) {
        const { dayNumber, planData, planData1 } = await getPlan(mainPlan);
        console.log(dayNumber)
        const {date,dayOfWeek}= daySlice(planData.dayList[dayNumber-1])

        setPlan({title:planData.title,dayNumber:dayNumber,date:date,
          dayOfWeek:dayOfWeek,place:planData.place});
        
        const planFour= planData1.slice(0, 4);
        setPlanList(planFour);
      }

    } catch (error) {
      console.log(error.message);
    }

  }

  useFocusEffect(
    useCallback(() => {
      getPlanlist();
    }, [usercode])
  );

  //여행 일정
  const renderItem = useCallback(({ item, index }) => {
    getTime(item.time)

    return (
      <View style={{ marginBottom: 8 }}>
        <View style={styles.planecontent}>
          <View style={{ marginRight: 16 }}>
            <View style={styles.numCircle}>
              <MText fontSize={13} color={fcolor.white}>{index + 1}</MText>
            </View>
            <RText fontSize={8} color={fcolor.gray4}>{item.time}</RText>
          </View>
          <View style={{flex: 1,flexDirection:'row', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
              <BText fontSize={15} style={{ marginRight: 16 }}>{item.locationTitle}</BText>
              <TypeBox name={item.locationType}/>
            </View>
            <View style={{marginRight:10}}>
              <ReservationBox state={item.state}/>
            </View>
          </View>
        </View>
        <View style={styles.planecontent}>
          <View style={{ width: 22, height: 44, alignItems: 'center', marginRight: 20 }}>
            {index < 3 ?
              <View style={{ width: 1, height: '100%', backgroundColor: fcolor.lblue1 }}></View>
              :
              <View></View>
            }
          </View>
          <View style={styles.movePath}>
            <MtC_Icon name={item.movePath['type']} size={22} color={fcolor.gray3} style={{ marginRight: 4 }} />
            <MText fontSize={11} color={fcolor.gray4}>{item.content}</MText>
          </View>
        </View>
      </View>
    );
  }, []);

  //추천 여행지
  const recomRenderItem = ({ item, index }) => {
    const notEnd = data[index + 1]
    return (
      <View style={[{ marginTop: 17 }, notEnd ? { marginRight: 16 } : null]}>
        <Image
          source={item.image}
          style={{ width: 244, height: 142, borderRadius: 8 }}
        />
        <View style={{ marginTop: 8, marginLeft: 7 }}>
          <BText fontSize={17} style={{ marginBottom: 4 }}>{item.location}</BText>
          <MText fontSize={13}>{item.locationInfo}</MText>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1,backgroundColor:fcolor.white }}>
      <View style={[styles.container, { flex: 0.05 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 32,
            paddingTop: 20
          }}>
          <Image
            source={require('src/assets/images/home/logo_blue.png')}
            style={{ width: 89, height: 34 }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <MtC_Icon name="bell" size={22} color={fcolor.gray4} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Friend')}>
              <Mt_Icon
                name="group"
                size={25}
                color={fcolor.gray4}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        data={[]}
        style={{ flex: 1, marginBottom: 75 }}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <>
            <View style={[styles.container,{paddingBottom:10}]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <BText fontSize={17} style={{ fontWeight: 'bold' }}>
                  {have ? plan.title : "여행 떠나기"}
                </BText>
                {have &&
                  <TouchableOpacity onPress={() => navigation.navigate('main1')}>
                    <RText color={fcolor.gray4}>상세보기{'>'}</RText>
                  </TouchableOpacity>}
              </View>

              {/* 일정 */}
              {have ?
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row', paddingBottom: 8 }}>
                    <BText fontSize={16} color={fcolor.gray4}>DAY {plan.dayNumber}</BText>
                    <RText fontSize={15} color={fcolor.gray4}
                      style={{ marginLeft: 10 }}>{plan.date}.{plan.dayOfWeek}</RText>
                  </View>
                  <FlatList
                    data={planList}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                :
                <View style={{ justifyContent: 'center', marginVertical: 30 }}>
                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('PlanMake')}>
                      <Image
                        source={require('src/assets/images/home/homeAddPlan.png')}
                        style={{ width: 128, height: 128, margin: 5 }}
                      />
                    </TouchableOpacity>
                    <MText fontSize={14} color={fcolor.gray4}>
                      아직 일정이 없어요.
                    </MText>
                    <MText fontSize={14} color={fcolor.gray4}>
                      플래닝과 함께 일정을 세워볼까요?
                    </MText>
                  </View>
                </View>
              }
            </View>
            <View style={[styles.container, styles.recommend]}>
              <BText fontSize={17} style={{ fontWeight: 'bold', marginBottom: 5 }}>
                {have ? plan?.place + "에서 가볼만한 곳" : user?.nickname + "님을 위한 추천여행지"}
              </BText>
              <MText fontSize={13} color={fcolor.gray4}>
                {have ? "현재 여행중인 " + plan?.place + "에서 여기는 어때요?" : user?.travelType + " 형 여행자들이 좋아하는 여행지예요."}
              </MText>
              <FlatList
                data={have ? data1 : data}
                renderItem={recomRenderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </>
        }
      />
      <BottomBar homecolor={fcolor.blue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fcolor.white,
    padding: 25
  },
  planecontent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  numCircle: {
    width: 22,
    height: 22,
    backgroundColor: fcolor.blue,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2
  },
  movePath: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: fcolor.gray1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  recommend: {
    flex: 0.95,
    borderTopWidth: 4,
    borderColor: fcolor.gray1,
    paddingTop: 20
  },

});

export default HomeScreen;

