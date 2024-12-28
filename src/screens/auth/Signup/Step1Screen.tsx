// @ts-nocheck
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonGr from 'src/components/neongr';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from 'src/assets/styles/globalStyles';

import AuthProgress from 'src/screens/auth/components/AuthProgress';
import BackHeader from 'src/components/common/BackHeader';
import {useSignup} from './SignupProvider';

const Step1Screen = ({navigation}) => {
  const {signupStep, handleStepNext, updateSignupData} = useSignup();

  const [checkboxStates, setCheckboxStates] = useState({
    overFourteen: false,
    termsAgree: false,
    privacyPolicy: false,
    personalInfo: false,
    marketing: false,
  });

  const termList = [
    {
      name: 'overFourteen',
      label: '만 14세 이상',
      other: '입니다.',
      url: 'www.naver.com',
    },
    {
      name: 'termsAgree',
      label: '서비스 이용약관',
      other: ' 동의',
      url: 'www.naver.com',
    },
    {
      name: 'privacyPolicy',
      label: '개인전보 처리방침',
      other: ' 동의',
      url: 'www.naver.com',
    },
    {
      name: 'personalInfo',
      label: '개인정보 수집 및 이용',
      other: ' 동의',
      url: 'www.naver.com',
    },
    {
      name: 'marketing',
      label: '마케팅 수신',
      other: ' 동의 (선택)',
      url: 'www.naver.com',
    },
  ];

  // 모두 동의 처리
  const isAllAgree = () => Object.values(checkboxStates).every(value => value);

  const handleChange = checkbox => {
    // 모두 동의 체크박스 처리
    if (checkbox === 'allAgree') {
      const newState = !isAllAgree();
      setCheckboxStates({
        overFourteen: newState,
        termsAgree: newState,
        privacyPolicy: newState,
        personalInfo: newState,
        marketing: newState,
      });
    } else {
      // 개별 항목 처리
      setCheckboxStates(prevState => ({
        ...prevState,
        [checkbox]: !prevState[checkbox],
      }));
    }
  };

  // 다음으로 넘어가기 위한 조건 처리
  const validationNext = () => {
    const {overFourteen, termsAgree, privacyPolicy, personalInfo} =
      checkboxStates;
    return overFourteen && termsAgree && privacyPolicy && personalInfo;
  };

  // 현재 Step 내용 Provider state에 저장 및 navigation
  const handleNext = () => {
    updateSignupData('step1', checkboxStates);
    handleStepNext();
    navigation.navigate('Step2');
  };

  return (
    <View style={globalStyles.container}>
      {/* 회원가입 헤더 */}
      <BackHeader navigation={navigation} isSignup={true} />
      <AuthProgress currentStep={signupStep} />

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
                  checkboxStates[term.name] ? styles.check : null,
                ]}
                onPress={() => handleChange(term.name)}>
                {checkboxStates[term.name] && (
                  <MaterialIcon name="check" size={14} color={fcolor.white} />
                )}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <NeonGr>
                  <MText>{term.label}</MText>
                </NeonGr>
                <MText>{term.other}</MText>
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
          onPress={handleNext}>
          <MText color={fcolor.white}>다음</MText>
        </TouchableOpacity>
      </View>
    </View>
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
  nextbutton: {
    backgroundColor: fcolor.gray4,
    height: 45,
    borderRadius: 10,
  },
});

export default Step1Screen;
