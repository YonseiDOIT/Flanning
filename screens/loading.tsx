import React, { Component, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MText from "../src/components/common/RText";
import BText from "../src/components/common/BText";
import fcolor from "../src/assets/colors/fcolors";
import RText from "../src/components/common/RText";

import Icon from 'react-native-vector-icons/Ionicons';


function LoadingPage({ navigation: { navigate } }) {

   
    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 40 }}>
                <BText><BText color={fcolor.blue}>플래닝</BText>이 <BText color={fcolor.blue}>여행스타일</BText>을</BText>
                <BText><BText color={fcolor.blue}>기록</BText>하고 있어요</BText>
            </View>

            
        </View>

    )



}

const maincol = "#005bea"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: fcolor.white,
    },
    boxset: {
    },
    box: {
        marginTop: 20,
        height: 62,
        borderWidth: 1,
        borderColor: fcolor.gray1,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: fcolor.gray1

    },
    boxinput: {
        fontSize: 13,
        fontFamily: "Pretendard-Regular",
        color: fcolor.gray4,
    },

    nextbutton: {
        width: 332,
        backgroundColor: fcolor.gray4,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center",
    },
    laterbutton: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 3,
        width: 144,
        height: 48,

    }
})

export default LoadingPage;