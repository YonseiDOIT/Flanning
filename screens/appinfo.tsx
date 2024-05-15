import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import BText from "../src/components/common/BText";
import AppText from "../src/components/common/RText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import fcolors from "../src/assets/colors/fcolors";
import NeonGr from "../src/components/neongr";
import LinearGradient from "react-native-linear-gradient";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import MText from "../src/components/common/MText";



export type RootStackParam = {
    Home: undefined;
    Test: undefined;
  };


const SlideItem = ({ item }) => {
    return (
        <View style={item.style}>
            <Image style={styles.img}source={item.infoimg}/>
            <BText style={{marginTop:10}}>{item.text}</BText>
        </View>
        
    )
}
const slides=[
    {
        id:1,
        style:{padding:60,alignItems:'center',justifyContent:'center'},
        infoimg: require('../src/assets/images/CALENDAR.png'),
        text:<BText fontSize={18}><BText color={fcolors.orange} fontSize={18}>일정</BText>을 <BText 
        color={fcolors.orange} fontSize={18}>함께</BText> 세우고</BText>

    },
    {
        id:2,
        style:{padding:50,alignItems:'center',justifyContent:'center'},
        infoimg: require('../src/assets/images/MAP.png'),
        text: <BText fontSize={18}><BText color={fcolors.orange} fontSize={18}>동선</BText>을 <BText 
        color={fcolors.orange} fontSize={18}>같이</BText> 확인하고</BText>
    },
    {
        id:3,
        style:{padding:50,alignItems:'center',justifyContent:'center'},
        infoimg: require('../src/assets/images/AIRPLANE.png'),
        text:<BText color={fcolors.orange} fontSize={18}>떠나고</BText>

    },
    {
        id:4,
        style:{padding:60,alignItems:'center',justifyContent:'center'},
        infoimg: require('../src/assets/images/SHOOTING.png'),
        text: <BText fontSize={18}>여행을 <BText color={fcolors.orange} fontSize={18}>기록해요</BText></BText>

    },
]




function Appinfo() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
    
    const [activeIndex, setActiveIndex]=useState(0);

    const handleOnScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const indexOfActiveSlide = Math.round(scrollPosition / event.nativeEvent.layoutMeasurement.width);
        setActiveIndex(indexOfActiveSlide);
      };

    return (
        <GestureHandlerRootView style={{ flex: 1}}>
            <View style={styles.container}>
                <View style={{marginTop:60, marginBottom:30}}>
                    <BText>이제 <BText color={fcolors.blue}>플래닝</BText>과 계획을 세우고</BText>
                    <View style={{flexWrap:'wrap'}}>
                        <NeonGr><BText>여행을 떠나볼까요?</BText></NeonGr>
                    </View>
                    
                </View>
                
                <View style={{alignItems:'center'}}>
                    <View style={styles.infobox}>
                        <FlatList 
                            data={slides}
                            renderItem={SlideItem}
                            keyExtractor={(item) => String(item.id)}
                            horizontal
                            pagingEnabled
                            snapToAlignment="center"
                            showsHorizontalScrollIndicator={false} 
                            onScroll={handleOnScroll}/>
                    </View>
                    <View style={{flexDirection:'row', marginTop:15}}>
                        {
                            slides.map((_, idx)=>{
                                return <View key={idx.toString()}style={[styles.dot, idx === activeIndex && styles.dotfill]}/>
                            })
                        }
                    </View>
                </View>
                
                

                    {/* 다음 버튼 */}
                    <View style={{flex:1,justifyContent: 'flex-end',marginBottom:65}}>
                        <TouchableOpacity style={styles.nextbutton}
                        onPress={() => navigation.navigate('main')}>
                                <MText fontSize={14} color={fcolors.white}>시작하기</MText>
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
        padding:30,
        backgroundColor: fcolors.white,
    },
    infobox:{
        marginTop:30,
        width:'100%',
        height:320,
        backgroundColor:fcolors.gray1,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center'
    },
    img:{
        width:208,
        height:208
    },
    dot:{
        width:8,
        height:8,
        borderRadius:50,
        backgroundColor:fcolors.gray2,
        margin:5
    },
    dotfill:{
        backgroundColor:fcolors.gray4
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