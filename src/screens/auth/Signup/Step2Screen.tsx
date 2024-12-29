// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useSignup} from './SignupProvider';
import {validateEmail, validatePassword} from 'src/utils/validators';
import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';

const Step2Screen = () => {
  const {signupStep, handleStepNext, signupData, setSignupData} = useSignup();
  const [showPW, setShowPW] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleChange = (field, value) => {
    setSignupData(prevData => ({
      ...prevData,
      step2: {
        ...prevData.step2,
        [field]: value,
      },
    }));
  };

  // 다음으로 넘어가기 위한 조건 처리
  const validationNext = () => {
    const {email, password, passwordRe} = signupData.step2;
    return (
      email &&
      password &&
      passwordRe &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === passwordRe
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>
        <View style={{marginTop: 0, gap: 9}}>
          <BText>이메일 회원가입</BText>
          <MText color={fcolor.gray3}>플래닝과 함께 여행을 시작해요</MText>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <MText style={{marginHorizontal: 20, fontWeight: 700}}>
              이메일<MText color={fcolor.orange}>*</MText>
            </MText>
            <TextInput
              style={styles.loginbox}
              value={signupData.step2.email}
              onChangeText={text => handleChange('email', text)}
              placeholder={'example@flanning.com'}
            />
            {signupData.step2.email === '' ? null : !validateEmail(
                signupData.step2.email,
              ) ? (
              <RText color={fcolor.orange} style={{marginHorizontal: 20}}>
                이메일 형식이 올바르지 않습니다
              </RText>
            ) : (
              <RText color={fcolor.lblue4} style={{marginHorizontal: 20}}>
                가입 가능한 이메일입니다
              </RText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <MText style={{marginHorizontal: 20, fontWeight: 700}}>
              비밀번호<MText color={fcolor.orange}>*</MText>
            </MText>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.loginbox, {paddingRight: 40}]}
                value={signupData.step2.password}
                onChangeText={password => handleChange('password', password)}
                secureTextEntry={showPW}
                placeholder={'8자 이상으로 입력'}
              />
              {/* TODO: 패스워드 보기 버튼 동작 안하므로 수정해야함 */}
              <TouchableOpacity
                style={[styles.iconWrapper]}
                onPress={() => console.log('클릭')}>
                <MaterialIcon
                  name={showPW ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={fcolor.gray3}
                />
              </TouchableOpacity>
            </View>
            {signupData.step2.password === '' ? null : !validatePassword(
                signupData.step2.password,
              ) ? (
              <RText color={fcolor.orange} style={{marginHorizontal: 20}}>
                하나 이상의 숫자, 대문자, 소문자를 포함해주세요
              </RText>
            ) : (
              <RText color={fcolor.lblue4} style={{marginHorizontal: 20}}>
                사용 가능한 비밀번호입니다
              </RText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <MText style={{marginHorizontal: 20, fontWeight: 700}}>
              비밀번호 확인<MText color={fcolor.orange}>*</MText>
            </MText>
            <View>
              <View>
                <TextInput
                  style={[styles.loginbox, {paddingRight: 40}]}
                  value={signupData.step2.passwordRe}
                  onChangeText={passwordRe =>
                    handleChange('passwordRe', passwordRe)
                  }
                  secureTextEntry={showPW}
                  placeholder={'8자 이상으로 입력'}
                />
              </View>
              {/* TODO: 패스워드 보기 버튼 동작 안하므로 수정해야함 */}
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => console.log('클릭')}>
                <MaterialIcon
                  name={showPW ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={fcolor.gray3}
                />
              </TouchableOpacity>
            </View>
            {signupData.step2.passwordRe === ''
              ? null
              : signupData.step2.password !== signupData.step2.passwordRe && (
                  <RText color={fcolor.orange} style={{marginHorizontal: 20}}>
                    비밀번호가 일치하지 않습니다
                  </RText>
                )}
          </View>
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 60,
    marginBottom: 40,
    gap: 20,
  },
  inputGroup: {
    gap: 10,
  },
  loginbox: {
    height: 50,
    borderWidth: 1,
    borderColor: fcolor.gray1,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: fcolor.gray1,
    zIndex: 0,
    pointerEvents: 'auto',
  },
  iconWrapper: {
    flex: 1,
    position: 'absolute',
    right: 10,
    transform: [{translateY: -38}],
    zIndex: 400,
  },
});

export default Step2Screen;
