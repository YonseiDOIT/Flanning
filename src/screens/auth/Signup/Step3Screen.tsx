import React from 'react';
import fcolor from 'src/assets/colors/fcolors';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackHeader from 'src/components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {useSignup} from './SignupProvider';

const Step3Screen = ({navigation}) => {
  const {signupStep, handleStepNext} = useSignup();

  return (
    <View style={styles.container}>
      {/* 회원가입 헤더 */}
      <BackHeader navigation={navigation} isSignup={true} />
      <AuthProgress currentStep={signupStep} />

      <View style={{marginTop: 0}}>
        <Text>Step3</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
        <TouchableOpacity
          onPress={() => {
            handleStepNext();
            navigation.navigate('Step4');
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

export default Step3Screen;
