// @ts-nocheck
import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
// import database from '@react-native-firebase/database';
import {
  GestureHandlerRootView,
  // ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AppText from '../src/components/common/RText';
// import BoldText from '../src/components/common/BText';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import fcolor from '../../assets/colors/fcolors';
import BText from 'src/components/common/BText';
import RText from 'src/components/common/RText';
// import LinearGradient from 'react-native-linear-gradient';
import MText from 'src/components/common/MText';
// import NeonGr from '../src/components/neongr';
import BottomBar from 'src/components/common/BottomBar';
import {auth} from 'src/utils/firebase';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imagebanner}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 50,
            }}>
            <Image
              source={require('src/assets/images/logo.png')}
              style={{width: 89, height: 34}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Icons name="bell" size={22} color={fcolor.white} /> */}
              <TouchableOpacity onPress={() => navigation.navigate('friend')}>
                {/* <Icon
                  name="group"
                  size={25}
                  color={fcolor.white}
                  style={{marginHorizontal: 16}}
                /> */}
              </TouchableOpacity>
              {/* <TouchableOpacity>
                <Icon name="settings" size={25} color={fcolor.white} />
              </TouchableOpacity> */}
            </View>
          </View>

          <BText color="white" fontSize={23} style={{marginBottom: 5}}>
            여행 제목
          </BText>
        </View>

        <View style={styles.white}>
          <View>
            {/* 여행 중요 메모 */}
            <View style={styles.trvmemo}>
              <BText
                fontSize={14}
                color={fcolor.blue}
                style={{marginBottom: 5}}>
                여행 중요 메모
              </BText>
              <RText>중요 메모를 잊지 않도록 기록해요</RText>
            </View>
          </View>

          <View style={{marginTop: 15}}>
            {/* 여행 일정 */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <BText fontSize={15}>여행 일정</BText>
              <TouchableOpacity onPress={() => navigation.navigate('main1')}>
                <RText color={fcolor.gray4}>상세보기{'>'}</RText>
              </TouchableOpacity>
            </View>
            <View style={styles.travelplane}>
              <TouchableOpacity onPress={() => navigation.navigate('addplan')}>
                <Image
                  source={require('src/assets/images/pen.png')}
                  style={{width: 102, height: 102, margin: 5}}
                />
              </TouchableOpacity>
              <MText fontSize={13} color={fcolor.gray4}>
                아직 일정이 없어요.
              </MText>
              <MText fontSize={13} color={fcolor.gray4}>
                플래닝과 함께 일정을 세워볼까요?
              </MText>
            </View>
          </View>
        </View>
      </View>

      <BottomBar activeRoute="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: fcolor.gray4,
    justifyContent: 'flex-end',
  },
  imagebanner: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    backgroundColor: fcolor.blue,
  },
  white: {
    width: '100%',
    height: 544,
    padding: 25,
    paddingHorizontal: 16,
    backgroundColor: fcolor.white,
    elevation: 30,
    marginBottom: 60,
  },
  //여행 중요 메모
  trvmemo: {
    height: 88,
    flexDirection: 'column',
    backgroundColor: '#EEF6FF',
    padding: 24,
    borderRadius: 10,
  },
  //일정내용
  travelplane: {
    height: 357,
    marginTop: 10,
    backgroundColor: fcolor.lblue1,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trv_calendar: {
    height: 50,
    borderRadius: 5,
    backgroundColor: fcolor.lblue2,
    flexDirection: 'row',
  },
  planecontent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  //여행 예산
  trvmoney: {
    height: 75,
    marginTop: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  moneybar: {
    height: 20,
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
});

export default HomeScreen;
