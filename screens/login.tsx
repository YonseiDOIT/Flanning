import React, { Component } from "react";
import { AppRegistry, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../src/components/common/AppText";
import { Colors } from "react-native/Libraries/NewAppScreen";

//네이게이터(이동)
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BoldText from "../src/components/common/BoldText";

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
        <BoldText>{"여행의 시작,\n플래닝과 함께해요!"}</BoldText>
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
            <AppText>비밀번호 찾기</AppText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.smallbutton} 
            onPress={() => navigation.navigate('signup')}>
            <AppText>회원가입</AppText>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:25, height:1, backgroundColor:"#C1C1C1"}}/>
        <View>
          <TouchableOpacity style={styles.kakaobutton}>
            {/* 이미지 버튼으로... */}
            <Image style={{width:340,height:51}} source={require('../src/assets/kakao_login_medium_wide.png')} />
          </TouchableOpacity>
          
        </View>
          
      </View>
      <View style={{flex:1,justifyContent: 'flex-end',marginBottom:50}}>
      <TouchableOpacity style={styles.loginbutton}>
            <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>로그인</Text>
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
    margin:25,
    backgroundColor: "#FFFFF",
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
    borderColor:"#C1C1C1",
    borderRadius:10,
    padding:20
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
    borderColor:"#C1C1C1",
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",

  },
  kakaobutton:{
    marginTop:25,
    // backgroundColor:'#fee500',
    height:51,
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
  }
})

  
export default Login;