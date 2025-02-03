import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {usePlanM} from './PlanMakeProvider';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import RText from 'src/components/common/RText';
import {firestore} from 'src/utils/firebase';
import {useUser} from 'src/context';
import {FieldValue} from '@react-native-firebase/firestore';
import {getUsercode} from 'src/components/common/getUserdata';

// 일정 상세 페이지
const PlanStep4Screen = ({navigation}) => {
  //저장된 유저명
  const {userData} = useUser();

  const {planMData, handleStepNext, setPlanMData} = usePlanM();
  let planMContext = usePlanM();
  const [addfriend, setAddFriend] = useState('');
  const [friends, setFriends] = useState([]);

  const handleChange = value => {
    setPlanMData(prevData => ({
      ...prevData,
      step4: {
        ...prevData.step4,
        ['userList']: [...prevData.step4.userList, value],
      },
    }));
  };

  const handleChange1 = () => {
    console.log(planMData.step3.dayList);
  };

  const friend = [
    {
      nickname: 'dd',
      travelType: 'ddd',
      introduction: 'sada',
    },
    {
      nickname: 'dd1',
      travelType: 'ddd',
      introduction: 'sada',
    },
    {
      nickname: 'dd2',
      travelType: 'ddd',
      introduction: 'sada',
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: fcolor.white, marginVertical: 1}}>
        <View style={styles.friendBox}>
          <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
            <Image
              source={require('../../../assets/images/icon.png')}
              style={{
                width: 56,
                height: 56,
                borderRadius: 200,
                marginRight: 25,
              }}
            />
            <View>
              <View style={{flexDirection: 'row'}}>
                <BText fontSize={15} style={{marginBottom: 10}}>
                  {item.nickname}
                </BText>
                <MText
                  fontSize={13}
                  color={fcolor.gray3}
                  style={{marginLeft: 8}}>
                  {item.travelType}
                </MText>
              </View>
              <RText fontSize={13} color={fcolor.gray3}>
                {item.introduction}
              </RText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // 친구 ID 가져오기
  const get_frdid = async () => {
    const usersCollection = await firestore()
      .collection('users')
      .doc(usercode)
      .get();
    const db = usersCollection.data();
    console.log(db.friend);
    return db.friend;
  };

  const frd_info = async name => {
    try {
      console.log('돌아감');
      let frdid = await get_frdid();
      for (let id = 0; id < frdid.length; id++) {
        const usersCollection = await firestore()
          .collection('users')
          .doc(frdid[id])
          .get();
        const db = usersCollection.data();
        if (db.nickname == name) {
          setFriends(prevState => [
            ...prevState,
            {
              nickname: db.nickname,
              travelType: db.travelType,
              introduction: db.introduction,
            },
          ]);
        }
        ('');
        handleChange(frdid[id]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //db에 저장
  const planMStore = async postData => {
    try {
      if (postData.title === '') {
        postData.title = postData.area;
      }

      const docRef = await firestore().collection('plan').doc(); // 무작위 ID 생성
      await docRef.set(postData);
      for (let i = 0; i < postData.dayList.length; i++) {
        const dayId = planMData.step3.dayList[i]; // dayList의 각 요소 가져오기
        await docRef.collection('planList').doc(dayId);
      }
      return true;
    } catch (error) {
      console.error('데이터 저장 중 에러 발생');
      return false;
    }
  };

  const planMEnd = async () => {
    const now = new Date();
    const koreaTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    console.log(userData);

    const usercode = await getUsercode(userData.email);

    const postData = {
      title: planMData.step1.title,
      area: planMData.step2.place,
      dayList: planMData.step3.dayList,
      creator: usercode,
      createdAt: koreaTime.toISOString(), // 한국시간으로 저장
      userList: planMData.step4.userList,
    };

    const fetchResult = await planMStore(postData);

    if (fetchResult) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } else {
      Alert.alert('데이터 저장 실패');
    }
  };

  return (
    <Animated.View style={{flex: 1}}>
      <View style={{paddingHorizontal: 30}}>
        <View style={{marginTop: 0, gap: 9}}>
          <BText>누구와 여행하나요</BText>
          <View style={{marginBottom: 17}}>
            <MText color={fcolor.gray3} fontSize={14}>
              (선택) 친구와 함께 계획을 세우고 여행을 떠나요.
            </MText>
            <MText color={fcolor.gray3} fontSize={14}>
              혼자 여행한다면 입력하지 않아도 돼요.
            </MText>
          </View>
        </View>

        <View style={styles.box}>
          <TextInput
            style={{fontSize: 13}}
            onChangeText={text => setAddFriend(text)}
            placeholder={'친구를 추가해주세요'}
            placeholderTextColor={fcolor.gray3}
          />
          <TouchableOpacity
            onPress={() => {
              frd_info(addfriend);
            }}>
            <Mt_Icon name="search" size={24} color={fcolor.blue} />
          </TouchableOpacity>
        </View>

        <MText fontSize={15} color={fcolor.gray4} style={{marginTop: 23}}>
          함께하는 친구
        </MText>
      </View>
      <View style={{marginTop: 19}}>
        <View style={{backgroundColor: fcolor.gray1, paddingVertical: 1}}>
          <FlatList
            data={friends}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: 30,
          marginBottom: 64,
        }}>
        <View style={{flexDirection: 'row', gap: 21}}>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              {flex: 1, backgroundColor: fcolor.lblue3},
            ]}
            onPress={() =>
              planMContext.setPlanMStep(planMContext.planMStep - 1)
            }>
            <MText color={fcolor.lblue4}>이전</MText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              {flex: 1, backgroundColor: fcolor.blue},
            ]}
            onPress={() => {
              planMEnd();
            }}>
            <MText color={fcolor.white}>다음</MText>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 45,
    backgroundColor: fcolor.gray1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendBox: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
  },
});

export default PlanStep4Screen;
