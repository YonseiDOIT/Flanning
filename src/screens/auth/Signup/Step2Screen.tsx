// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useSignup} from './SignupProvider';
import {validateEmail, validatePassword} from 'src/utils/validators';
import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import {auth, firestore} from 'src/utils/firebase';
import {fetchSignInMethodsForEmail} from 'firebase/auth';

const Step2Screen = () => {
  const {signupStep, handleStepNext, signupData, setSignupData} = useSignup();
  const [showPW, setShowPW] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [isCheckEmail, setIsCheckEmail] = useState(false);
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
        [field]: field === 'email' ? value.toLowerCase() : value,
        ...(field === 'email' && {emailVerify: false}),
      },
    }));

    if (field === 'email') {
      setEmailError('');
    }
  };

  const validationEmail = async () => {
    setIsCheckEmail(true);
    setEmailError('');

    try {
      const users = await firestore()
        .collection('users')
        .where('email', '==', signupData.step2.email)
        .get();

      if (!users.empty) {
        // 이미 가입된 이메일
        setEmailError('이미 가입된 이메일입니다');
        setSignupData(prevData => ({
          ...prevData,
          step2: {
            ...prevData.step2,
            emailVerify: false,
          },
        }));
      } else {
        // 사용 가능한 이메일
        setEmailError('사용 가능한 이메일입니다');
        setSignupData(prevData => ({
          ...prevData,
          step2: {
            ...prevData.step2,
            emailVerify: true,
          },
        }));
      }
    } catch (error) {
      console.error(error);
      setEmailError('이메일 확인 중 오류가 발생했습니다');
      setSignupData(prevData => ({
        ...prevData,
        step2: {
          ...prevData.step2,
          emailVerify: false,
        },
      }));
    } finally {
      setIsCheckEmail(false);
    }
  };

  // 다음으로 넘어가기 위한 조건 처리
  const validationNext = () => {
    const {email, password, passwordRe, emailVerify} = signupData.step2;
    return (
      email &&
      emailVerify &&
      password &&
      passwordRe &&
      validateEmail(email) &&
      validatePassword(password) &&
      password === passwordRe
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, paddingHorizontal: 30}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={{flex: 1, opacity: fadeAnim}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
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
                  placeholderTextColor={fcolor.gray4}
                  autoFocus
                  onBlur={() => {
                    if (validateEmail(signupData.step2.email)) {
                      validationEmail();
                    } else {
                      setEmailError('이메일 형식이 올바르지 않습니다');
                    }
                  }}
                />
                {isCheckEmail ? null : emailError ? (
                  <RText
                    style={{marginHorizontal: 20}}
                    color={
                      emailError === '사용 가능한 이메일입니다'
                        ? fcolor.lblue4
                        : fcolor.orange
                    }>
                    {emailError}
                  </RText>
                ) : null}
              </View>
              <View style={styles.inputGroup}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <MText style={{marginHorizontal: 20, fontWeight: 700}}>
                    비밀번호<MText color={fcolor.orange}>*</MText>
                  </MText>
                  <TouchableOpacity
                    style={[styles.iconWrapper]}
                    onPress={() => setShowPW(!showPW)}>
                    <MaterialIcon
                      name={showPW ? 'visibility-off' : 'visibility'}
                      size={20}
                      color={fcolor.gray3}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={[styles.loginbox]}
                    value={signupData.step2.password}
                    onChangeText={password =>
                      handleChange('password', password)
                    }
                    secureTextEntry={showPW}
                    placeholder={'8자 이상으로 입력'}
                    placeholderTextColor={fcolor.gray4}
                  />
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <MText style={{marginHorizontal: 20, fontWeight: 700}}>
                    비밀번호 확인<MText color={fcolor.orange}>*</MText>
                  </MText>
                  <TouchableOpacity
                    style={[styles.iconWrapper]}
                    onPress={() => setShowPW(!showPW)}>
                    <MaterialIcon
                      name={showPW ? 'visibility-off' : 'visibility'}
                      size={20}
                      color={fcolor.gray3}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View>
                    <TextInput
                      style={[styles.loginbox]}
                      value={signupData.step2.passwordRe}
                      onChangeText={passwordRe =>
                        handleChange('passwordRe', passwordRe)
                      }
                      secureTextEntry={showPW}
                      placeholder={'8자 이상으로 입력'}
                      placeholderTextColor={fcolor.gray4}
                    />
                  </View>
                </View>
                {signupData.step2.passwordRe === ''
                  ? null
                  : signupData.step2.password !==
                      signupData.step2.passwordRe && (
                      <RText
                        color={fcolor.orange}
                        style={{marginHorizontal: 20}}>
                        비밀번호가 일치하지 않습니다
                      </RText>
                    )}
              </View>
            </View>

            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
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
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  inputWrapper: {
    position: 'relative',
    zIndex: 2,
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
    zIndex: 20,
  },
});

export default Step2Screen;
