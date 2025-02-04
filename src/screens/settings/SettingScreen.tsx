import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import BottomBar from 'src/components/common/BottomBar';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import Mt_Icon from 'react-native-vector-icons/MaterialIcons';
import { useUser } from 'src/context';
import { getUserdata } from 'src/components/common/getUserdata';

// 설정 페이지
const SettingScreen = ({ navigation }) => {
  //유저코드 가져오기
    const { usercode } = useUser();
  
    const [friendCode,setFriendCode]=useState('')
    const [user, setUser] = useState('');
  
    useEffect(() => {
      const getSome = async () => {
        try {
          const userData = await getUserdata(usercode);
          setUser(userData)
          
        } catch (error) {
          console.error("친구 데이터를 가져오는 중 오류 발생:", error);
        }
      };
    
      getSome();
    }, []);


  return (
    <View style={{ flex: 1, backgroundColor: fcolor.white }}>
      <View style={[styles.container, {paddingTop: 46 }]}>
        <BText>마이페이지</BText>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 34}}>
          <Image
            source={require('src/assets/images/icon.png')}
            style={styles.imagePreview}
            resizeMode="cover"
          />
          <View >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <BText fontSize={15} style={{ marginRight: 8 }}>{user.nickname}</BText>
              <MText fontSize={11} color={fcolor.gray3}>{user.travelType}</MText>
            </View>
            <MText fontSize={11} color={fcolor.gray3} style={{ marginBottom: 4 }}>{usercode}</MText>
            <MText fontSize={11} color={fcolor.gray4}>{user.introduction}</MText>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.container,{paddingVertical:16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>설정</MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>이메일</MText>
          <MText fontSize={13} color={fcolor.gray3}>{user.email}</MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>프로필 수정 </MText>
          <TouchableOpacity
            onPress={()=>navigation.navigate('profileEdit')}>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>테스트 다시하기</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.container,{paddingVertical:16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>안내</MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>공지사항 </MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>이용약관</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>개인정보처리방침</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>튜토리얼</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <View style={[styles.container,{paddingVertical:16}]}>
        <View style={styles.base}>
          <MText fontSize={13} color={fcolor.gray3}>계정 관리</MText>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>로그아웃</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        <View style={styles.base}>
          <MText fontSize={13}>회원 탈퇴</MText>
          <TouchableOpacity>
          <Mt_Icon name='arrow-forward-ios' size={16} color={fcolor.gray3}/>
          </TouchableOpacity>
        </View>
        
      </View>


      <BottomBar settingcolor={fcolor.blue} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: fcolor.white,
    padding: 25,
    paddingHorizontal:34
  },
  imagePreview: {
    width: 64,
    height: 64,
    borderRadius: 100,
    marginRight: 34
  },
  line: {
    width: '100%',
    height: 4,
    backgroundColor: fcolor.gray1
  },
  base: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});

export default SettingScreen;
