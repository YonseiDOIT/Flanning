import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAS5Icon from 'react-native-vector-icons/FontAwesome5';
import RText from 'src/components/common/RText';
import { TextInput } from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import { useUser } from 'src/context';
import { getUserdata } from 'src/components/common/getUserdata';
import { validateIntroduction, validateNickname } from 'src/utils/validators';

const ProfileEditScreen = ({ navigation }) => {
  const { usercode } = useUser();
  const [form, setForm] = useState({ nickname: '', introduction: '' });
  const [user, setUser] = useState('');
  
  //프로필 수정하기 버튼
  const [modalVisible, setModalVisible] = useState(false);
  //공유 버튼
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', message: '' });

  useEffect(() => {
    const getSome = async () => {
      try {
        const userData = await getUserdata(usercode);
        setUser(userData);
      } catch (error) {
        console.error('친구 데이터를 가져오는 중 오류 발생:', error);
      }
    };
    getSome();
  }, []);

  const validationNext = () => {
    return validateNickname(form.nickname) && validateIntroduction(form.introduction);
  };

  const showModal = (state) => {
    if (state){
      setModalMessage({ title:'프로필 수정을 완료했어요', message:'프로필이 성공적으로 업데이트되었어요!' });
    }else{
      setModalMessage({ title:'프로필 수정을 완료하지 못했어요', message:'이 닉네임은 이미 누군가 사용 중이에요.\n다른 닉네임을 시도해 보세요!' });
    }
    
    setModalVisible(true);
  };

  return (
    <View style={globalStyles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40, paddingBottom: 24, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => setModalVisible1(true)}>
          <Icon name="share" size={25} color={fcolor.gray4} />
        </TouchableOpacity>
      </View>
      <RText fontSize={20} style={{ fontWeight: 'bold' }}>프로필 수정</RText>
      <View style={globalStyles.centered}>
        <TouchableOpacity activeOpacity={0.6} style={[globalStyles.centered, styles.userImageContainer]} onPress={() => ""}>
          <View style={[globalStyles.centered, styles.userImage]}>
            <Image source={require('src/assets/images/icon.png')} style={styles.imagePreview} resizeMode="cover" />
            <View style={[globalStyles.centered, styles.ImageEdit]}>
              <FontAS5Icon name="pen" size={14} color={fcolor.white} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.box}>
          <BText fontSize={13} color={fcolor.gray4} style={{ marginRight: 36 }}>닉네임</BText>
          <TextInput style={{ fontSize: 13 }} onChangeText={text => setForm({ ...form, nickname: text })} placeholder={user.nickname} placeholderTextColor={fcolor.gray3} maxLength={10} />
        </View>
        <View style={{ width: '100%', height: 15, marginVertical: 6, paddingLeft: 21 }}>
          {form.nickname && <MText fontSize={11} color={fcolor.orange}>특수 문자 제외, 최소 2 ~ 10자까지 작성 가능합니다</MText>}
        </View>
        <View style={styles.box}>
          <BText fontSize={13} color={fcolor.gray4} style={{ marginRight: 24 }}>한 줄 소개</BText>
          <TextInput style={{ fontSize: 13 }} onChangeText={text => setForm({ ...form, introduction: text })} placeholder={user.introduction} placeholderTextColor={fcolor.gray3} maxLength={30} />
        </View>
        <View style={{ width: '100%', height: 15, marginVertical: 6, paddingLeft: 21 }}>
          {form.introduction && <MText fontSize={11} color={fcolor.orange}>30자 이내 작성</MText>}
        </View>
        <TouchableOpacity
          style={[styles.clickbutton, globalStyles.centered, validationNext() ? { backgroundColor: fcolor.blue } : null]}
          disabled={!validationNext()}
          onPress={() => showModal(0)}>
          <MText fontSize={13} color={fcolor.white}>프로필 수정하기</MText>
        </TouchableOpacity>
      </View>
      {/* 공유버튼 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => setModalVisible1(false)}>
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.kakaoButton}
          onPress={() => setModalVisible1(false)}>
            <MText fontSize={14}>카카오톡 공유하기</MText>
          </TouchableOpacity>
          
        </View>
      </Modal>
      {/* 프로필 수정 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={[styles.modalBackground,{
          alignItems: 'center',
          justifyContent:'center'}]}>
          <View style={styles.modalContent}>
            <BText fontSize={17} style={{ fontWeight: 'bold' }}>{modalMessage.title}</BText>
            <MText fontSize={13} style={{ marginTop: 8,marginBottom:16,textAlign: 'center'}}>{modalMessage.message}</MText>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <BText fontSize={17} color={fcolor.blue}>확인</BText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  kakaoButton: {
    width:136,
    height:38,
    borderRadius:8,
    backgroundColor:fcolor.white,
    alignItems: 'center',
    justifyContent:'center',
    position: 'absolute',
    right: 28, 
    top: 100,
  },
  modalContent: {
    width: 270,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop:27,
    paddingBottom:8
  },
  modalButton: {
    width:'100%',
    height:44,
    alignItems: 'center',
    justifyContent:'center',
    borderTopWidth:0.3,
    borderColor:fcolor.gray2
  },
  userImageContainer: {
     marginVertical: 30 
  },
  userImage: { 
    width: 90,
    height: 90, 
    borderRadius: 100,
    backgroundColor: fcolor.gray1 
  },
  imagePreview: {
     width: '100%',
    height: '100%', 
    borderRadius: 100 
  },
  ImageEdit: {
    position: 'absolute', 
    right: 0, 
    bottom: 0, 
    width: 30, 
    height: 30, 
    borderRadius: 50, 
    backgroundColor: fcolor.lblue4 
  },
  box: {
    width: '100%', 
    height: 45, 
    backgroundColor: fcolor.gray1, 
    borderRadius: 10, 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    flexDirection: 'row' 
  },
  clickbutton: { 
    width: 142, 
    height: 40, 
    backgroundColor: fcolor.gray3, 
    borderRadius: 10, 
    marginTop: 18 },
});

export default ProfileEditScreen;
