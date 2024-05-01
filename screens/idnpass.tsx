import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../src/components/common/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BoldText from "../src/components/common/BoldText";

export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };

function IdnPass (){
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


    return(
        <View style={styles.container}>
            <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:maincol,width:"50%",height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:70}}>
            <BoldText>{"아이디와 비밀번호를\n설정해주세요"}</BoldText>
            </View>
            <View style={styles.boxset}>
                <View style={styles.box}>
                <AppText style={{fontSize:13,margin:20}}>아이디</AppText>
                <TextInput style={styles.boxinput} placeholder={"영문 10자 이내로 설정해주세요"}/>
                </View>
                <View style={styles.box}>
                <AppText style={{fontSize:13,margin:20}}>비밀번호</AppText>
                <TextInput style={styles.boxinput} placeholder={"8글자 이내로 설정해주세요"}/>
                </View>
                <View style={styles.box}>
                <AppText style={{fontSize:13,margin:20}}>비밀번호 확인</AppText>
                <TextInput style={styles.boxinput} placeholder={"동일한 비밀번호를 한번 더 입력해주세요"}/>
                </View>
                <View style={styles.box}>
                <AppText style={{fontSize:13,margin:20}}>닉네임</AppText>
                <TextInput style={styles.boxinput} placeholder={"어떻게 불러드리면 될까요?\n5글자 이내로 설정해주세요"}/>
                </View>

                
            </View>
            <View style={{flex:1,justifyContent: 'flex-end',marginBottom:50}}>
                <TouchableOpacity style={styles.nextbutton}
                    onPress={() => navigation.navigate('typecheck1')}>
                        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>다음</Text>
                    </TouchableOpacity>
            </View>
            
        </View>
        
    )



}

const maincol="#005bea"

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:25,
        backgroundColor: "#FFFFF",
    },
    boxset:{
        marginTop:30
    },
    box:{
        marginTop:25,
        height:62,
        borderWidth:1,
        borderColor:"#C1C1C1",
        borderRadius:10,
        flexDirection:"row"

    },
    boxinput:{
        fontSize:10,
        fontFamily:"Pretendard-Regular"
    },
    nextbutton:{
        
        backgroundColor:maincol,
        height:61,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
    }
})

export default IdnPass;