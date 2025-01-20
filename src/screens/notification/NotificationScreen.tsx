import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import fcolor from 'src/assets/colors/fcolors';
import { FlatList } from 'react-native-gesture-handler';
import FontASIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BText from 'src/components/common/BText';
import globalStyles from 'src/assets/styles/globalStyles';

// 알림 페이지
const NotificationScreen = ({navigation}) => {
    //태그
   const [isclick, setclick] = useState();

   //태그 클릭
   const handle = (clickbox) => {
     setclick(prevState => prevState === clickbox ? null : clickbox);
   };

   const data = [
    {
      id:1,
      type: '리뷰작성',
      content: '후기를 기다리는 여행이 있어요.',
      date: '24년 7월 1일',
    },
    {
      id:2,
      type: '리뷰작성',
      content: '후기를 기다리는 여행이 있어요.',
      date: '24년 7월 1일',
    },
    {
      id:3,
      type: '리뷰작성',
      content: '후기를 기다리는 여행이 있어요.',
      date: '24년 7월 1일',
    },
    {
      id:4,
      type: '리뷰작성',
      content: '후기를 기다리는 여행이 있어요.',
      date: '24년 7월 1일',
    },
  ]

   //알림
   const renderItem=(item)=>{
    return(
      <View style={styles.alarmbox}>
             <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:13}}>
               <MText fontSize={10} color={fcolor.lblue4}>{item.type}</MText>
               <MText fontSize={10} color={fcolor.gray4}>{item.date}</MText>
             </View>

             <MText fontSize={13}>{item.content}</MText>
      </View>
    )
   }


  return (
    <View style={globalStyles.backBase}>
      <View style={globalStyles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40, alignItems:'center' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontASIcon name="angle-left" size={40} color={fcolor.gray4} />
            </TouchableOpacity>
            <BText fontSize={18}>알림</BText>
            <View style={{width:20}}></View>
        </View>
        <View style={{flexDirection: "row", marginTop: 20,marginLeft: 12}}>
            {['전체알림', '친구', '여행','리뷰'].map(id => (
              <TouchableOpacity key={id}
                style={[styles.clickbox1, isclick === id ? { backgroundColor: fcolor.blue, borderColor: fcolor.blue } : null]}
                onPress={() => handle(id)}>
                {isclick === id ?
                  <RText fontSize={13} color={fcolor.white}>{id}</RText> :
                  <RText fontSize={13} color={fcolor.gray4}>{id}</RText>}
              </TouchableOpacity>
            ))}
        </View>
      </View>
    <View style={{flex:5}}>
        <FlatList 
            data={data} 
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
         />
    </View>
  </View>
  )
};
const styles = StyleSheet.create({
  clickbox1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal:12,
    marginRight:9,
    borderColor: fcolor.gray2
  },
  alarmbox:{
    height:82,
    backgroundColor:fcolor.lblue2,
    paddingHorizontal:36,
    paddingVertical:15,
    flex:1

  }
})

export default NotificationScreen;
