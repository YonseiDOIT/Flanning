import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RText from "../src/components/common/RText";
import BText from "../src/components/common/BText";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import fcolors from "../src/assets/colors/fcolors";
import NeonGr from "../src/components/neongr";
import MText from "../src/components/common/MText";
import Icon from 'react-native-vector-icons/MaterialIcons';

import database from '@react-native-firebase/database';
import firestore from "@react-native-firebase/firestore";
import { useUser } from "../src/components/common/UserContext";



function Typecheck1({navigation: {navigate}}) {
    const [issave,setsave]= useState({
        preferlocation:'',
        trvtg: []
    })

    //선호 여행지
    const [selectedCheckbox, setSelectedCheckbox] = useState();
    
    //여행태그
    const [isclick,setclick]=useState([]);

    // 선호 클릭
    const handlePress = (clickbox) => {
        setSelectedCheckbox(prevState => prevState === clickbox ? null : clickbox);
        setsave(prevState => ({...prevState, preferlocation:clickbox}))
    };
    
    //여행태그 클릭
    const handle = (clickbox) => {
        setclick(prevState => {
            // 클릭된 아이템이 이미 선택되어 있으면 제거, 아니면 추가
            if (prevState.includes(clickbox)) {
                return prevState.filter(id => id !== clickbox);
            } else {
                return [...prevState, clickbox];
            }
        });
        setsave(prevState => ({...prevState, trvtg: isclick.includes(clickbox) ? prevState.trvtg.filter((element) => element !== clickbox) : [...prevState.trvtg, clickbox]}))
    };

    //유저코드 가져오기
  const { usercode } = useUser();

    const createtype = (db1,db2) =>{
        const userCollection = firestore().collection("users").doc(usercode);
        userCollection.update({
            preferlocation : db1,
            trvtg:db2
          })
        
    };

    
    
    return (
    <GestureHandlerRootView style={{ flex: 1}}>
    <View style={styles.container}>
        <View style={{height:4,backgroundColor:fcolors.skyblue,marginTop:26,borderRadius:40}}>
            <View style={{backgroundColor:fcolors.blue,width:"90%",height:4,borderRadius:40}}/>
        </View>
        <View style={{paddingTop:35}}>
            <BText><BText color={fcolors.blue}>여행 취향</BText>을 알려주세요</BText>
            <MText color={fcolors.gray3} fontSize={13} style={{marginTop:7}}>플래닝이 여러분의 여행을 도울게요</MText>
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
                                onPress={() => [handlePress(id)]}
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
                {['관광','추억여행','사진 업로드'].map(id=>(
                    <TouchableOpacity key={id} 
                    style={[styles.clickbox1, isclick.includes(id) ? { backgroundColor: fcolors.blue } : null]}
                    onPress={()=>handle(id)}>
                        {isclick.includes(id) ? 
                        <RText fontSize={13} color={fcolors.white}>{id}</RText> :
                        <RText fontSize={13} color={fcolors.gray4}>{id}</RText>}
                    </TouchableOpacity>
                ))}        
            </View>

            {/* 여행 태그 두번쨰줄 */}
            <View style={{flexDirection:"row"}}>
                {['숨겨진 관광 명소','식도락','핫플'].map(id=>(
                    <TouchableOpacity key={id} 
                    style={[styles.clickbox1, isclick.includes(id) ? { backgroundColor: fcolors.blue } : null]}
                    onPress={()=>handle(id)}>
                        {isclick.includes(id) ? 
                        <RText fontSize={13} color={fcolors.white}>{id}</RText> :
                        <RText fontSize={13} color={fcolors.gray4}>{id}</RText>}
                    </TouchableOpacity>   
                ))}
            
            </View>
        

            {/* 여행 태그 세번쨰줄 */}
            <View style={{flexDirection:"row"}}>
                {['유적지','전시회 투어','촬영지'].map(id=>(
                    <TouchableOpacity key={id} 
                    style={[styles.clickbox1, isclick.includes(id) ? { backgroundColor: fcolors.blue } : null]}
                    onPress={()=>handle(id)}>
                        {isclick.includes(id) ? 
                        <RText fontSize={13} color={fcolors.white}>{id}</RText> :
                        <RText fontSize={13} color={fcolors.gray4}>{id}</RText>}
                        
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{flexDirection:"row"}}>
                {['박물관·미술관 투어'].map(id=>(
                    <TouchableOpacity key={id} 
                    style={[styles.clickbox1, isclick.includes(id) ? { backgroundColor: fcolors.blue } : null]}
                    onPress={()=>handle(id)}>
                        {isclick.includes(id) ? 
                        <RText fontSize={13} color={fcolors.white}>{id}</RText> :
                        <RText fontSize={13} color={fcolors.gray4}>{id}</RText>}
                        
                    </TouchableOpacity>
                
                ))}
            
            </View>
          
        </View>

        {/* 다음 버튼 */}
        <View style={{flex:1,justifyContent: 'flex-end',marginBottom:20, alignItems:'center'}}>
            <TouchableOpacity style={[styles.nextbutton,selectedCheckbox ? {backgroundColor:fcolors.blue}:null]} 
                onPress={selectedCheckbox ? () => [navigate('typecheck2'),createtype(issave.preferlocation,issave.trvtg)]:null}>
                    <Text style={{color:'white',fontFamily:"Pretendard-Regular"}}>거의 다 왔어요</Text>
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
        backgroundColor:fcolors.gray4,
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
        height:48,
        
    }
})

export default Typecheck1;