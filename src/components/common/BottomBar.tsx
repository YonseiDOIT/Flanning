// @ts-nocheck
// @eslint-disable
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Animated,
  Easing,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fcolor from 'src/assets/colors/fcolors';
import RText from './RText';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useAuth, useUser} from 'src/context';

const BottomBar = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  const {userData} = useUser();
  const routeName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  const getIconColor = screen =>
    routeName === screen ? fcolor.blue : fcolor.gray4;

  return (
    <View style={styles.bottombar}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('Home')}>
        <Icon name="home-filled" size={25} color={getIconColor('Home')} />
        <RText
          style={{marginTop: 5}}
          color={getIconColor('Home')}
          fontSize={10}>
          홈
        </RText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('PlanList', {direction: false})}>
        <Icon name="checklist" size={25} color={getIconColor('PlanList')} />
        <RText
          style={{marginTop: 5}}
          color={getIconColor('PlanList')}
          fontSize={10}>
          여행 목록
        </RText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('Review')}>
        <Icon name="edit" size={25} color={getIconColor('Review')} />
        <RText
          style={{marginTop: 5}}
          color={getIconColor('Review')}
          fontSize={10}>
          리뷰
        </RText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          navigation.navigate('Setting');
        }}>
        {userData?.userImage ? (
          <Image
            source={{uri: userData?.userImage}}
            style={{width: 25, height: 25, borderRadius: 200}}
          />
        ) : (
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 200,
              backgroundColor: fcolor.gray2,
            }}
          />
        )}
        <RText
          style={{marginTop: 5}}
          color={getIconColor('Setting')}
          fontSize={10}>
          내 계정
        </RText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottombar: {
    width: '100%',
    height: Platform.OS === 'ios' ? 100 : 80,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
    backgroundColor: fcolor.gray1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icontext: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    padding: 5,
    color: fcolor.gray4,
  },
});

export default BottomBar;
