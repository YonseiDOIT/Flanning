// @ts-nocheck
import {View, StyleSheet, Animated, Image} from 'react-native';
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

// 스타일 분석하고 있는 것을 보여주는 로딩 페이지
const Step5Screen = () => {
  const {handleStepNext, signupData} = useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const coverWidthAnim = useRef(new Animated.Value(100)).current;
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0);
  const [loadingList, setLoadingList] = useState([
    {
      title: '선호 여행지를 파악하는 중',
      loading: false,
    },
    {
      title: '여행 태그를 기록하는 중',
      loading: false,
    },
    {
      title: '여행 스타일을 파악하는 중',
      loading: false,
    },
    {
      title: '플래닝과 함께 여행 할 준비 중',
      loading: false,
    },
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const interval = setInterval(() => {
      setLoadingList(prevList => {
        const updatedList = [...prevList];
        if (currentLoadingIndex < updatedList.length) {
          updatedList[currentLoadingIndex].loading = true;
        }
        return updatedList;
      });

      Animated.timing(coverWidthAnim, {
        toValue: 100 - (currentLoadingIndex + 1) * (100 / loadingList.length),
        duration: 2000,
        useNativeDriver: false,
      }).start();

      setCurrentLoadingIndex(prevIndex => {
        if (prevIndex >= loadingList.length - 1) {
          clearInterval(interval);

          // 모든 항목이 로딩되었을 때 handleStepNext 호출
          const allLoaded = loadingList.every(item => item.loading);
          if (allLoaded) {
            setTimeout(() => {
              handleStepNext();
            }, 3000);
          }
        }
        return prevIndex + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [fadeAnim, currentLoadingIndex, loadingList, handleStepNext]);

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
    <View style={{flex: 1}}>
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

export default Step5Screen;
