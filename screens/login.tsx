import React, { Component, useState } from "react";
import { Alert, AppRegistry, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RText from "../src/components/common/RText";
import fcolor from '../src/assets/colors/fcolors';

//네이게이터(이동)
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BText from "../src/components/common/BText";
import MText from "../src/components/common/MText";
import { signIn, signUp } from "../src/lib/auth";
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';
import { createUser } from "../src/lib/users";

const firebaseAuth = auth();

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};

function Login () {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signInSubmit = async () => { // 로그인 함수
    const {email, password} = form;
    const info = {email, password};
    try {
      const {user} = await signIn(info);
      //console.log(user);
      navigation.navigate('main')
    } catch (e) {
      Alert.alert("로그인에 실패하였습니다.");
    }
  }

  //카카오로그인
const login = () => {
  KakaoLogin.login().then((result) => {
    console.log("로그인 성공", JSON.stringify(result));
    getProfile()
    navigation.navigate('main')
  }).catch((error) => {
    if (error.code === 'E_CANCELLED_OPERATION') {
      console.log("로그인 취소", error.message);
    } else {
      console.log(`로그인 실패(code:${error.code})`, error.message);
    }
  });
};

//카카오 로그인을 firebase로
const getProfile = () => {
  KakaoLogin.getProfile().then((result) => {
    console.log("GetProfile Success", JSON.stringify(result));
    const email = result.email;
    const password = "A!@" + result.id;
    onSubmit(email)
    firebaseAuth.createUserWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
    }, (fail) => {
      console.log(fail);
    });
  }).catch((error) => {
    console.log(`GetProfile Fail(code:${error.code})`, error.message);
  });
};

  const onSubmit = (email: string) => {
    console.log('파이어베이스 데이터 입력 성공!');
    createUser({ // 회원 프로필 생성
      email:email
    }).catch((error) => {
      console.log('파이어베이스: ',error);
    });

    
    
  };

  return (
    <View style={styles.container}>
      {/* 앱 문장 */}
      <View style={styles.infoT}>
        <BText>{"여행의 시작,\n"}<BText color={fcolor.blue}>플래닝</BText>과 함께해요!</BText>
       

      </View>
      {/* 아이디랑 비번 입력창... safearea 써야된다는 거 같기도..? */}
      <View style={styles.login}>
        <TextInput style={styles.loginbox}
        onChangeText={(text)=>setForm({...form,email:text})}
          placeholder={"아이디"}
        />
        <TextInput style={styles.loginbox}
        onChangeText={(text)=>setForm({...form,password:text})}
        secureTextEntry={true}
          placeholder={"비밀번호"}
        />
        <View style={styles.rowbutton}>
          <TouchableOpacity style={styles.smallbutton}
          onPress={()=>navigation.navigate('test')}>
            <MText fontSize={13} color={fcolor.gray4}>비밀번호 찾기</MText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.smallbutton} 
            onPress={() => navigation.navigate('signup')}>
            <MText fontSize={13} color={fcolor.gray4}>회원가입</MText>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:31, height:2, backgroundColor:fcolor.blue}}/>
        <View>
          <TouchableOpacity style={styles.kakaobutton}
          onPress={()=>login()}>
            {/* 이미지 버튼으로... */}
            <Image style={{width:"100%",height:45}} source={require('../src/assets/images/kakao_login_large_wide.png')} />
          </TouchableOpacity>
          
        </View>
          
      </View>
      <View style={{flex:1,marginBottom:70}}>
        <TouchableOpacity style={styles.loginbutton}
          onPress={()=>signInSubmit()}>
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
    backgroundColor: fcolor.white,
  },
  infoT:{
    marginTop:100
  },
  login:{
    marginTop:30
    
  },
  loginbox:{
    marginTop:16,
    height:45,
    borderWidth:1,
    borderColor:fcolor.gray1,
    borderRadius:10,
    paddingLeft:20,
    backgroundColor:fcolor.gray1
  },
  rowbutton:{
    flexDirection:'row',
    marginTop:16,
  },
  smallbutton:{
    marginRight:10,
    height:45,
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
    backgroundColor:'#fee500',
    height:45,
    borderRadius:10,
    
    justifyContent: 'center',
    alignItems:"center",
    marginBottom:15,
    padding:5
  },
  loginbutton:{
    backgroundColor:maincol,
    height:45,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
  }
})

  
export default Login;