import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BText from "../src/components/common/BText";
import RText from "../src/components/common/RText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import fcolors from "../src/assets/colors/fcolors";
import MText from "../src/components/common/MText";

export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };

function Typecheck2() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    return (
        <GestureHandlerRootView style={{ flex: 1}}>
        <View style={styles.container}>
            <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:26,borderRadius:40}}>
                <View style={{backgroundColor:maincol,width:"100%",height:4,borderRadius:40}}/>
            </View>
            <View style={{paddingTop:50}}>
                <BText>여행 취향을 알려주세요</BText>
                <Text style={{fontSize:14,fontFamily:"Pretendard-Regular"}}>
                    동행인이 여러분의 여행 성향에 대해 알 수 있도록 해주세요</Text>
            </View>

            <View style={styles.layout}>
                <MText>어떤 여행을 선호하시나요?</MText>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                </View>
                <View style={{flexDirection:"row", margin:5}}>
                    <MText style={{fontSize:10, flex:5}}>활동적인 여행</MText>
                    <MText style={{fontSize:10, flex:1}}> 정적인 여행</MText>
                </View>
            </View>
            <View style={styles.layout}>
                <MText>여행의 목적은 어디에 가까우신가요?</MText>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                </View>
                <View style={{flexDirection:"row", margin:5}}>
                    <MText style={{fontSize:10, flex:2.5}}>동행자와의 관계형성</MText>
                    <MText style={{fontSize:10, flex:1}}> 여행을 떠나는 것 자체</MText>
                </View>
                
            </View>
            <View style={styles.layout}>
                <MText>여행 전 계획을 어떻게 세우시나요?</MText>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                </View>
                <View style={{flexDirection:"row", margin:5}}>
                    <MText style={{fontSize:10, flex:6}}>철저하게</MText>
                    <MText style={{fontSize:10, flex:1}}>즉흥적으로</MText>
                </View>
               
            </View>
            <View style={styles.layout}>
                <MText>하루 일정은 어떻게 세우시나요?</MText>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                <TouchableOpacity style={styles.clickbox} />
                </View>
                <View style={{flexDirection:"row", margin:5}}>
                    <MText style={{fontSize:10, flex:7}}>알차게</MText>
                    <MText style={{fontSize:10, flex:1}}>여유롭게</MText>
                </View>
                
            </View>

            {/* 다음 버튼 */}
            <View style={{flex:1,justifyContent: 'flex-end',marginBottom:12, alignItems:'center'}}>
                <TouchableOpacity style={styles.nextbutton}
                onPress={()=>{navigation.navigate('appinfo')}}>
                        <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>마지막이에요</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.laterbutton}
                onPress={() => navigation.navigate('appinfo')}>
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
        marginTop:25
    },
    clickbox:{
        alignItems:'center',
        justifyContent:'center',
        width:62,
        height:32,
        borderWidth:1,
        borderRadius:10,
        marginTop:10,
        marginRight:7,
        borderColor:"#C1C1C1",
       
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
    },
    nextbutton:{
        width:332,
        backgroundColor:maincol,
        height:61,
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