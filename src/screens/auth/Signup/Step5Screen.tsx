import {View, Text, StyleSheet} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import React from 'react';
import BackHeader from 'src/components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSignup} from './SignupProvider';

// 스타일 분석하고 있는 것을 보여주는 로딩 페이지
const Step5Screen = ({navigation}) => {
  const {signupStep, handleStepNext} = useSignup();

  return (
    <View style={styles.container}>
      {/* 회원가입 헤더 */}

      <View style={{marginTop: 0}}>
        <Text>Step5</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
        <TouchableOpacity
          onPress={() => {
            handleStepNext();
            navigation.navigate('StepComplete');
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
    backgroundColor: fcolor.white,
  },
});

export default Step5Screen;
