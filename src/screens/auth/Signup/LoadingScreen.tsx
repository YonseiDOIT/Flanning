// @ts-nocheck
import {View, StyleSheet, Animated, Image, Alert, Platform} from 'react-native';
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
import RNFS from 'react-native-fs';
import {useAuth} from 'src/context';

// 스타일 분석하고 있는 것을 보여주는 로딩 페이지
const LoadingScreen = () => {
  const {handleStepNext, signupData, setSignupData} = useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const coverWidthAnim = useRef(new Animated.Value(100)).current;
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const {setIsSigningup} = useAuth();

  useEffect(() => {
    setIsSigningup(true);
  }, [setSignupData]);

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

      // 프로필 이미지가 있을 경우 업로드
      if (signupData.step3.userImage) {
        downloadURL = await uploadProfileImageToStorage(
          signupData.step2.email,
          signupData.step3.userImage,
        );
      } else {
        // 프로필 이미지를 등록하지 않았으면 여행자 분류에 따른 이미지 업로드
        downloadURL = await uploadProfileImageToStorage(
          signupData.step2.email,
          signupData.step5.img,
        );
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
        travelType: signupData.step5.type,
      };
      await firestore().collection('users').doc(uniqueCode).set(fetchData);
      return true;
    } catch (error) {
      console.error('데이터 저장 중 에러 발생');
      return false;
    }
  };

  useEffect(() => {
    if (signupData.step5?.type) {
      signUpStore();
    }
  }, [signupData.step5]);

  const uploadProfileImageToStorage = async (userEmail, imageSource) => {
    try {
      const fileName = `${userEmail}.jpg`;
      const reference = storage().ref(`/profile/${fileName}`);
      let filePath;

      if (typeof imageSource === 'string') {
        // 사용자가 업로드한 로컬 파일 (예: 갤러리에서 선택한 이미지)
        filePath = imageSource;
      } else if (typeof imageSource === 'number') {
        // require()로 가져온 정적 이미지
        const resolvedImage = Image.resolveAssetSource(imageSource);

        if (!resolvedImage || !resolvedImage.uri) {
          throw new Error('이미지 리소스를 확인할 수 없습니다.');
        }

        if (Platform.OS === 'ios') {
          // iOS에서는 정적 이미지를 로컬로 복사한 후 업로드해야 함
          const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

          // 🔹 정적 이미지 로컬로 저장
          const downloadRes = await RNFS.downloadFile({
            fromUrl: resolvedImage.uri, // 정적 이미지 URL
            toFile: localFilePath, // 로컬 저장 경로
          }).promise;

          if (downloadRes.statusCode === 200) {
            filePath = `file://${localFilePath}`;
          } else {
            throw new Error('로컬 파일 저장 실패');
          }
        } else {
          filePath = resolvedImage.uri; // Android에서는 직접 업로드 가능
        }
      } else {
        throw new Error('Invalid image source type');
      }

      const task = reference.putFile(filePath);
      await task;

      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Firebase Storage Upload Error:', error);
      throw error;
    }
  };

  const [loadingList, setLoadingList] = useState([
    {
      title: '선호 여행지를 파악하는 중',
      feature: async () => signUpAuth(),
      loading: false,
    },
    {
      title: '여행 태그를 기록하는 중',
      feature: async () => true,
      loading: false,
    },
    {
      title: '여행 스타일을 파악하는 중',
      feature: async () => true,
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
