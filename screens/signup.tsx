import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../src/components/common/AppText";
import BoldText from "../src/components/common/BoldText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import fcolor from "../src/assets/colors/fcolors";
import Icon from 'react-native-vector-icons/MaterialIcons';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};

function Signup() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [checkboxStates, setCheckboxStates] = useState({
    allAgree: false,
    overFourteen: false,
    termsAgree: false,
    privacyPolicy: false,
    personalInfo: false,
    marketing: false,
  });


  const handlePress = (checkbox) => {
    if (checkbox === 'allAgree') {
      const newState = !checkboxStates.allAgree; //모두 동의의 상태 변수
      //업데이트 부분
      setCheckboxStates({
        allAgree: newState,
        overFourteen: newState,
        termsAgree: newState,
        privacyPolicy: newState,
        personalInfo: newState,
        marketing: newState,
      });
    } else {
      //prevState는 현재 체크박스상태
      setCheckboxStates((prevState) => ({
        ...prevState,
        [checkbox]: !prevState[checkbox],
        allAgree: false, // Deselect "allAgree" if any other checkbox is toggled
      }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height: 4, backgroundColor: fcolor.skyblue, marginTop: 26, borderRadius: 40}}>
        <View style={{backgroundColor: fcolor.blue, width: "25%", height: 4, borderRadius: 40}}/>
      </View>
      <View style={{marginTop: 70}}>
        <BoldText><BoldText color={fcolor.blue}>약관</BoldText>에 <BoldText color={fcolor.blue}>동의</BoldText>해주세요</BoldText>
        <Text style={{color:fcolor.gray3,fontFamily:"Pretendard-Medium",fontSize:13}}>플래닝이 여러분의 소중한 개인정보를 지킬게요</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.check_l}>
          <TouchableOpacity
            style={[styles.checkbox, checkboxStates.allAgree ? styles.check : null]}
            onPress={() => handlePress('allAgree')}>
            {checkboxStates.allAgree && <Icon name="check" size={10} color={fcolor.white}/>}
          </TouchableOpacity>
          <AppText style={{paddingLeft: 20,}}>모두 동의</AppText>
        </View>
        <Text style={styles.checkboxText}>서비스 이용을 위해 약관에 모두 동의합니다.</Text>

        <View style={styles.somting}>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.overFourteen ? styles.check : null]}
              onPress={() => handlePress('overFourteen')}>
                {checkboxStates.overFourteen && <Icon name="check" size={10} color={fcolor.white}/>}
            
            </TouchableOpacity>
            <Text style={{paddingLeft: 20 }}>만 14세 이상입니다.</Text>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.termsAgree ? styles.check : null]}
              onPress={() => handlePress('termsAgree')}>
              {checkboxStates.termsAgree && <Icon name="check" size={10} color={fcolor.white}/>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>서비스 이용약관 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.privacyPolicy ? styles.check : null]}
              onPress={() => handlePress('privacyPolicy')}>
              {checkboxStates.privacyPolicy && <Icon name="check" size={10} color={fcolor.white}/>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>개인정보 처리방침 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.personalInfo ? styles.check : null]}
              onPress={() => handlePress('personalInfo')}>
              {checkboxStates.personalInfo && <Icon name="check" size={10} color={fcolor.white}/>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>개인 정보 수집 및 이용 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.marketing ? styles.check : null]}
              onPress={() => handlePress('marketing')}>
              {checkboxStates.marketing && <Icon name="check" size={10} color={fcolor.white}/>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>마케팅 수신 동의(선택)</AppText>
          </View>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
        <TouchableOpacity style={styles.nextbutton}
          onPress={() => navigation.navigate('idnpass')}>
          <Text style={{color: 'white', fontFamily: "Pretendard-Regular"}}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: fcolor.white,
  },
  box: {
    marginTop: 60,
    marginBottom: 60,
    borderColor: fcolor.gray1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor:fcolor.gray1
  },
  somting: {
    marginTop: 25,
    marginBottom: 25
  },
  check_l: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',

  },
  checkbox: {
    borderColor: fcolor.gray3,
    borderWidth: 1,
    borderRadius: 50,
    height: 19,
    width: 19,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:fcolor.white
    
  },
  check: {
    backgroundColor: fcolor.blue,
    borderColor:fcolor.blue
  },
  checkboxText: {
    paddingLeft: 35,
    fontSize: 13,
    color: '#717171',
    fontFamily: "Pretendard-Regular",
  },
  nextbutton: {
    backgroundColor: fcolor.blue,
    height: 61,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
  }
})


export default Signup;
