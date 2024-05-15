import React, { Component } from "react";
import { AppRegistry, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RText from "../src/components/common/RText";
import fcolor from '../src/assets/colors/fcolors';

//네이게이터(이동)
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BText from "../src/components/common/BText";
import MText from "../src/components/common/MText";

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};

function Login () {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={styles.container}>
      {/* 앱 문장 */}
      <View style={styles.infoT}>
        <BText>{"여행의 시작,\n"}<BText color={fcolor.blue}>플래닝</BText>과 함께해요!</BText>
       

      </View>
      {/* 아이디랑 비번 입력창... safearea 써야된다는 거 같기도..? */}
      <View style={styles.login}>
        <TextInput style={styles.loginbox}
          placeholder={"아이디"}
        />
        <TextInput style={styles.loginbox}
          placeholder={"비밀번호"}
        />
        <View style={styles.rowbutton}>
          <TouchableOpacity style={styles.smallbutton}>
            <MText fontSize={13} color={fcolor.gray4}>비밀번호 찾기</MText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.smallbutton} 
            onPress={() => navigation.navigate('signup')}>
            <MText fontSize={13} color={fcolor.gray4}>회원가입</MText>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:25, height:2, backgroundColor:fcolor.blue}}/>
        <View>
          <TouchableOpacity style={styles.kakaobutton}>
            {/* 이미지 버튼으로... */}
            <Image style={{width:"100%",height:50}} source={require('../src/assets/images/kakao_login_medium_wide.png')} />
          </TouchableOpacity>
          
        </View>
          
      </View>
      <View style={{flex:1,justifyContent: 'flex-end',marginBottom:70}}>
        <TouchableOpacity style={styles.loginbutton}>
            <MText fontSize={14} color={fcolor.white}>로그인</MText>
          </TouchableOpacity>
      </View>
      
    </View>
  );
}

// 메인 컬러인 파란색 변수
const maincol="#005bea"

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:25,
    paddingLeft:30,
    paddingRight:30,
    backgroundColor: fcolor.white,
  },
  infoT:{
    marginTop:100
  },
  login:{
    marginTop:30
    
  },
  loginbox:{
    marginTop:25,
    height:62,
    borderWidth:1,
    borderColor:fcolor.gray1,
    borderRadius:10,
    padding:20,
    backgroundColor:fcolor.gray1
  },
  rowbutton:{
    flexDirection:'row',
    marginTop:25,
  },
  smallbutton:{
    marginRight:10,
    height:42,
    width:165,
    borderWidth:1,
    borderColor:fcolor.gray1,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
    backgroundColor:fcolor.gray1

  },
  kakaobutton:{
    marginTop:25,
    // backgroundColor:'#fee500',
    height:50,
    // borderRadius:7,
    justifyContent: 'center',
    alignItems:"center",
  },
  loginbutton:{
    backgroundColor:maincol,
    height:61,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
    elevation:3
  }
})

  
export default Login;