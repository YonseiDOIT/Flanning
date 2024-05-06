import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BoldText from "../src/components/common/BoldText";
import AppText from "../src/components/common/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };

function Appinfo() {
    
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
    
    return (
    <View style={styles.container}>
        <View style={{paddingTop:100}}>
            <BoldText>{"이제 플래닝과 계획을 세우고\n여행을 떠나볼까요?"}</BoldText>
         </View>

   
        <View style={[styles.infobox,{alignSelf: 'center'}]}/>

         


            {/* 다음 버튼 */}
            <View style={{flex:1,justifyContent: 'flex-end',marginBottom:50}}>
                <TouchableOpacity style={styles.nextbutton}
                onPress={() => navigation.navigate('test')}>
                        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>시작하기</Text>
                </TouchableOpacity>

            </View>

        </View>
  );
}

const maincol="#005bea"

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:25,
        backgroundColor: "#FFFFF",
    },
    infobox:{
        marginTop:30,
        width:314,
        height:320,
        backgroundColor:"#E1E1E1",
    }
    ,
    nextbutton:{
        backgroundColor:maincol,
        height:61,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
    }
})

export default Appinfo;