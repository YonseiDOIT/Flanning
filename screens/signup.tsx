import React, { useState } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Animated } from "react-native";

import AppText from "../src/components/common/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};


function Signup() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [check_terms, setcheck]= useState([]);
  
  const options=['아','제발','되라','흑'];
  

  // function pickcheck(selectedCheck){
  //   // const index= check_terms.findIndex(Check => Check == selectedCheck)
    
  //   if(check_terms.includes(selectedCheck)) {
  //     setcheck(check_terms.filter(Check=> Check !== selectedCheck))
      
  //     return;
  //   }
    
  //   setcheck(Check=>Check.concat(selectedCheck),styles.checkbox={backgroundColor:maincol,
  //     borderColor:maincol,
  //     borderWidth:1,
  //     borderRadius:50,
  //     height:15,
  //     width: 15,})

  // }
  
  return (
    <View style={styles.container}>
      <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:20,borderRadius:40}}>
        <View style={{backgroundColor:maincol,width:80,height:4,borderRadius:40}}/>
      </View>
      <View style={{paddingTop:50}}>
        <AppText style={{fontSize:25}}>약관에 동의해주세요</AppText>
      </View>
      <View style={styles.box}>
        <AppText>모두 동의</AppText>
        <Text style={{fontSize:13,color:'#717171',fontFamily:"Pretendard-Regular"}}>서비스 이용을 위해 약관에 모두 동의합니다.</Text>
        
        <View style={styles.somting}>
          <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
          <View style={styles.check_l}>
            <AppText>만 14세 이상입니다.</AppText>
          </View>
          <View style={styles.check_l}>
            <AppText>서비스 이용약관 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <AppText>개인정보 처리방침 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <AppText>개인 정보 수집 및 이용 동의</AppText>
          </View>
          <View style={styles.check_l}>
            <AppText>마케팅 수신 동의(선택)</AppText>
          </View>
          
        
       

        </View>
          
        
        

      </View>
      <TouchableOpacity style={styles.nextbutton}
      onPress={() => navigation.navigate('idnpass')}>
        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>다음</Text>
      </TouchableOpacity>
    </View>);
}

const maincol="#005bea"

const styles = StyleSheet.create({

  container: {
    margin:25,
    backgroundColor: "#FFFFF",
  },
  box:{
    marginTop:60,
    marginBottom:60,
    borderColor:"#C1C1C1",
    borderWidth:1,
    borderRadius:10,
    padding:20
  },
  nextbutton:{
    transform : [{translateY:60}],
    backgroundColor:maincol,
    height:61,
    borderRadius:10,
    justifyContent: 'center',
    alignItems:"center",
  },
  somting:{
    marginTop:25,
    marginBottom:25
  },
  check_l:{
    marginTop:10
  },
  checkbox:{
    borderColor:maincol,
    borderWidth:1,
    borderRadius:50,
    height:15,
    width: 15,
  },
  checkboxText:{
    fontFamily:"Pretendard-Regular",
    marginLeft:10,
  },
  check:{
    alignSelf:'center',
    color:'white',
    fontSize:8,
    backgroundColor:maincol,
  }

})

export default Signup;