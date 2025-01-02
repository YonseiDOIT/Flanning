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
import fcolors from '../../assets/colors/fcolors';
import RText from './RText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {auth, firestore} from 'src/utils/firebase';

const BottomBar = ({
  homecolor = fcolors.gray3,
  checkcolor = fcolors.gray3,
  reviewcolor = fcolors.gray3,
  settingcolor = fcolors.gray3,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [visible, setVisible] = useState(true);
  const [user, setUser] = useState({});

  const fetchUserDataByToken = async () => {
    try {
      // 현재 로그인한 사용자의 UID 가져오기
      const currentUser = auth().currentUser;
      const currentUserEmail = currentUser?.email;

      // Firestore에서 UID에 해당하는 데이터 가져오기
      const userDoc = await firestore()
        .collection('users')
        .doc(currentUserEmail || '')
        .get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser(userData || {});
      } else {
        console.log('해당 사용자의 데이터가 없습니다.');
        return null;
      }
    } catch (error) {
      console.error('Firestore 데이터 가져오기 실패:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserDataByToken();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setVisible(false);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setVisible(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.bottombar}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('main1')}>
        <Icon name="home-filled" size={25} color={homecolor} />
        <RText style={{marginTop: 5}} color={homecolor} fontSize={10}>
          홈
        </RText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('planlist')}>
        <Icon name="checklist" size={25} color={checkcolor} />
        <RText style={{marginTop: 5}} color={checkcolor} fontSize={10}>
          여행 목록
        </RText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate('reviewlist')}>
        <Icon name="edit" size={25} color={reviewcolor} />
        <RText style={{marginTop: 5}} color={reviewcolor} fontSize={10}>
          리뷰
        </RText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        {/* <Icon name="settings" size={25} color={settingcolor} /> */}
        <Image
          source={{uri: user.userImage}}
          style={{width: 25, height: 25, borderRadius: 200}}
        />
        <RText style={{marginTop: 5}} color={settingcolor} fontSize={10}>
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
    backgroundColor: fcolors.gray1,
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
    color: fcolors.gray4,
  },
});

export default BottomBar;
