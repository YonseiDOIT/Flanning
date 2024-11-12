import React, { Component, useEffect, useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MText from "../src/components/common/RText";
import BText from "../src/components/common/BText";
import fcolor from "../src/assets/colors/fcolors";
import RText from "../src/components/common/RText";

import Icon from 'react-native-vector-icons/MaterialIcons';
import NeonGr from "../src/components/neongr";
import { CheckAnimation } from "../src/components/common/checkAnimation";


function LoadingPage({ navigation: { navigate },route }) {
    useEffect(() => {
        // 모든 체크 애니메이션이 완료된 후 1초 후에 화면 전환
        const timer = setTimeout(() => {
            navigate("appinfo"); // 여기에 실제 전환할 화면 이름을 입력하세요
        }, 5600); // 각 애니메이션이 1200ms이고, 4개이므로 4800ms + 400ms 추가 지연

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 40 }}>
                <BText><BText color={fcolor.blue}>플래닝</BText>이 <BText color={fcolor.blue}>여행스타일</BText>을</BText>
                <BText><BText color={fcolor.blue}>기록</BText>하고 있어요</BText>
            </View>
            <View style={{ width: 318, height: 430, alignItems: 'center', marginTop: 60 }}>
                <ImageBackground style={styles.back} source={require('../src/assets/images/receipt.png')}>
                    <View style={{ marginTop: 167, marginHorizontal: 32 }}>

                        <View style={{ flexDirection: 'row' }}>
                            <NeonGr>
                                <BText fontSize={16} color={fcolor.gray4}><BText fontSize={16}>{route.params.nickname}님</BText>의</BText>
                            </NeonGr>
                        </View>
                        <View style={{ marginTop: 13, marginLeft: 25 }}>
                            {[
                                "선호 여행지를 파악하는 중",
                                "여행 태그를 기록하는 중",
                                "여행 스타일을 파악하는 중",
                                "플래닝과 함께 여행할 준비 중"
                            ].map((text, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '15%' }}>
                                        <CheckAnimation color={fcolor.blue} duration={1200} delay={index * 1300} />
                                    </View>
                                    <MText fontSize={14} style={{ marginVertical: 7 }} color={fcolor.gray4}>{text}</MText>
                                </View>
                            ))}
                        </View>

                    </View>


                </ImageBackground>
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
    back: {
        width: '100%',
        height: '100%'
    }
})

export default LoadingPage;