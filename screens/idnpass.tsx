import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../src/components/common/AppText";

function IdnPass (){

    return(
        <View style={styles.container}>
            <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:20,borderRadius:40}}>
            <View style={{backgroundColor:maincol,width:140,height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:50}}>
            <AppText style={{fontSize:25}}>아이디와 비밀번호를</AppText>
            <AppText style={{fontSize:25}}>설정해주세요</AppText>
        </View>
        </View>
        
    )



}

const maincol="#005bea"

const styles = StyleSheet.create({
    container:{
        margin:25,
        backgroundColor: "#FFFFF",
    }
})

export default IdnPass;