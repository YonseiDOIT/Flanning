import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from '../src/components/common/AppText';
import BoldText from '../src/components/common/BoldText';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Item.bigicontyp(큰 아이콘)
// Item.smicontyp(작은 아이콘)
// Item.title(큰내용)
// Item.memo(메모)

const renderItem = ({ item }) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',paddingBottom:20}}>
      <View style={{flexDirection:'column',alignItems:'center',paddingRight:20,}}>
        <Icons style={{paddingBottom:10}} name={item.bigicontype} size={28} color="#717171"/>
          <View style={styles.planeline}></View>
      </View>
      {/* 일정 상세 */}
      <View style={{flexDirection:'column',paddingRight:20,}}>
        <Text style={{fontFamily:"Pretendard-Bold",color:'black',fontSize:16}}>{item.title}</Text>
          <View style={{flexDirection:'row',alignItems:'center',paddingTop:15,paddingBottom:15}}>
            <Icons style={{paddingRight:10}} name={item.smicontype} size={18} color="#9E9E9E"/>
              <Text style={{fontSize:13}}>{item.subtitle}</Text>
          </View>
          <View style={{borderColor:'#9E9E9E',width:'auto',height:'auto',padding:20,borderWidth:1,borderRadius:4, alignItems:'center',justifyContent:'center'}}>
              <Text style={{fontSize:13}}>{item.memo}</Text>
          </View>
      </View>
      
    </View>
  );
};


// 백엔드 할 때는 데이터를 파이어베이스에서 가져오도록
const data=[
  {
    id:'1',
    bigicontype:'airplane',
    smicontype:'airplane-takeoff',
    title:'출발지',
    subtitle: "출발지 > 도착지",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'2',
    bigicontype:'map-marker-outline',
    smicontype:'bus',
    title:'여행코스1',
    subtitle: "이동시간 (~분 소요)",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'3',
    bigicontype:'map-marker-outline',
    smicontype:'bus',
    title:'여행코스2',
    subtitle: "이동시간 (~분 소요)",
    memo:'여행이나 일정에 대한 메모 '
  },
  {
    id:'4',
    bigicontype:'airplane',
    smicontype:'airplane-landing',
    title:'출발지',
    subtitle: "출발지 > 도착지",
    memo:'여행이나 일정에 대한 메모 '
  },


]

const LIMIT = 5;

export function Main() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
      <View style={styles.imagebanner}>
        <View style={{flexDirection:'row',justifyContent:'flex-end',paddingBottom:50}}>
          <TouchableOpacity><Icon style={{marginRight:15}}name='group-add' size={28} color="#717171"/></TouchableOpacity>
          <TouchableOpacity><Icon name='settings' size={28} color="#717171"/></TouchableOpacity>
        </View>
        <BoldText color='white'>여행 제목</BoldText>
      </View>
        
      <View style={styles.white}>
          <View style={styles.travelplane}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={{fontFamily:"Pretendard-SemiBold",fontSize:16,color:"#717171"}}>여행일정</Text>
                  <TouchableOpacity><Text>상세보기{'>'}</Text></TouchableOpacity>
                </View>
                <View style={styles.planecontent}>
                  {/* 일정 종류 */}

                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                  />

                </View>
                  
                
            </View>
          </View> 
      </View>
      
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home' size={30} color="#000000"/>
          <Text style={[styles.icontext,{color:"#000000"}]}>홈</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='calendar-today' size={25} color="#717171"/>
          <Text style={styles.icontext}>여행 목록</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='edit' size={28} color="#717171"/>
          <Text style={styles.icontext}>리뷰</Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Icon name='settings' size={28} color="#717171"/>
          <Text style={styles.icontext}>설정</Text>  
        </TouchableOpacity>
        
        
        
        
      </View>
    
    </GestureHandlerRootView>
    
  );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#D9D9D9",
        justifyContent:'flex-end'
    },
    imagebanner:{
      paddingLeft: 30,
      paddingRight:30,
      paddingBottom:10
    },
    white:{
      width:'100%',
      height:550,
      backgroundColor:"#FFFFFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      justifyContent:'center'
    },
    travelplane:{
      height: 500,
      padding:20,
      margin:20,
      borderColor:"#C1C1C1",
      borderWidth:1,
      borderRadius:10,
    },
    //일정내용
    planecontent:{
      paddingTop:20,
      flexDirection:'column'
    },
    planeline:{
      width:3,
      height:100,
      backgroundColor:"#717171"
    },

    // 바텀바
    bottombar:{
      width:"100%",
      height:84,
      backgroundColor:"#D9D9D9",
      flexDirection:"row",
      justifyContent:'space-around',
      alignItems:'center'
      
    },
    icon:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
    },
    icontext:{
      fontSize:10,
      fontFamily:"Pretendard-Regular",
      padding:5
    },

})

export default Main;
