import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RText from '../src/components/common/RText';
import BText from '../src/components/common/BText';
import MText from '../src/components/common/MText';
import fcolor from '../src/assets/colors/fcolors';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NeonGr from '../src/components/neongr';
import BottomBar from '../src/components/common/BottomBar';
import LinearGradient from 'react-native-linear-gradient';

import firestore, { FieldValue } from "@react-native-firebase/firestore";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};




// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)

const mycode = 'GPlyn';


export function Trvplanlist() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  //여행태그
  const [isclick,setclick]=useState();
  
  //여행태그 클릭
  const handle = (clickbox) => {
    setclick(prevState => prevState === clickbox ? null : clickbox);

  };

  //목록 가져오기
  const [planTitle, setPlanTitle] = useState([]);

  const get_plan = async (plan_id) => {
    const usersCollection = firestore().collection('plan').doc(plan_id).get();
    const db = (await usersCollection).data();
    console.log(db.title);
    return db.title;
  };
  
  // 여행 목록 불러오기
  useEffect(() => {
    const plan_info = async () => {
      try {
        const usersCollection = firestore().collection('users').doc(mycode).get();
        let db = (await usersCollection).data();
       
        const list = db.plan

        for (let id = 0; id < list.length; id++) {
          console.log(list[id])
          const usersCollection1 = firestore().collection('plan').doc(list[id]).get();
          const db1 = (await usersCollection1).data();
          console.log('돌아감1')
          console.log(db1.title)
          setPlanTitle(prevState => [...prevState, { title: db1.title, id: id + 1 }]);
          console.log('돌아감2')
          console.log(db1.title)
        }
        

        // setplanlist(db)

      } catch (error) {
        console.log('안돌아감');
      }
    };
    plan_info();
  }, []);


  //여행 박스
  const renderItem = ({ item }) =>{ 
  
    return( 
    <LinearGradient style={styles.planebox} colors={['#EDF5FF', '#C5DCFF']} start={{x:0,y:0}}>
      <View style={{flexDirection:'row',justifyContent:'flex-end',padding:10}}>
        <Icon name='more-vert' size={24} color={fcolor.white}/>
      </View>
      <View style={styles.planebox1}>
        <View style={{flexDirection:'row',marginBottom:7}}>
          <NeonGr><BText fontSize={16}>{item.title}</BText></NeonGr>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row',marginRight:20, alignItems:'center'}}>
            <Icon name='location-on' size={24} style={{marginRight:5}}/>
            <RText color={fcolor.gray4}>출발지 {'>'} 도착지</RText>
          </View>  
          <View style={{flexDirection:'row',marginRight:20, alignItems:'center'}}>
            <Icon name='calendar-today' size={24} style={{marginRight:5}}/>
            <RText color={fcolor.gray4}>여행일자</RText>
          </View>
          <View style={{flexDirection:'row',marginRight:20}}>
            <Icon name='share' size={24}/>
          </View>
            
        </View>
      </View>
    </LinearGradient>
      
    
  )};

  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between',paddingTop:40}}>
        <View style={{width:66}}></View>
        <BText style={{alignItems:'center'}} fontSize={18}>여행 목록</BText>
        <View style={{flexDirection:'row', alignItems:'flex-end'}}>
            <Icon style={{marginRight:18}} name='search' size={24} color={fcolor.gray4}/>
            <Icons name='tune-vertical' size={24} color={fcolor.gray4}/>
        </View>
        
      </View>
      <View style={{flexDirection:"row",marginTop:20,marginBottom:20}}>
                {['최신 날짜 순','최근 수정 순','최근 조회 순'].map(id=>(
                    <TouchableOpacity key={id} 
                    style={[styles.clickbox1, isclick === id ? { backgroundColor: fcolor.blue, borderColor: fcolor.blue} : null]}
                    onPress={()=>handle(id)}>
                        {isclick===id ? 
                        <RText fontSize={13} color={fcolor.white}>{id}</RText> :
                        <RText fontSize={13} color={fcolor.gray4}>{id}</RText>}
                    </TouchableOpacity>
                ))}        
      </View>
      <FlatList
            data={planTitle}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
         
      </View>
      
      <BottomBar homecolor={fcolor.gray3} checkcolor={fcolor.blue}></BottomBar>
    
    </GestureHandlerRootView>
    
  );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: fcolor.white,
        paddingRight:28,
        paddingLeft:28
        
    },
    header:{
      paddingLeft: 30,
      paddingRight:30,
      paddingBottom:10,
      flexDirection:'row',
      backgroundColor:fcolor.blue
      
    },
    white:{
      width:'100%',
      height:550,
      backgroundColor:fcolor.white,
      justifyContent:'center',
      elevation:30,

    },
    travelplane:{
      height: 500,
      padding:20,
      margin:20,
      
    },
    clickbox1:{
        alignItems:'center',
        justifyContent:'center',
        height:30,
        borderWidth:1,
        borderRadius:16,
        marginRight:14,
        paddingLeft:10,
        paddingRight:10,
        borderColor:fcolor.gray2
    },
    //일정내용
    planecontent:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        paddingBottom:30
    },
    planeline:{
      width:1,
      height:100,
      backgroundColor:fcolor.gray4
    },
    planebox:{
      width:'100%',
      height:158,
      backgroundColor:fcolor.skyblue,
      borderRadius:10,
      justifyContent:'space-between',
      marginVertical:10
    },
    planebox1:{
      height:74,
      backgroundColor:fcolor.gray1,
      paddingTop:9,
      paddingLeft:20,
      borderBottomRightRadius:10,
      borderBottomLeftRadius:10,
    }
})

export default Trvplanlist;
