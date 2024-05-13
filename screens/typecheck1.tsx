import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RText from "../src/components/common/RText";
import BText from "../src/components/common/BText";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import database from '@react-native-firebase/database';
import fcolors from "../src/assets/colors/fcolors";
import NeonGr from "../src/components/neongr";
import MText from "../src/components/common/MText";
import Icon from 'react-native-vector-icons/MaterialIcons';

export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };

//취향부분 동작 대충...
//버튼 각 항목 부분 별로 인덱스 5 정도로 변수 만듦
//데이터 연동 시키면... 인덱스 번호에 맞게끔 저장해서
//그거 토대로 취향 분석 결과 짜란..? 


function Typecheck1() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
    
    // 클릭 이벤트
    const handlePress = (clickbox) => {
        setSelectedCheckbox(prevState => prevState === clickbox ? null : clickbox);
    };

    // Firebase Realtime Database에 데이터 쓰기
    const add_db = (db) => {
        // 선택된 버튼 이름을 경로에 설정하여 데이터베이스에 저장
        database()
        .ref(`/회원/ㅇㅇㅇ/선호여행지/${db ? db : 'none'}`)
        .set(db ? true : false)
        .then(() => console.log(`Data set for ${db}.`))
        .catch(error => console.error('Error writing to Firebase', error));
    };

    
    
    return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <View style={styles.container}>
        <View style={{height:4,backgroundColor:fcolors.skyblue,marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:fcolors.blue,width:"75%",height:4,borderRadius:40}}/>
        </View>
        <View style={{paddingTop:50}}>
            <BText><BText color={fcolors.blue}>여행 취향</BText>을 알려주세요</BText>
            <MText color={fcolors.gray3} fontSize={13} style={{marginTop:10}}>플래닝이 여러분의 여행을 도울게요</MText>
        </View>
        
        <View style={styles.layout}>
                    <View style={{flexDirection:'row', marginLeft:15,marginTop:20}}>
                    <MText>어떤 </MText><NeonGr><MText>여행지</MText></NeonGr><MText>를 선호하시나요?</MText>
                    </View>
                    <View style={{ flexDirection: "row" ,justifyContent:'space-between',marginLeft: 5,marginRight:5,
                        marginTop:10
                    }}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox === id ? styles.click : null]} 
                                onPress={() => [handlePress(id),add_db(id)]}
                            ><Icon name="check" size={17} color={fcolors.white}/></TouchableOpacity>
                        ))}
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:10}}>
                        <RText color={fcolors.gray4}>핫플레이스</RText>
                        <RText color={fcolors.gray4}>로컬장소</RText>
                    </View>
        </View>

        {/* 여행태그 */}
        <View style={styles.layout}>
            <View style={{flexDirection:'column',marginLeft:15}}>
                <View style={{flexDirection:'row'}}>
                    <MText>관심있는 </MText><NeonGr><MText>여행 태그</MText></NeonGr><MText>를 선택해주세요</MText>
                </View>
                <RText color={fcolors.gray3} style={{marginTop:4}}>최소 2개 이상 선택해주세요</RText>
            </View>
            
            {/* 여행 태그 첫줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>관광</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>추억여행</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>사진 업로드</RText>
            </TouchableOpacity>
            </View>

            {/* 여행 태그 두번쨰줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>숨겨진 관광 명소</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>식도락</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>핫플</RText>
            </TouchableOpacity>
            </View>

            {/* 여행 태그 세번쨰줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>유적지</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>전시회 투어</RText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>촬영지</RText>
            </TouchableOpacity>
            </View>
            
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <RText fontSize={13} color={fcolors.gray4}>박물관·미술관 투어</RText>
            </TouchableOpacity>
            </View>
        </View>
        {/* 다음 버튼 */}
        <View style={{flex:1,justifyContent: 'flex-end',marginBottom:12, alignItems:'center'}}>
            <TouchableOpacity style={styles.nextbutton} 
                onPress={() => navigation.navigate('typecheck2')}>
                    <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>거의 다 왔어요</Text>
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


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:25,
        backgroundColor: fcolors.white,
    },
    layout:{
        marginTop:30
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
        height:34,
        borderWidth:1,
        borderRadius:10,
        marginTop:18,
        marginRight:20,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:fcolors.gray1,
        borderColor:fcolors.gray1
    },
    click:{
        backgroundColor: fcolors.blue,
        borderColor:fcolors.blue
    },
    nextbutton:{
        width:332,
        backgroundColor:fcolors.blue,
        height:61,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
        elevation:3
    },
    laterbutton:{
        alignItems:"center",
        justifyContent:'center',
        marginTop:3, 
        width:144, 
        height:48,
        
    }
})

export default Typecheck1;