import React, { Component } from "react";
import { Container, Placeholder } from "react-bootstrap";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MText from "../src/components/common/RText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BText from "../src/components/common/BText";
import fcolors from "../src/assets/colors/fcolors";

export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };

function IdnPass (){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


    return(
        <View style={styles.container}>
            <View style={{height:4,backgroundColor: fcolors.skyblue,marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:maincol,width:"50%",height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:70}}>
            <BText>{"아이디와 비밀번호를\n"}<BText color={fcolors.blue}>설정</BText>해주세요</BText>
            </View>
            <View style={styles.boxset}>
                <View style={styles.box}>
                <MText color={fcolors.gray4} fontSize={13} style={{margin:20}}>아이디</MText>
                <TextInput style={styles.boxinput} placeholder={"영문 10자 이내로 설정해주세요"} placeholderTextColor={fcolors.gray3}/>
                </View>
                <View style={styles.box}>
                <MText color={fcolors.gray4} fontSize={13} style={{margin:20}}>비밀번호</MText>
                <TextInput style={styles.boxinput} placeholder={"8글자 이내로 설정해주세요"} placeholderTextColor={fcolors.gray3}/>
                </View>
                <View style={styles.box}>
                <MText color={fcolors.gray4} fontSize={13} style={{margin:20}}>비밀번호 확인</MText>
                <TextInput style={styles.boxinput} placeholder={"동일한 비밀번호를 한번 더 입력해주세요"} placeholderTextColor={fcolors.gray3}/>
                </View>
                {/* <View style={styles.box}>
                <MText style={{fontSize:13,margin:20}}>닉네임</MText>
                <TextInput style={styles.boxinput} placeholder={"어떻게 불러드리면 될까요?\n5글자 이내로 설정해주세요"}/>
                </View> */}

                
            </View>
            <View style={{flex:1,justifyContent: 'flex-end',marginBottom:70}}>
                <TouchableOpacity style={styles.nextbutton}
                    onPress={() => navigation.navigate('typecheck1')}>
                        <MText color={fcolors.white} fontSize={13}>다음</MText>
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
        backgroundColor:maincol,
        height:61,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
        elevation:3
    }
})

export default IdnPass;