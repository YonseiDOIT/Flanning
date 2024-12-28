import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSignup} from './SignupProvider';
import BackHeader from '../../../components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolors from '../../../assets/colors/fcolors';

// 회원가입 완료 시 보여줄 분류 페이지
const SignupCompleteScreen = ({navigation}) => {
  const {signupStep, handleStepNext} = useSignup();

  return (
    <View style={styles.container}>
      {/* 회원가입 헤더 */}

      <View style={{marginTop: 0}}>
        <Text>회원가입 완료</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
        <TouchableOpacity
          onPress={() => {
            handleStepNext();
            navigation.navigate('Home');
          }}>
          <Text>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 30,
    backgroundColor: fcolors.white,
  },
});

export default SignupCompleteScreen;
