import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BottomBar from 'src/components/common/BottomBar';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth, useUser} from 'src/context';
import {getUsercode, getUserdata} from 'src/components/common/getUserdata';

// 설정 페이지
const SettingScreen = ({navigation}) => {
  //유저코드 가져오기
  const [userCode, setUserCode] = useState('');
  const {userData} = useUser();
  const {authData, signOut} = useAuth();

  useEffect(() => {
    const getUserCode = async () => {
      if (authData) {
        const userCode = await getUsercode(authData.email);
        setUserCode(userCode);
      }
    };
    getUserCode();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: fcolor.white}}>
      <View
        style={[
          styles.container,
          {paddingTop: Platform.OS === 'ios' ? 66 : 26},
        ]}>
        <BText>마이페이지</BText>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 34}}>
          <Image
            source={{uri: userData?.userImage}}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 4,
              }}>
              <BText fontSize={15} style={{marginRight: 8}}>
                {userData?.nickname}
              </BText>
              <MText fontSize={11} color={fcolor.gray3}>
                {userData?.travelType}
              </MText>
            </View>
            <MText fontSize={11} color={fcolor.gray3} style={{marginBottom: 4}}>
              {userCode}
            </MText>
            <MText fontSize={11} color={fcolor.gray4}>
              {userData?.introduction}
            </MText>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.container, {paddingVertical: 16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>
            설정
          </MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>이메일</MText>
          <MText fontSize={13} color={fcolor.gray3}>
            {userData?.email}
          </MText>
        </View>
        <TouchableOpacity
          style={styles.base}
          onPress={() => navigation.navigate('ProfileEdit')}>
          <MText fontSize={13}>프로필 수정 </MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.base}>
          <MText fontSize={13}>테스트 다시하기</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <View style={[styles.container, {paddingVertical: 16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>
            안내
          </MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>공지사항 </MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>이용약관</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>개인정보처리방침</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>튜토리얼</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.container, {paddingVertical: 16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>
            계정 관리
          </MText>
        </View>
        <TouchableOpacity onPress={() => signOut()} style={styles.base}>
          <MText fontSize={13}>로그아웃</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.base}>
          <MText fontSize={13}>회원 탈퇴</MText>
          <TouchableOpacity>
            <Mt_Icon name="arrow-forward-ios" size={16} color={fcolor.gray3} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomBar activeRoute="Setting" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: fcolor.white,
    padding: 25,
    paddingHorizontal: 34,
  },
  imagePreview: {
    width: 64,
    height: 64,
    borderRadius: 100,
    marginRight: 34,
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: fcolor.gray1,
  },
  base: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SettingScreen;
