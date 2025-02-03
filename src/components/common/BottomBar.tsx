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
import {useAuth} from 'src/context';

const BottomBar = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();
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
        onPress={() => navigation.navigate('Plan')}>
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
          signOut();
        }}>
        <Icon name="person" size={25} color={fcolor.gray4} />
        <RText style={{marginTop: 5}} color={fcolor.gray4} fontSize={10}>
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
