// @ts-nocheck
import {View, StyleSheet, Animated, Image, Alert} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import React, {useEffect, useRef, useState} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import FlanningV2Logo from 'src/assets/images/logo/flanning-logo-white-v2.svg';
import LoadingAirplane from 'src/assets/images/auth/LoadingAirplane.svg';
import globalStyles from 'src/assets/styles/globalStyles';
import {useSignup} from './SignupProvider';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonGr from 'src/components/neongr';
import {auth, firestore, storage} from 'src/utils/firebase';
import {generateUniqueCode} from 'src/utils/validators';

const travelTypeList = [
  {
    type: '설악산 등반형',
    title: '새로운 경험이라면 무엇이든 설레!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          액티비티와 자연 탐험을 좋아하는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          낯선 환경에서 새로운 도전에 끌리는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_1.png'),
  },
  {
    type: '불국사 탐방형',
    title: '이 여행지만의 색깔이 궁금해!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          그 지역만의 문화를 나만의 스타일로 즐기는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          남들이 다 가는 곳보다는 새로운 나만의 장소를 찾고 싶답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_2.png'),
  },
  {
    type: '대관령 숲멍형',
    title: '차분한 곳에서 휴식을 즐기고 싶어~',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          평화로운 곳에서 여행을 즐기고 싶은 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          사람이 많은 곳보다 한적한 곳에서 휴식을 취하는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_3.png'),
  },
  {
    type: '한강공원 토크형',
    title: '혼자보다는 함께할 때 더 즐거워!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          여행 동행자와 끈끈한 관계를 형성하기를 원하는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          새로운 사람들을 만날 수 있는 이벤트, 파티를 즐기는 편입니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_4.png'),
  },
  {
    type: '광안리 셀럽형',
    title: '요즘 여기가 그렇게 핫하다던데?',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          인기장소와 최신 트렌드에 민감한 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          SNS에 여행 경험을 공유하는 걸 중요하게 생각하고,
        </MText>
        <MText color={fcolor.gray4}>멋진 '인증샷' 촬영도 즐긴답니다.</MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_5.png'),
  },
  {
    type: '올레길 완주형',
    title: '계획대로 알차게! 오늘도 가보자고!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>계획된 일정에 따르는 여행자예요!</MText>
        <MText color={fcolor.gray4}>
          여행지의 다양한 장소를 많이 방문하고자 합니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_6.png'),
  },
  {
    type: '남해 섬 유랑형',
    title: '지금 여행 가자고? 오히려 좋아~',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>즉흥적으로 여행을 즐기는 여행자예요!</MText>
        <MText color={fcolor.gray4}>
          계획에 얽매이지 않고, 예기치 않은 이벤트와 활동을 통해
        </MText>
        <MText color={fcolor.gray4}>
          활력을 느끼며 새로운 경험을 만끽한답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_7.png'),
  },
  {
    type: '낙동강 유영형',
    title: '나는 뭐든 좋아~ 너의 선택에 맡길게!',
    description: (
      <View style={{alignItems: 'center', gap: 6}}>
        <MText color={fcolor.gray4}>
          어떤 여행이든 즐길 수 있는 융통성 있는 여행자예요!
        </MText>
        <MText color={fcolor.gray4}>
          주변 사람들과 상황에 잘 맞춰 여행을 즐기고,
        </MText>
        <MText color={fcolor.gray4}>
          변화하는 계획도 즐겁게 받아들이며 여행을 즐긴답니다.
        </MText>
      </View>
    ),
    img: require('src/assets/images/auth/TravelType_8.png'),
  },
];

