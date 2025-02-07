import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';
import globalStyles from 'src/assets/styles/globalStyles';
import BackHeader from 'src/components/common/BackHeader';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {auth} from 'src/utils/firebase';
import Config from 'react-native-config';
// import auth from '@react-native-firebase/auth';
import {validateEmail, validatePassword} from 'src/utils/validators';
import {useUser} from 'src/context/UserContext';

// 이메일 비밀번호를 받는 로그인 화면
const SigninScreen = ({navigation}) => {
  //이메일 비밀번호 입력
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  //오류 문구 보여주기
  const [fail, setfail] = useState(false);

  //로그인
  const SignIn = async () => {
    try {
      await auth().signInWithEmailAndPassword(form.email, form.password);
      setfail(false);
      const code = await getUsercode(form.email);
      navigation.navigate('Home');
    } catch (error) {
      setfail(true);
    }
  };

  // 버튼 색 활성화(로그인 가능)
  const validationNext = () => {
    return validateEmail(form.email) && validatePassword(form.password);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[globalStyles.container, {}]}>
        <BackHeader navigation={navigation} />
        <View style={{paddingHorizontal: 30}}>
          <View style={{marginVertical: 36}}>
            <BText fontSize={25} style={{marginBottom: 6}}>
              이메일 로그인
            </BText>
            <MText fontSize={13} color={fcolor.gray3}>
              플래닝과 함께 여행을 시작해요
            </MText>
          </View>
          <View style={{marginBottom: 16}}>
            <View>
              <MText fontSize={13} style={styles.boxname}>
                이메일
              </MText>
              <TextInput
                style={styles.inputbox}
                onChangeText={text =>
                  setForm({...form, email: text.toLowerCase()})
                }
                placeholder={'example@flanning.com'}
                placeholderTextColor={fcolor.gray4}
              />
            </View>
            <View>
              <MText fontSize={13} style={styles.boxname}>
                비밀번호
              </MText>
              <TextInput
                style={styles.inputbox}
                onChangeText={text => setForm({...form, password: text})}
                secureTextEntry={true}
                placeholder={'영문 대·소문자/숫자 조합, 8자 이상'}
                placeholderTextColor={fcolor.gray4}
              />
            </View>
            {fail && (
              <View style={styles.fail}>
                <MText fontSize={13} color={fcolor.orange}>
                  아이디 또는 비밀번호가 올바르지 않습니다.
                </MText>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[
              globalStyles.buttonBase,
              validationNext()
                ? {backgroundColor: fcolor.blue}
                : {backgroundColor: fcolor.gray4},
            ]}
            disabled={!validationNext()}
            onPress={() => SignIn()}>
            <MText fontSize={13} color={fcolor.white}>
              로그인
            </MText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
            }}>
            <MText fontSize={13} color={fcolor.gray4}>
              이메일/비밀번호 찾기
            </MText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  boxname: {
    marginLeft: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  inputbox: {
    width: '100%',
    height: 45,
    backgroundColor: fcolor.gray1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 13,
  },
  fail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SigninScreen;
