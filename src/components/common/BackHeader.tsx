import {Platform, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import fcolor from 'src/assets/colors/fcolors';
import {useSignup} from 'src/screens/auth/Signup/SignupProvider';

function BackHeader({navigation, isSignup = false}) {
  let signupContext;
  try {
    signupContext = useSignup();
  } catch (error) {
    // SignupProvider가 없으면 기본 동작 설정
    signupContext = null;
  }

  const handleStepPrev = () => {
    if (isSignup && signupContext && signupContext.signupStep > 0) {
      signupContext.setSignupStep(signupContext.signupStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
      }}>
      <TouchableOpacity
        style={{
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
