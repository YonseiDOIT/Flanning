import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppText from "../src/components/common/AppText";
import BoldText from "../src/components/common/BoldText";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import database from '@react-native-firebase/database';

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
        <View style={{height:4,backgroundColor:"#C1C1C1",marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:maincol,width:"75%",height:4,borderRadius:40}}/>
        </View>
        <View style={{paddingTop:70}}>
            <BoldText>여행 취향을 알려주세요</BoldText>
            <Text style={{fontSize:14,fontFamily:"Pretendard-Regular"}}>플래닝이 여러분의 여행을 도울게요</Text>
        </View>
        
        <View style={styles.layout}>
                    <AppText>어떤 여행지를 선호하시나요?</AppText>
                    <View style={{ flexDirection: "row" }}>
                        {['prefer1', 'prefer2', 'prefer3', 'prefer4', 'prefer5'].map(id => (
                            <TouchableOpacity 
                                key={id}
                                style={[styles.clickbox, selectedCheckbox === id ? styles.click : null]} 
                                onPress={() => [handlePress(id),add_db(id)]}
                            />
                        ))}
                    </View>
        </View>

        {/* 여행태그 */}
        <View style={styles.layout}>
            <AppText>관심있는 여행 태그를 선택해주세요</AppText>
            {/* 여행 태그 첫줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>관광</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>추억여행</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>식도락</Text>
            </TouchableOpacity>
            </View>

            {/* 여행 태그 두번쨰줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>사진 업로드</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>숨겨진 관광 명소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>맛집 기행</Text>
            </TouchableOpacity>
            </View>

            {/* 여행 태그 세번쨰줄 */}
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>유적지</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>전시회 투어</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clickbox1}>
                <Text style={{fontSize:10}}>박물관·미술관 투어</Text>
            </TouchableOpacity>
            </View>
            
        </View>
        {/* 다음 버튼 */}
        <View style={{flex:1,justifyContent: 'flex-end',marginBottom:20}}>
            <TouchableOpacity style={styles.nextbutton} 
                onPress={() => navigation.navigate('typecheck2')}>
                    <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>거의 다 왔어요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems:"center",marginTop:10}}
            onPress={() => navigation.navigate('appinfo')}>
            <Text style={{fontFamily:"Pretendard-Regular"}}>다음에 할게요</Text>
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
        margin:25,
        backgroundColor: "#FFFFF",
    },
    layout:{
        marginTop:30
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
    click:{
        backgroundColor: maincol
    },
    nextbutton:{
        
        backgroundColor:maincol,
        height:61,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:"center",
    }
})

export default Typecheck1;