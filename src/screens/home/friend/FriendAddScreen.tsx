import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';

import FontASIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAS5Icon from 'react-native-vector-icons/FontAwesome5';
import RText from 'src/components/common/RText';
import { Text } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import { useFocusEffect } from '@react-navigation/native';
import { useUser } from 'src/context';
import { addFriend} from 'src/components/common/getFriend';
import { getUserdata } from 'src/components/common/getUserdata';
import Clipboard from '@react-native-clipboard/clipboard';


// 일정 상세 페이지
const FriendAddScreen = ({navigation}) => {

  //유저코드 가져오기
  const { usercode } = useUser();

  const [friendCode,setFriendCode]=useState('')
  const [user, setUser] = useState('');

  useEffect(() => {
    const getSome = async () => {
      try {
        const userData = await getUserdata(usercode);
        setUser(userData); // userData를 설정
      } catch (error) {
        console.error("친구 데이터를 가져오는 중 오류 발생:", error);
      }
    };
  
    getSome();
  }, []);

  //코드복사
  const copyCode= (text)=>{
    try{
      Clipboard.setString(text);
      Alert.alert('내코드가 복사되었습니다.');

    }catch(error){
      Alert.alert('복사에 실패했습니다.');
    }
  }

  return (
    <View style={globalStyles.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40,paddingBottom:24, alignItems:'center' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ""}>
                <Icon name="share" size={25} color={fcolor.gray4} />
              </TouchableOpacity>
          </View>
          <RText fontSize={20} style={{fontWeight: 'bold'}}>친구 추가</RText>
          <View style={globalStyles.centered}>
            <TouchableOpacity
                  activeOpacity={0.6}
                  style={[globalStyles.centered, styles.userImageContainer]}
                  onPress={()=>""}>
              <View style={[globalStyles.centered, styles.userImage]}>
                <Image
                    source= {require('../../../assets/images/icon.png')}
                    style={styles.imagePreview}
                    resizeMode="cover"
                />

                <View style={[globalStyles.centered, styles.ImageEdit]}>
                  <FontAS5Icon name="pen" size={14} color={fcolor.white} />
                </View>
              </View>
            </TouchableOpacity>
            <View style={[styles.box,{backgroundColor:'#EEF6FF',justifyContent:'space-between'}]}>
              <View style={{flexDirection:'row'}}>
                <BText fontSize={13} color={fcolor.gray4} style={{marginRight:47}}>내 코드</BText>
                <MText fontSize={13} color={fcolor.gray4}>{user.nickname} #{usercode}</MText>
              </View>
              <TouchableOpacity onPress={()=>copyCode(usercode)}>
                <Icon name="content-copy" size={24} color={fcolor.gray4}/>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <BText fontSize={13} color={fcolor.gray4} style={{marginRight:36}}>친구 코드</BText>
              <TextInput
                style={{fontSize:13}}
                onChangeText={text => setFriendCode(text)}
                placeholder={'친구 코드를 입력해주세요'}
                placeholderTextColor={fcolor.gray3}/>
            </View>
            <TouchableOpacity 
              style={[styles.clickbutton,globalStyles.centered,
                friendCode ? {backgroundColor:fcolor.blue} : null]}
              onPress={friendCode ? () =>  addFriend(friendCode,usercode): null}>
              <MText fontSize={13} color={fcolor.white}>친구 신청하기</MText>
            </TouchableOpacity>
             

            
          </View>

    </View>
  )
};

const styles = StyleSheet.create({
  userImageContainer: {
    position: 'relative',
    marginVertical:30
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
    alignItems:'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    flexDirection:'row'
  },
  clickbutton:{
    width:142,
    height:40,
    backgroundColor:fcolor.gray3,
    borderRadius:10,
  }
});

export default FriendAddScreen;
