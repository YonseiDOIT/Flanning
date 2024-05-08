import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import database from '@react-native-firebase/database';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';


function Main() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <View style={styles.container}>
      <View style={styles.imagebanner}>
        <Text>여행제목</Text>
      </View>
        
      <View style={styles.white}>
          <View style={styles.travelplan}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>여행일정</Text>
              <TouchableOpacity><Text>상세보기{'>'}</Text></TouchableOpacity>
            </View>
            
          </View>   
      </View>
      <View style={styles.bottombar}>
        <TouchableOpacity style={styles.icon}>
          <Icon name='home' size={30} color="#000000"/>
          <Text style={styles.icontext}>홈</Text>  
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
      padding:20
    },
    white:{
      width:'100%',
      height:583,
      backgroundColor:"#FFFFFF",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20 
    },
    travelplan:{
      height: 539,
      padding:20,
      margin:20,
      borderColor:"#C1C1C1",
      borderWidth:1,
      borderRadius:10
    },
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
      color:"#717171",
      fontFamily:"Pretendard-Regular",
      padding:5
    }

})

export default Main;
