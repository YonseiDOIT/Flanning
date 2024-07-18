import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import fcolors from '../../assets/colors/fcolors';
import RText from './RText';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const BottomBar = ({ homecolor = fcolors.blue, checkcolor = fcolors.gray3, reviewcolor = fcolors.gray3, settingcolor = fcolors.gray3 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(false);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(true);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <View style={styles.bottombar}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('main')}>
        <Icon name='home-filled' size={25} color={homecolor} />
        <RText style={{ marginTop: 5 }} color={homecolor} fontSize={10}>홈</RText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('planlist')}>
        <Icon name='checklist' size={25} color={checkcolor} />
        <RText style={{ marginTop: 5 }} color={checkcolor} fontSize={10}>여행 목록</RText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name='edit' size={25} color={reviewcolor} />
        <RText style={{ marginTop: 5 }} color={reviewcolor} fontSize={10}>리뷰</RText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Icon name='settings' size={25} color={settingcolor} />
        <RText style={{ marginTop: 5 }} color={settingcolor} fontSize={10}>설정</RText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottombar: {
    width: "100%",
    height: 70,
    backgroundColor: fcolors.gray1,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'absolute',
    bottom: 0
  },
  icon: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icontext: {
    fontSize: 10,
    fontFamily: "Pretendard-Regular",
    padding: 5,
    color: fcolors.gray4
  },
});

export default BottomBar;
