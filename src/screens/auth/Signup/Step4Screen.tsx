// @ts-nocheck
import {View, StyleSheet, Animated, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import {useSignup} from './SignupProvider';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import NeonGr from 'src/components/neongr';
import RText from 'src/components/common/RText';

const Step4Screen = () => {
  const {handleStepNext, signupData, setSignupData} = useSignup();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.ScrollView
      style={{flex: 1, opacity: fadeAnim, paddingHorizontal: 30}}
      showsVerticalScrollIndicator={false}>
      <View style={{marginTop: 0, gap: 9}}>
        <BText>
          <BText color={fcolor.blue}>여행 스타일</BText>을 알려주세요
        </BText>
        <MText color={fcolor.gray3}>
          동행인이 여러분의 여행 성향에 대해 알 수 있도록 해주세요
        </MText>
      </View>

      <View style={styles.tripStyleContainer}>
        <Image
          source={require('src/assets/images/auth/TravelIntro.png')}
          style={{
            // resizeMode: 'contain',
            width: 'auto',
            height: 340,
            borderRadius: 10,
          }}
        />
      </View>

      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={[
            globalStyles.buttonBase,
            globalStyles.centered,
            {
              backgroundColor: fcolor.blue,
            },
          ]}
          onPress={handleStepNext}>
          <MText color={fcolor.white}>시작하기</MText>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  tripStyleContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
    gap: 30,
  },
  styleGroup: {},
  styleText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 8,
  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: fcolor.white,
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor: fcolor.gray3,
  },
});

export default Step4Screen;
