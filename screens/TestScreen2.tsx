import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity, Vibration, View } from "react-native";
import { signIn, signUp } from "../src/lib/auth";
import fcolors from "../src/assets/colors/fcolors";
import MText from "../src/components/common/MText";
import database, { firebase } from '@react-native-firebase/database';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Firebase Realtime Database에 데이터 쓰기
export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};

const add_db = (db) => {
  // 선택된 버튼 이름을 경로에 설정하여 데이터베이스에 저장
  database()
  .ref(`/회원/${db ? db : 'none'}`)
  .set(db ? true : false)
  .then(() => console.log(`Data set for ${db}.`))
  .catch(error => console.error('Error writing to Firebase', error));
};


function SignInScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signUpSubmit = async () => { // 회원가입 함수
    const {email, password} = form;
    const info = {email, password};
    try {
      const {user} = await signUp(info);
      console.log(user);
    } catch (e) {
      Alert.alert("회원가입에 실패하였습니다.");
    }
  }

  const signInSubmit = async () => { // 로그인 함수
    const {email, password} = form;
    const info = {email, password};
    try {
      const {user} = await signIn(info);
      console.log(user);
      navigation.navigate('main')
    } catch (e) {
      Alert.alert("로그인에 실패하였습니다.");
    }
  }
    
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  
  
  
	
  return (
    
    <View style={styles.container}>
      <View style={{marginBottom:20}}>
      <View style={{marginBottom:20}}>
      <TextInput 
      onChangeText={(text)=>setForm({...form,email:text})}
      style={styles.loginbox}
          placeholder={"이메일"}
        />
        <TextInput style={styles.loginbox}
          onChangeText={(text)=>setForm({...form,password:text})}
          placeholder={"비밀번호"}
        />

      </View>
      
        <TouchableOpacity style={styles.loginbutton}
          onPress={()=>signUpSubmit()}>
            <MText fontSize={14} color={fcolors.white}>회원가입</MText>
          </TouchableOpacity>
      </View>
      <View style={{marginBottom:20}}>
      <View style={{marginBottom:20}}>
      <TextInput 
      onChangeText={(text)=>setForm({...form,email:text})}
      style={styles.loginbox}
          placeholder={"이메일"}
        />
        <TextInput style={styles.loginbox}
          onChangeText={(text)=>setForm({...form,password:text})}
          secureTextEntry={true}
          placeholder={"비밀번호"}
        />

      </View>
      
        <TouchableOpacity style={styles.loginbutton}
          onPress={()=>signInSubmit()}>
            <MText fontSize={14} color={fcolors.white}>로그인</MText>
          </TouchableOpacity>
      </View>
    </View>

  );
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:25,
    backgroundColor: fcolors.white,
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
    borderColor:fcolors.gray1,
    borderRadius:10,
    paddingLeft:20,
    backgroundColor:fcolors.gray1
  },
  loginbutton:{
    backgroundColor:fcolors.blue,
    height:45,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
    elevation:3
  }
})

export default SignInScreen;