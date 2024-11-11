import * as React from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createUser } from '../src/lib/users';
import DatePicker from 'react-native-date-picker';



const firebaseAuth = auth();

function LoginScreen(){

  const onSubmit = () => {
    createUser({ // 회원 프로필 생성
      email:'와 입력된다.'
    }).catch((error) => {
      console.log('파이어베이스: ',error);
    });

    console.log('파이어베이스 데이터 입력 성공!');
    
  };

  const login = () => {
    KakaoLogin.login().then((result) => {
      console.log("로그인 성공", JSON.stringify(result));
      getProfile()
      
    }).catch((error) => {
      if (error.code === 'E_CANCELLED_OPERATION') {
        console.log("로그인 취소", error.message);
      } else {
        console.log(`로그인 실패(code:${error.code})`, error.message);
      }
    });
  };
  
  const getProfile = () => {
    KakaoLogin.getProfile().then((result) => {
      console.log("GetProfile Success", JSON.stringify(result));
      const email = result.email;
      const password = "A!@" + result.id;
      onSubmit()
      firebaseAuth.createUserWithEmailAndPassword(email, password).then((success) => {
        console.log(success);

      }, (fail) => {
        console.log(fail);
      });
    }).catch((error) => {
      console.log(`GetProfile Fail(code:${error.code})`, error.message);
    });
  };
  
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  return(
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  );
}


export default LoginScreen

function onAuthStateChanged(firebaseAuth: FirebaseAuthTypes.Module, arg1: (user: any) => void) {
  throw new Error('Function not implemented.');
}
