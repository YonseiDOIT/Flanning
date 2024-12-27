// import React, { Component, useState } from "react";
// import { Container, Placeholder } from "react-bootstrap";
// import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import MText from "../src/components/common/RText";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import BText from "../src/components/common/BText";
// import fcolor from "../src/assets/colors/fcolors";
// import { signUp } from "../src/lib/auth";
// import { createUser } from "../src/lib/users";
// import { useUser } from "../src/components/common/UserContext";

// function IdnPass ({navigation:{navigate}}){
//     // const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//         confirmPassword: "",
//       });

//     const signUpSubmit = async () => { // 회원가입 함수
//         const {email, password} = form;
//         const info = {email, password};
//         try {
//           const {user} = await signUp(info);

//           console.log(user);
//           onSubmit(email)
//         } catch (e) {
//           //Alert.alert("회원가입에 실패하였습니다.");
//         }
//     }

//     //유저 코드
//     const { usercode, setUsercode } = useUser();

//     const onSubmit = (email: string) => {
//         console.log('파이어베이스 데이터 입력 성공!');
//         const usercode1= createUser({ // 회원 프로필 생성
//           email:email
//         })

//         console.log('파이어베이스: ',usercode1);
//         setUsercode(usercode1);
//         navigate('nickname')
//         .catch(() => {
//           console.log('파이어베이스 에러');
//         });
//     }

//     return(
//         <View style={styles.container}>
//             <View style={{height:4,backgroundColor: fcolor.lblue1,marginTop:26,borderRadius:40}}>
//             <View style={{backgroundColor:maincol,width:"50%",height:4,borderRadius:40}}/>
//             </View>
//             <View style={{paddingTop:40}}>
//             <BText>{"아이디와 비밀번호를\n"}<BText color={fcolor.blue}>설정</BText>해주세요</BText>
//             </View>

//             <View style={styles.boxset}>
//                     <View style={styles.box}>
//                     <MText color={fcolor.gray4} fontSize={13} style={{marginTop:20,marginLeft:20,marginRight:40}}>아이디</MText>
//                         <TextInput style={styles.boxinput}
//                         onChangeText={(text)=>setForm({...form,email:text})}
//                         placeholder={"영문 10자 이내로 설정해주세요"}
//                         placeholderTextColor={fcolor.gray3}/>
//                     </View>
//                     <View style={styles.box}>
//                     <MText color={fcolor.gray4} fontSize={13} style={{marginTop:20,marginLeft:20,marginRight:40}}>비밀번호</MText>
//                         <TextInput style={styles.boxinput}
//                         onChangeText={(text)=>setForm({...form,password:text})}
//                         placeholder={"8글자 이내로 설정해주세요"}
//                         placeholderTextColor={fcolor.gray3}
//                         secureTextEntry={true}/>
//                     </View>
//                     <View style={styles.box}>
//                     <MText color={fcolor.gray4} fontSize={13} style={{marginTop:20,marginLeft:20,marginRight:10 }}>비밀번호 확인</MText>
//                         <TextInput style={styles.boxinput}
//                         placeholder={"비밀번호를 한번 더 입력해주세요"}
//                         placeholderTextColor={fcolor.gray3}
//                         secureTextEntry={true}/>
//                     </View>
//                     {/* <View style={styles.box}>
//                     <MText style={{fontSize:13,margin:20}}>닉네임</MText>
//                     <TextInput style={styles.boxinput} placeholder={"어떻게 불러드리면 될까요?\n5글자 이내로 설정해주세요"}/>
//                     </View> */}

//                 </View>

//             <View style={{flex: 1,marginTop:190}}>
//                 <TouchableOpacity style={[styles.nextbutton, form.email && form.password ? {backgroundColor:fcolor.blue} : null]}
//                     onPress={form.email && form.password ? () => signUpSubmit() : null}>
//                         <MText color={fcolor.white} fontSize={13}>다음</MText>
//                     </TouchableOpacity>
//             </View>

//         </View>

//     )

// }

// const maincol="#005bea"

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         padding:25,
//         backgroundColor: fcolor.white,
//     },
//     boxset:{
//         marginTop:50,

//     },
//     box:{
//         marginTop:15,
//         height:55,
//         borderWidth:1,
//         borderColor:fcolor.gray1,
//         borderRadius:10,
//         flexDirection:"row",
//         backgroundColor:fcolor.gray1

//     },
//     boxinput:{
//         fontSize:13,
//         fontFamily:"Pretendard-Regular",
//         color:fcolor.gray4,
//     },

//     nextbutton:{
//         backgroundColor:fcolor.gray4,
//         height:45,
//         borderRadius:10,
//         justifyContent: 'center',
//         alignItems:"center",
//     }
// })

// export default IdnPass;
