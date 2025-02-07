import React, {useCallback, useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';

import FontASIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAS5Icon from 'react-native-vector-icons/FontAwesome5';
import RText from 'src/components/common/RText';
import {Text} from 'react-native-svg';
import {TextInput} from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth, useUser} from 'src/context';
import {addFriend} from 'src/components/common/getFriend';
import {getUsercode, getUserdata} from 'src/components/common/getUserdata';
import Clipboard from '@react-native-clipboard/clipboard';
import {firestore} from 'src/utils/firebase';
import {addNotification} from 'src/components/common/addNotification';

// 일정 상세 페이지
const FriendAddScreen = ({navigation}) => {
  //유저코드 가져오기
  // const {usercode} = useUser();

  const [userCode, setUserCode] = useState('');
  const {userData} = useUser();
  const {authData} = useAuth();

  const [friendCode, setFriendCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({title: '', message: ''});

  useEffect(() => {
    const getUserCode = async () => {
      if (authData) {
        const userCodeResult = await getUsercode(authData.email);
        setUserCode(userCodeResult);
      }
    };
    getUserCode();
  }, []);

  //코드복사
  const copyCode = text => {
    try {
      Clipboard.setString(text);
      setModalMessage({
        title: '복사 성공',
        message: '나의 코드가 복사되었습니다.',
      });
    } catch (error) {
      setModalMessage({title: '복사 실패', message: '복사에 실패했습니다.'});
    }
    setModalVisible(true);
  };

  //친구신청
  const requestFrd = async friendCode => {
    try {
      const usersCollection = await firestore()
        .collection('users')
        .doc(friendCode)
        .get();
      const db = usersCollection.data();
      const dateNow = new Date();
      const numYear = dateNow.getFullYear();
      let year = numYear.toString();
      year = year.slice(2);
      const date =
        year + '년 ' + dateNow.getMonth() + '월 ' + dateNow.getDay() + '일';
      addNotification(
        friendCode,
        '친구',
        '친구신청',
        userData.nickname + '님이 친구신청을 했어요',
        date,
        1,
      );
      setModalMessage({
        title: db.nickname,
        message: '친구 요청을 보냈어요!\n수락할 때까지 조금만 기다려주세요 😊',
      });
    } catch (error) {
      setModalMessage({
        title: '친구 추가를 완료하지 못했어요',
        message: '이 친구코드는 없는 친구코드에요.\n다시 확인해주세요!',
      });
    }
    setModalVisible(true);
  };

  return (
    <View style={[globalStyles.container, {paddingHorizontal: 25}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 40,
          paddingBottom: 24,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => ''}>
          <Icon name="share" size={25} color={fcolor.gray4} />
        </TouchableOpacity>
      </View>
      <RText fontSize={20} style={{fontWeight: 'bold'}}>
        친구 추가
      </RText>
      <View style={globalStyles.centered}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[globalStyles.centered, styles.userImageContainer]}
          onPress={() => ''}>
          <View style={[globalStyles.centered, styles.userImage]}>
            <Image
              source={{uri: userData.userImage}}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>
        <View
          style={[
            styles.box,
            {backgroundColor: '#EEF6FF', justifyContent: 'space-between'},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <BText fontSize={13} color={fcolor.gray4} style={{marginRight: 47}}>
              내 코드
            </BText>
            <MText fontSize={13} color={fcolor.gray4}>
              {userData.nickname} #{userCode}
            </MText>
          </View>
          <TouchableOpacity onPress={() => copyCode(userCode)}>
            <Icon name="content-copy" size={24} color={fcolor.gray4} />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <BText fontSize={13} color={fcolor.gray4} style={{marginRight: 36}}>
            친구 코드
          </BText>
          <TextInput
            style={{fontSize: 13}}
            onChangeText={text => setFriendCode(text)}
            placeholder={'친구 코드를 입력해주세요'}
            placeholderTextColor={fcolor.gray3}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.clickbutton,
            globalStyles.centered,
            friendCode ? {backgroundColor: fcolor.blue} : null,
          ]}
          onPress={friendCode ? () => requestFrd(friendCode) : null}>
          <MText fontSize={13} color={fcolor.white}>
            친구 신청하기
          </MText>
        </TouchableOpacity>
        {/* 프로필 수정 */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalBackground,
              {
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <View style={styles.modalContent}>
              <BText fontSize={17} style={{fontWeight: 'bold'}}>
                {modalMessage.title}
              </BText>
              <MText
                fontSize={13}
                style={{marginTop: 8, marginBottom: 16, textAlign: 'center'}}>
                {modalMessage.message}
              </MText>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}>
                <BText fontSize={17} color={fcolor.blue}>
                  확인
                </BText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  kakaoButton: {
    width: 136,
    height: 38,
    borderRadius: 8,
    backgroundColor: fcolor.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 28,
    top: 100,
  },
  modalContent: {
    width: 270,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 27,
    paddingBottom: 8,
  },
  modalButton: {
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0.3,
    borderColor: fcolor.gray2,
  },
  userImageContainer: {
    position: 'relative',
    marginVertical: 30,
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: fcolor.gray1,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  ImageEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: fcolor.lblue4,
  },
  box: {
    width: '100%',
    height: 45,
    backgroundColor: fcolor.gray1,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    flexDirection: 'row',
  },
  clickbutton: {
    width: 142,
    height: 40,
    backgroundColor: fcolor.gray3,
    borderRadius: 10,
  },
});

export default FriendAddScreen;
