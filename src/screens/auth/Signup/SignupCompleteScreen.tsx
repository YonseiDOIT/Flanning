// @ts-nocheck
import {View, Text, StyleSheet, Image, Share} from 'react-native';
import React, {useEffect} from 'react';
import {useSignup} from './SignupProvider';
import BackHeader from '../../../components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import globalStyles from 'src/assets/styles/globalStyles';
import fcolor from 'src/assets/colors/fcolors';
import MText from 'src/components/common/MText';
import BText from 'src/components/common/BText';
import {auth} from 'src/utils/firebase';
import NeonGr from 'src/components/neongr';
import {useAuth} from 'src/context';

// 회원가입 완료 시 보여줄 분류 페이지
const SignupCompleteScreen = ({navigation}) => {
  const {signupData} = useSignup();
  const {setIsSigningup} = useAuth();

  const handleShare = async () => {
    try {
      const result = await Share.share({
        title: '나의 Flanning 여행 스타일',
        message: `${signupData.step3.nickname}님의 여행 스타일은 "${signupData.step5.type}"입니다 🌟 ${signupData.step5.title}! 친구에게 공유하여 여행 스타일을 알아보세요!`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        return;
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  return (
    <ScrollView style={{flex: 1, position: 'relative', top: -40}}>
      <View style={{position: 'absolute', right: 30, top: 0, zIndex: 10}}>
        <TouchableOpacity onPress={handleShare}>
          <MaterialIcon name="share" size={30} color={fcolor.gray4} />
        </TouchableOpacity>
      </View>
      <View style={{gap: 6, paddingHorizontal: 30}}>
        <BText fontSize={28}>{signupData.step3.nickname}님의</BText>
        <BText fontSize={28}>
          <BText color={fcolor.blue} fontSize={28}>
            여행스타일
          </BText>
          은
        </BText>
      </View>

      <View
        style={{
          alignItems: 'center',
          marginVertical: 30,
          gap: 30,
          paddingHorizontal: 30,
        }}>
        <NeonGr style={{paddingHorizontal: 10}}>
          <BText fontSize={22}>{signupData.step5.type}</BText>
        </NeonGr>
        <Image
          source={signupData.step5.img}
          style={{width: 240, height: 240, borderRadius: 10}}
        />
        <BText fontSize={18}>{signupData.step5.title}</BText>
        {signupData.step5.description}
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          width: '100%',
        }}>
        <TouchableOpacity
          style={[
            globalStyles.buttonBase,
            globalStyles.centered,
            {backgroundColor: fcolor.blue},
          ]}
          onPress={() => {
            setIsSigningup(false);
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'Intro'}],
            // });
          }}>
          <MText color={fcolor.white}>플래닝과 여행 떠나기</MText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default SignupCompleteScreen;
