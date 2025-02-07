import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useAuth, useUser} from 'src/context';
import {FieldValue} from '@react-native-firebase/firestore';
import {getUsercode} from 'src/components/common/getUserdata';
import {useFocusEffect} from '@react-navigation/native';
import {getFriend} from 'src/components/common/getFriend';

// 일정 상세 페이지
const PlanStep4Screen = ({navigation}) => {
  //저장된 유저명
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {planMData, handleStepNext, setPlanMData} = usePlanM();
  const {userData} = useUser();
  const {authData} = useAuth();

  let planMContext = usePlanM();
  const [friendList, setFriendList] = useState('');

  const [userCode, setUserCode] = useState('');
  const [selectedFriends, setSelectedFriends] = useState(
    planMData.step4.userList,
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setSelectedFriends(planMData.step4.userList);
  }, [planMData.step4.userList]);

  const handleSelectFriend = id => {
    if (selectedFriends.includes(id)) {
      setPlanMData(prevData => ({
        ...prevData,
        step4: {
          ...prevData.step4,
          ['userList']: selectedFriends.filter(option => option !== id),
        },
      }));
    } else {
      setPlanMData(prevData => ({
        ...prevData,
        step4: {
          ...prevData.step4,
          ['userList']: [...prevData.step4.userList, id],
        },
      }));
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{backgroundColor: fcolor.white}}>
        <View style={styles.friendBox}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', gap: 25, alignItems: 'center'}}>
              <Image
                source={{uri: item.userImage}}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 200,
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
            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                borderRadius: 200,
                borderWidth: 2,
                borderColor: selectedFriends.includes(item.code)
                  ? fcolor.lblue5
                  : fcolor.gray3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handleSelectFriend(item.code)}>
              {selectedFriends.includes(item.code) && (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: fcolor.lblue5,
                    borderRadius: 200,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const getUserCode = async () => {
      if (authData) {
        const userCodeResult = await getUsercode(authData.email);
        setUserCode(userCodeResult);
      }
    };
    getUserCode();
  }, [userData]);

  const getList = async () => {
    try {
      const data = await getFriend(userCode);
      if (data) {
        setFriendList(data);
      } else {
        setFriendList([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getList();
    }, [userCode, userData]),
  );

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

    const postData = {
      title: planMData.step1.title,
      area: planMData.step2.place,
      dayList: planMData.step3.dayList,
      creator: userCode,
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
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      <View style={{paddingHorizontal: 30}}>
        <View style={{marginTop: 0, gap: 9}}>
          <BText>누구와 여행하나요</BText>
          <View style={{gap: 6}}>
            <MText color={fcolor.gray3} fontSize={14}>
              (선택) 함께 계획을 공유하고 싶은 친구를 선택할 수 있어요
            </MText>
            <MText color={fcolor.gray3} fontSize={14}>
              혼자 여행한다면 선택하지 않아도 돼요
            </MText>
          </View>
        </View>

        <MText fontSize={15} color={fcolor.gray4} style={{marginTop: 23}}>
          내 친구
        </MText>
      </View>
      <View
        style={{
          marginTop: 19,
          flex: 1,
          height: '100%',
        }}>
        <FlatList
          data={friendList}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View style={{height: 2, backgroundColor: fcolor.gray1}} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View
        style={{
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
