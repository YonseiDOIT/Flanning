import React from 'react';
import { StyleSheet, TextInput, Touchable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import fcolors from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BackHeader from 'src/components/common/BackHeader';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import { useNavigation } from '@react-navigation/native';
import { SignupProvider } from '../Signup/SignupProvider';

// 이메일 비밀번호를 받는 로그인 화면
const SigninScreen = () => {
  const navigation = useNavigation();

  return (
    <SignupProvider>
    <View style={globalStyles.container}>
      <BackHeader navigation={navigation} isSignup={false}/>
      <View style={{marginVertical: 36}}>
        <BText fontSize={25} style={{marginBottom: 6}}>이메일 로그인</BText>
        <MText fontSize={13} color={fcolors.gray3}>플래닝과 함께 여행을 시작해요</MText>
      </View>
      <View style={{marginBottom:6}}>
        <View>
          <MText fontSize={13} style={styles.boxname}>이메일</MText>
          <TextInput style={styles.inputbox}
            onChangeText={(text)=>('')}
            placeholder={"example@flanning.com"}
          />
        </View>
        <View>
          <MText fontSize={13} style={styles.boxname}>비밀번호</MText>
          <TextInput style={styles.inputbox}
            onChangeText={(text)=>('')}
            secureTextEntry={true}
            placeholder={"8자 이상으로 입력"}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.loginbutton}>
        <MText fontSize={13} color={fcolors.white}>로그인</MText>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{alignItems:'center',
        justifyContent:'center'}}>
        <MText fontSize={13} color={fcolors.gray4}>이메일/비밀번호 찾기</MText>
      </TouchableOpacity>
    </View>
    </SignupProvider>
  )
};

const styles = StyleSheet.create({
  boxname:{
    marginLeft:20,
    marginBottom: 8,
    fontWeight: 'bold'
  },
  inputbox:{
    width: '100%',
    height: 45,
    backgroundColor:fcolors.gray1,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:20,
    marginBottom:16
  },
  loginbutton:{
    width: '100%',
    height: 45,
    backgroundColor:fcolors.gray4,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:27
  }
}
)

export default SigninScreen;
