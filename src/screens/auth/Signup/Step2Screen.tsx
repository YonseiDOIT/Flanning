// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import BText from '../../../components/common/BText';
import MText from '../../../components/common/MText';
import NeonGr from '../../../components/neongr';
import RText from '../../../components/common/RText';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

// import AuthProgress from 'src/auth/components/AuthProgress';
import BackHeader from 'src/components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {useSignup} from './SignupProvider';

const Step2Screen = ({navigation}) => {
  const {signupStep, handleStepNext, signupData} = useSignup();

  useEffect(() => {
    console.log(signupData);
  }, []);

  return (
    <View style={styles.container}>
      {/* 회원가입 헤더 */}
      <BackHeader navigation={navigation} isSignup={true} />
      <AuthProgress currentStep={signupStep} />

      <View style={{marginTop: 0}}>
        <Text>Step2</Text>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
        <TouchableOpacity
          onPress={() => {
            handleStepNext();
            navigation.navigate('Step3');
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

export default Step2Screen;
