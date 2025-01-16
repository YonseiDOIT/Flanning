// @ts-nocheck
import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useSignup} from './SignupProvider';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonGr from 'src/components/neongr';
import globalStyles from 'src/assets/styles/globalStyles';

const Step1Screen = () => {
  const {signupData, handleStepNext, setSignupData} = useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const termList = [
    // 1. 만 14세 이상 이용 가능 동의
    {
      name: 'overFourteen',
      label: '만 14세 이상입니다.',
      url: 'www.naver.com',
    },
    // 2. 서비스 이용약관 동의
    {
      name: 'termsAgree',
      label: '서비스 이용약관 동의',
      url: 'www.naver.com',
    },
    // 3. 개인정보 처리방침 동의
    {
      name: 'privacyPolicy',
      label: '개인정보 처리방침 동의',
      url: 'www.naver.com',
    },
    // 4. 개인정보 수집 및 이용 동의
    {
      name: 'personalInfo',
      label: '개인정보 수집 및 이용 동의',
      url: 'www.naver.com',
    },
    // 5. 마케팅 수신 동의
    {
      name: 'marketing',
      label: '마케팅 수신 동의 (선택)',
      url: 'www.naver.com',
    },
  ];

  // 모두 동의 처리
  const isAllAgree = () =>
    Object.values(signupData.step1).every(value => value);

  const handleChange = checkbox => {
    // 모두 동의 체크박스 처리
    if (checkbox === 'allAgree') {
      const newState = !Object.values(signupData.step1).every(value => value);
      setSignupData(prevData => ({
        ...prevData,
        step1: {
          overFourteen: newState,
          termsAgree: newState,
          privacyPolicy: newState,
          personalInfo: newState,
          marketing: newState,
        },
      }));
    } else {
      // 개별 항목 처리
      setSignupData(prevData => ({
        ...prevData,
        step1: {
          ...prevData.step1,
          [checkbox]: !prevData.step1[checkbox],
        },
      }));
    }
  };

  // 다음으로 넘어가기 위한 조건 처리
  const validationNext = () => {
    const {overFourteen, termsAgree, privacyPolicy, personalInfo} =
      signupData.step1;
    return overFourteen && termsAgree && privacyPolicy && personalInfo;
  };

  return (
    <Animated.View style={{flex: 1, opacity: fadeAnim}}>
      {/* 타이틀 및 설명 */}
      <View style={{marginTop: 0, gap: 9}}>
        <BText>
          <BText color={fcolor.blue}>약관</BText>에{' '}
          <BText color={fcolor.blue}>동의</BText>해주세요
        </BText>
        <MText color={fcolor.gray3}>
          플래닝이 여러분의 소중한 개인정보를 지킬게요
        </MText>
      </View>

      {/* 약관 동의 */}
      <View style={styles.box}>
        <View style={styles.line}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                globalStyles.centered,
                isAllAgree() ? styles.check : null,
              ]}
              onPress={() => handleChange('allAgree')}>
              {isAllAgree() && (
                <MaterialIcon name="check" size={14} color={fcolor.white} />
              )}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'colum',
                alignItems: 'flex-start',
                gap: 10,
              }}>
              <NeonGr>
                <MText>모두 동의</MText>
              </NeonGr>
              <MText fontSize={13} color={fcolor.gray4}>
                서비스 이용을 위해 약관에 모두 동의합니다
              </MText>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={{height: 1, backgroundColor: fcolor.gray3}} />

        {termList.map((term, idx) => (
          <View key={`term-${idx}`} style={styles.line}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  globalStyles.centered,
                  signupData.step1[term.name] ? styles.check : null,
                ]}
                onPress={() => handleChange(term.name)}>
                {signupData.step1[term.name] && (
                  <MaterialIcon name="check" size={14} color={fcolor.white} />
                )}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <MText>{term.label}</MText>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: fcolor.gray4,
                }}>
                <MText color={fcolor.gray4} fontSize={13}>
                  보기
                </MText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
        <TouchableOpacity
          style={[
            globalStyles.buttonBase,
            globalStyles.centered,
            validationNext()
              ? {backgroundColor: fcolor.blue}
              : {backgroundColor: fcolor.gray4},
          ]}
          disabled={!validationNext()}
          onPress={handleStepNext}>
          <MText color={fcolor.white}>다음</MText>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginTop: 60,
    marginBottom: 40,
    borderColor: fcolor.gray1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    gap: 14,
    backgroundColor: fcolor.gray1,
  },
  line: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    height: 24,
    width: 24,
    backgroundColor: fcolor.white,
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor: fcolor.gray3,
  },
});

export default Step1Screen;
