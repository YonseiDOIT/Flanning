import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import AppText from "../src/components/common/AppText";
import BoldText from "../src/components/common/BoldText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
      <View style={{height: 4, backgroundColor: "#C1C1C1", marginTop: 26, borderRadius: 40}}>
        <View style={{backgroundColor: maincol, width: "25%", height: 4, borderRadius: 40}}/>
      </View>
      <View style={{marginTop: 70}}>
        <BoldText>약관에 동의해주세요</BoldText>
      </View>
      <View style={styles.box}>
        <View style={styles.check_l}>
          <TouchableOpacity
            style={[styles.checkbox, checkboxStates.allAgree ? styles.check : null]}
            onPress={() => handlePress('allAgree')}>
            {checkboxStates.allAgree && <Text style={styles.checkmark}>✔</Text>}
          </TouchableOpacity>
          <AppText style={{paddingLeft: 20}}>모두 동의</AppText>
        </View>
        <Text style={styles.checkboxText}>서비스 이용을 위해 약관에 모두 동의합니다.</Text>

        <View style={styles.somting}>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.overFourteen ? styles.check : null]}
              onPress={() => handlePress('overFourteen')}>
              {checkboxStates.overFourteen && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>만 14세 이상입니다.</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.termsAgree ? styles.check : null]}
              onPress={() => handlePress('termsAgree')}>
              {checkboxStates.termsAgree && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>서비스 이용약관 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.privacyPolicy ? styles.check : null]}
              onPress={() => handlePress('privacyPolicy')}>
              {checkboxStates.privacyPolicy && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>개인정보 처리방침 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.personalInfo ? styles.check : null]}
              onPress={() => handlePress('personalInfo')}>
              {checkboxStates.personalInfo && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>
            <AppText style={{paddingLeft: 20}}>개인 정보 수집 및 이용 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <TouchableOpacity
              style={[styles.checkbox, checkboxStates.marketing ? styles.check : null]}
              onPress={() => handlePress('marketing')}>
              {checkboxStates.marketing && <Text style={styles.checkmark}>✔</Text>}
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

const maincol = "#005bea";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    backgroundColor: "#FFFFF",
  },
  box: {
    marginTop: 60,
    marginBottom: 60,
    borderColor: "#C1C1C1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 20
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
    borderColor: maincol,
    borderWidth: 1,
    borderRadius: 50,
    height: 15,
    width: 15,
    alignItems: 'center',
    
  },
  check: {
    backgroundColor: maincol
  },
  checkmark: {
    color: 'white',
    fontSize: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxText: {
    paddingLeft: 35,
    fontSize: 13,
    color: '#717171',
    fontFamily: "Pretendard-Regular",
  },
  nextbutton: {
    backgroundColor: maincol,
    height: 61,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
  }
})

export default Signup;
