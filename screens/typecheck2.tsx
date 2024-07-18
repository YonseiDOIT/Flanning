import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BText from "../src/components/common/BText";
import RText from "../src/components/common/RText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import fcolors from "../src/assets/colors/fcolors";
import MText from "../src/components/common/MText";
import NeonGr from "../src/components/neongr";
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../src/components/common/UserContext";


function Typecheck2({navigation: {navigate}}) {
    

    //선호 여행지
    const [selectedCheckbox, setSelectedCheckbox] = useState({
        prefertravel:null,
        travelpurpose: null,
        howtrvplan:null,
        howtodayplan:null
    });


    // 선호 클릭
    const handlePress = (keyname,clickbox) => {
        setSelectedCheckbox((prevState) => ({...prevState, [keyname] : prevState[keyname] === clickbox ? null : clickbox}));
        console.log(selectedCheckbox)
    };

    //유저코드 가져오기
  const { usercode } = useUser();
    
    const createtype = (db1,db2,db3,db4) =>{
        const userCollection = firestore().collection("users").doc(usercode);
        userCollection.update({
            prefertravel : db1,
            travelpurpose: db2,
            howtrvplan:db3,
            howtodayplan:db4
          })
        
    };

    return (
        <GestureHandlerRootView style={{ flex: 1}}>
        <View style={styles.container}>
            <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:26,borderRadius:40}}>
                <View style={{backgroundColor:maincol,width:"100%",height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:30}}>
                <BText><BText color={fcolors.blue}>여행 성향</BText>을 알려주세요</BText>
                <MText color={fcolors.gray3} fontSize={13} style={{marginTop:7}}>동행인이 여러분의 여행 성향에 대해 알 수 있도록 해주세요</MText>
            </View>

            <View style={styles.layout}>
                <View style={{flexDirection:'row', marginLeft:15,marginTop:5}}>
                    <NeonGr><MText>어떤 여행</MText></NeonGr><MText>을 선호하시나요?</MText>
                </View>
                <View style={styles.clickbox_list}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox.prefertravel==id ? styles.click : null]} 
                                onPress={() => [handlePress('prefertravel',id)]}
                            ><Icon name="check" size={17} color={fcolors.white}/></TouchableOpacity>
                        ))}
                </View>
                <View style={styles.smallinfo}>
                        <RText color={fcolors.gray4}>활동적인 여행</RText>
                        <RText color={fcolors.gray4}>정적인 여행</RText>
                </View>
            </View>
            <View style={styles.layout}>
                <View style={{flexDirection:'row', marginLeft:15,marginTop:5}}>
                    <MText>여행의 </MText><NeonGr><MText>목적</MText></NeonGr><MText>은 어디에 가까우신가요?</MText>
                </View>
                <View style={styles.clickbox_list}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox.travelpurpose === id ? styles.click : null]} 
                                onPress={() => [handlePress('travelpurpose',id)]}
                            ><Icon name="check" size={17} color={fcolors.white}/></TouchableOpacity>
                        ))}
                </View>
                <View style={styles.smallinfo}>
                        <RText color={fcolors.gray4}>동행자와 관계 형성</RText>
                        <RText color={fcolors.gray4}>여행을 떠나는 것 자체</RText>
                </View>
                
            </View>
            <View style={styles.layout}>
                <View style={{flexDirection:'row', marginLeft:15,marginTop:5}}>
                    <MText>여행 전 </MText><NeonGr><MText>계획</MText></NeonGr><MText>을 어떻게 세우시나요?</MText>
                </View>
                <View style={styles.clickbox_list}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox.howtrvplan === id ? styles.click : null]} 
                                onPress={() => [handlePress('howtrvplan',id)]}
                            ><Icon name="check" size={17} color={fcolors.white}/></TouchableOpacity>
                        ))}
                </View>
                <View style={styles.smallinfo}>
                        <RText color={fcolors.gray4}>철저하게</RText>
                        <RText color={fcolors.gray4}>즉흥적으로</RText>
                </View>
               
            </View>
            <View style={styles.layout}>
                <View style={{flexDirection:'row', marginLeft:15,marginTop:5}}>
                    <NeonGr><MText>하루 일정</MText></NeonGr><MText>은 어떻게 세우시나요?</MText>
                </View>
                <View style={styles.clickbox_list}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox.howtodayplan === id ? styles.click : null]} 
                                onPress={() => [handlePress('howtodayplan',id)]}
                            ><Icon name="check" size={17} color={fcolors.white}/></TouchableOpacity>
                        ))}
                </View>
                <View style={styles.smallinfo}>
                        <RText color={fcolors.gray4}>알차게</RText>
                        <RText color={fcolors.gray4}>여유롭게</RText>
                </View>
                
            </View>

            {/* 다음 버튼 */}
            <View style={{flex:1,justifyContent: 'flex-end',marginBottom:20, alignItems:'center'}}>
                <TouchableOpacity style={[styles.nextbutton,selectedCheckbox ? {backgroundColor:fcolors.blue}:null]}
                onPress={selectedCheckbox ? ()=>[navigate('appinfo'),createtype(selectedCheckbox.prefertravel,selectedCheckbox.travelpurpose,selectedCheckbox.howtrvplan,selectedCheckbox.howtodayplan)]: null}>
                        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>마지막이에요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.laterbutton}
                onPress={() => navigate('appinfo')}>
                <MText color={fcolors.gray3} fontSize={14} style={{textDecorationLine:'underline'}}>다음에 할게요</MText>
                </TouchableOpacity>
            </View>

        </View>
    </GestureHandlerRootView>
        
      );
    }
    

    
const maincol="#005bea"

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        backgroundColor: fcolors.white,
    },
    layout:{
        marginTop:20
    },
    clickbox_list:{
        flexDirection: "row" ,
        justifyContent:'space-between',
        marginLeft: 5,
        marginRight:5,
        marginTop:5
    },
    clickbox:{
        alignItems:'center',
        justifyContent:'center',
        width:27,
        height:27,
        borderWidth:1,
        borderRadius:50,
        marginTop:10,
        marginRight:7,
        borderColor: fcolors.gray3,
       
    },
    clickbox1:{
        alignItems:'center',
        justifyContent:'center',
        height:32,
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        marginRight:7,
        paddingLeft:20,
        paddingRight:20,
        borderColor:"#C1C1C1",
    },click1:{
        backgroundColor: fcolors.green,
        borderColor:fcolors.blue
    },
    click:{
        backgroundColor: fcolors.blue,
        borderColor:fcolors.blue
    },
    smallinfo:{
        flexDirection:'row',
         justifyContent:'space-between',
         marginTop:10
    },
    nextbutton:{
        width:332,
        backgroundColor:maincol,
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
        height:48
    }
})

export default Typecheck2;