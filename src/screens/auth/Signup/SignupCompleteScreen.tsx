import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useSignup} from './SignupProvider';
import BackHeader from '../../../components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {TouchableOpacity} from 'react-native-gesture-handler';

import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import BText from 'src/components/common/BText';
import {auth} from 'src/utils/firebase';

// 회원가입 완료 시 보여줄 분류 페이지
const SignupCompleteScreen = ({navigation}) => {
  const {signupStep, handleStepNext, signupData} = useSignup();

  const validationNext = () => {
    return true;
  };

  return (
    <View style={{flex: 1}}>
      {/* 회원가입 헤더 */}

      <View style={[globalStyles.centered, {marginVertical: 100}]}>
        <BText>이용자 별 여행 분류</BText>
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
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Intro'}],
            });
          }}>
          <MText color={fcolor.white}>플래닝 시작하기</MText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SignupCompleteScreen;
