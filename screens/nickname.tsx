import React, { Component, useState } from "react";
import { Container, Placeholder } from "react-bootstrap";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MText from "../src/components/common/RText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BText from "../src/components/common/BText";
import fcolors from "../src/assets/colors/fcolors";
import { signUp } from "../src/lib/auth";
import { createUser } from "../src/lib/users";
import firestore from "@react-native-firebase/firestore";


function Nickname ({navigation:{navigate},route}){

    const [form, setForm] = useState({
        nickname: "",
        intro: "",
      });
    
    
    
    const onSubmit = (nickname,intro) => {
        const userCollection = firestore().collection("users").doc(route.params.usercode);
        userCollection.update({
            nickname : nickname,
            intro:intro
          })
    }

    return(
        <View style={styles.container}>
            <View style={{height:4,backgroundColor: fcolors.skyblue,marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:maincol,width:"50%",height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:70}}>
            <BText><BText color={fcolors.blue}>닉네임</BText>과 <BText color={fcolors.blue}>사진</BText>을 설정해주세요</BText>
            </View>
            <View style={styles.boxset}>
                <View style={styles.box}>
                <MText color={fcolors.gray4} fontSize={13} style={{marginTop:20,marginLeft:20,marginRight:40}}>닉네임</MText>
                    <TextInput style={styles.boxinput} 
                    onChangeText={(text)=>setForm({...form,nickname:text})}
                    placeholder={"닉네임을 입력해주세요"}
                     placeholderTextColor={fcolors.gray3}/>
                </View>
                <View style={styles.box}>
                <MText color={fcolors.gray4} fontSize={13} style={{marginTop:20,marginLeft:20,marginRight:40}}>자기 소개</MText>
                    <TextInput style={styles.boxinput} 
                    onChangeText={(text)=>setForm({...form,intro:text})}
                    placeholder={"한 줄 자기소개를 입력해주세요"} 
                    placeholderTextColor={fcolors.gray3} 
                    />
                </View>
               
                {/* <View style={styles.box}>
                <MText style={{fontSize:13,margin:20}}>닉네임</MText>
                <TextInput style={styles.boxinput} placeholder={"어떻게 불러드리면 될까요?\n5글자 이내로 설정해주세요"}/>
                </View> */}

                
            </View>

            <View style={{flex:1,marginTop:150, alignItems:'center'}}>
                <TouchableOpacity style={[styles.nextbutton, form.nickname && form.intro ? {backgroundColor:fcolors.blue} : null]}
                    onPress={form.nickname && form.intro ? () =>[onSubmit(form.nickname,form.intro),navigate('appinfo')] : null}>
                        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>마지막이에요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.laterbutton}
                onPress={() => navigate('appinfo')}>
                <MText color={fcolors.gray3} fontSize={14} style={{textDecorationLine:'underline'}}>다음에 할게요</MText>
                </TouchableOpacity>
            </View>

            
        </View>
        
    )



}

const maincol="#005bea"

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        backgroundColor: fcolors.white,
    },
    boxset:{
        marginTop:50,
        
    },
    box:{
        marginTop:30,
        height:62,
        borderWidth:1,
        borderColor:fcolors.gray1,
        borderRadius:10,
        flexDirection:"row",
        backgroundColor:fcolors.gray1

    },
    boxinput:{
        fontSize:13,
        fontFamily:"Pretendard-Regular",
        color:fcolors.gray4,
    },
    
    nextbutton:{
        width:332,
        backgroundColor:fcolors.gray4,
        height:45,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
    },
    laterbutton:{
        alignItems:"center",
        justifyContent:'center',
        marginTop:3, 
        width:144, 
        height:48,
        
    }
})

export default Nickname;