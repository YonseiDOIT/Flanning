import {View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import fcolor from 'src/assets/colors/fcolors';
import {useSignup} from 'src/screens/auth/Signup/SignupProvider';

function BackHeader({navigation, isSignup = false}) {
  const {signupStep, setSignupStep} = useSignup();

  // console.log(navigation);

  const handleStepPrev = () => {
    if (isSignup && signupStep > 0) {
      setSignupStep(signupStep - 1); // signupStep 감소
    } else {
      navigation.goBack(); // 이전 화면으로 이동
    }
  };

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <TouchableOpacity
        style={{
          marginTop: Platform.OS === 'ios' ? 40 : 0,
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 20,
        }}
        onPress={handleStepPrev}>
        <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
      </TouchableOpacity>
    </View>
  );
}

export default BackHeader;