// 스타일 분석하고 있는 것을 보여주는 로딩 페이지
const LoadingScreen = () => {
  const {handleStepNext, signupData, setUserTravelType, userTravelType} =
    useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const coverWidthAnim = useRef(new Animated.Value(100)).current;
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);

  const signUpAuth = async () => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        signupData.step2.email,
        signupData.step2.password,
      );
      if (response.additionalUserInfo?.isNewUser) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signUpStore = async () => {
    try {
      let downloadURL = '';

      const uniqueCode = generateUniqueCode();

      // TODO: 설문에 따른 여행자 분류 모델 연동

      // 프로필 이미지가 있을 경우 업로드
      if (signupData.step3.userImage) {
        downloadURL = await uploadProfileImageToStorage(
          signupData.step2.email,
          signupData.step3.userImage,
        );
      } else {
        // TODO: 여행자 분류에 따른 이미지 저장
      }

      const fetchData = {
        marketingTerm: signupData.step1.marketing,
        email: signupData.step2.email,
        nickname: signupData.step3.nickname,
        introduction: signupData.step3.introduction,
        userImage: downloadURL,
        userTravelStyle: {
          tripType: signupData.step4.tripType,
          tripReason: signupData.step4.tripReason,
          tripLocationType: signupData.step4.tripLocationType,
          tripCompanionsType: signupData.step4.tripCompanionsType,
          tripActivityType: signupData.step4.tripActivityType,
          tripPlanningType: signupData.step4.tripPlanningType,
          tripScheduleType: signupData.step4.tripScheduleType,
          tripNewPerson: signupData.step4.tripNewPerson,
        },
        // TODO: 유저 유형 저장
        // userTripType: userTravelType.type,
      };
      await firestore().collection('users').doc(uniqueCode).set(fetchData);
      return true;
    } catch (error) {
      console.error('데이터 저장 중 에러 발생');
      return false;
    }
  };

  const userTravelTypeStore = async () => {
    try {
      const userType = travelTypeList[2]; // 필요한 여행자 유형 설정
      return userType; // 상태를 업데이트하지 않고 반환
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  useEffect(() => {
    const updateTravelType = async () => {
      const userType = await userTravelTypeStore();
      if (userType) {
        setUserTravelType(userType); // 여기서 안전하게 상태 업데이트
      }
    };
    updateTravelType();
  }, []);

  const uploadProfileImageToStorage = async (userEmail, path) => {
    try {
      const fileName = `${userEmail}.jpg`;

      const reference = storage().ref(`/profile/${fileName}`);
      const task = reference.putFile(path);

      await task;

      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const [loadingList, setLoadingList] = useState([
    {
      title: '선호 여행지를 파악하는 중',
      feature: signUpAuth,
      loading: false,
    },
    {
      title: '여행 태그를 기록하는 중',
      feature: async () => true,
      loading: false,
    },
    {
      title: '여행 스타일을 파악하는 중',
      feature: signUpStore,
      loading: false,
    },
    {
      title: '플래닝과 함께 여행 할 준비 중',
      feature: async () => true,
      loading: false,
    },
  ]);

  useEffect(() => {
    let executionCount = 0;

    const interval = setInterval(() => {
      setLoadingList(prevList => {
        const updatedList = [...prevList];
        if (executionCount < updatedList.length) {
          const response = updatedList[executionCount].feature();
          if (response) {
            updatedList[executionCount].loading = true;
            return updatedList;
          } else {
            Alert('데이터 저장 중 문제가 발생하였습니다');
            return;
          }
        }
      });

      Animated.timing(coverWidthAnim, {
        toValue: 100 - (executionCount + 1) * (100 / loadingList.length),
        duration: 2000,
        useNativeDriver: false,
      }).start();

      executionCount += 1;

      setCurrentLoadingIndex(prevIndex => {
        if (prevIndex >= loadingList.length - 1) {
          clearInterval(interval);
        }
        return prevIndex + 1;
      });

      if (executionCount >= loadingList.length) {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [loadingList.length, coverWidthAnim]);

  useEffect(() => {
    const allLoaded = loadingList.every(item => item.loading);
    if (allLoaded && loadingList.length > 0) {
      const timeout = setTimeout(() => {
        handleStepNext();
      }, 3000);

      return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 정리
    }
  }, [loadingList]);

  const coverWidth = coverWidthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const getTextStyle = index => {
    const isBlinking = index === currentLoadingIndex;
    return {
      color: isBlinking ? fcolor.blue : fcolor.gray4,
      fontWeight: isBlinking ? 'bold' : 'normal',
      opacity: isBlinking ? 1 : 0.3,
    };
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 30}}>
      <View style={{marginTop: 0, gap: 9}}>
        <BText>
          <BText color={fcolor.blue}>플래닝</BText>이{' '}
          <BText color={fcolor.blue}>여행스타일</BText>을{'\n'}
          <BText color={fcolor.blue}>기록</BText>하고 있어요
        </BText>
      </View>

      <View style={[styles.barcodeBox, globalStyles.centered]}>
        <View style={{width: '100%'}}>
          <FlanningV2Logo width={110} height={40} />
        </View>
        <Animated.View style={[styles.coverView, {width: coverWidth}]} />
        <View
          style={[
            globalStyles.centered,
            {paddingHorizontal: 10, width: '100%'},
          ]}>
          <Image
            source={require('src/assets/images/auth/LoadingBarcode.png')}
            style={{width: '100%', height: 100}}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={[styles.loadingContainer, globalStyles.centered]}>
        <View style={styles.loadingTextBox}>
          <NeonGr>
            <BText fontSize={20}>{signupData.step3.nickname}님의</BText>
          </NeonGr>
          <View style={{gap: 14}}>
            {loadingList.map((loadingItem, idx) => (
              <View style={styles.textGroup} key={`loading-${idx}`}>
                <MaterialIcon
                  name="check"
                  size={28}
                  color={loadingItem.loading ? fcolor.blue : fcolor.gray2}
                />
                <MText style={getTextStyle(idx)}>{loadingItem.title}</MText>
              </View>
            ))}
          </View>
        </View>
        <View style={[globalStyles.centered, styles.loadingBackground]}>
          <LoadingAirplane />
        </View>

        {/* Divider */}
        <View
          style={{
            height: 1,
            backgroundColor: fcolor.gray2,
            width: '100%',
            marginBottom: 0,
          }}
        />

        <View>
          <BText fontSize={15}>여행의 시작과 마무리를 플래닝과 함께해요</BText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barcodeBox: {
    position: 'relative',
    marginTop: 30,
    paddingTop: 30,
    paddingHorizontal: 30,
    borderRadius: 15,
    backgroundColor: fcolor.blue,
    overflow: 'hidden',
  },
  coverView: {
    position: 'absolute',
    height: '50%',
    backgroundColor: fcolor.blue,
    right: 30,
    bottom: 20,
    zIndex: 10,
  },
  loadingContainer: {
    position: 'relative',
    marginBottom: 40,
    borderColor: fcolor.gray1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 30,
    gap: 14,
    backgroundColor: fcolor.gray1,
  },
  loadingTextBox: {
    width: '100%',
    zIndex: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 30,
    marginBottom: 30,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  loadingBackground: {
    position: 'absolute',
    zIndex: 5,
  },
});

export default LoadingScreen;
