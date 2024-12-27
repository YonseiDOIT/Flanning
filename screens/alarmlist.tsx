// import React, { useEffect, useState } from 'react';
// import { Button, FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
// import database from '@react-native-firebase/database';
// import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import RText from '../src/components/common/RText';
// import BText from '../src/components/common/BText';
// import MText from '../src/components/common/MText';
// import fcolor from '../src/assets/colors/fcolors';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import NeonGr from '../src/components/neongr';
// import BottomBar from '../src/components/common/BottomBar';
// import LinearGradient from 'react-native-linear-gradient';

// import firestore, { FieldValue } from "@react-native-firebase/firestore";
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { useUser } from '../src/components/common/UserContext';

// export type RootStackParam = {
//   Home: undefined;
//   Test: undefined;
// };

// // Item.bigicontyp(큰 아이콘)
// // Item.smicontyp(작은 아이콘)
// // Item.title(큰내용)
// // Item.memo(메모)

// export function Alarmlist({ navigation: { navigate } }) {

//   //유저코드 가져오기
//   const { usercode } = useUser();

//   //여행태그
//   const [isclick, setclick] = useState();

//   //여행태그 클릭
//   const handle = (clickbox) => {
//     setclick(prevState => prevState === clickbox ? null : clickbox);

//   };

//   //목록 가져오기
//   const [planTitle, setPlanTitle] = useState([]);

//   const get_plan = async (plan_id) => {
//     const usersCollection = firestore().collection('plan').doc(plan_id).get();
//     const db = (await usersCollection).data();
//     console.log(db.title);
//     return db.title;
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40 }}>
//           <TouchableOpacity onPress={() => navigate('main1')}><Icon name='arrow-back-ios' size={24} color={fcolor.gray4} /></TouchableOpacity>
//           <BText style={{ alignItems: 'center' }} fontSize={18}>알림</BText>
//           <View style={{width:20}}></View>
//         </View>
//         <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20,marginLeft: 12}}>
//           {['전체알림', '친구', '여행','리뷰'].map(id => (
//             <TouchableOpacity key={id}
//               style={[styles.clickbox1, isclick === id ? { backgroundColor: fcolor.blue, borderColor: fcolor.blue } : null]}
//               onPress={() => handle(id)}>
//               {isclick === id ?
//                 <RText fontSize={13} color={fcolor.white}>{id}</RText> :
//                 <RText fontSize={13} color={fcolor.gray4}>{id}</RText>}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <View style={{flex:1,backgroundColor:fcolor.white}}>
//           <View style={styles.alarmbox}>
//             <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:13}}>
//               <MText fontSize={10} color={fcolor.gray4}>친구 신청</MText>
//               <MText fontSize={10} color={fcolor.gray4}>24년 7월 15일</MText>
//             </View>

//             <MText fontSize={13}>선림님이 친구로 추가했어요</MText>
//           </View>

//         </View>

//       <BottomBar homecolor={fcolor.blue}></BottomBar>

//     </GestureHandlerRootView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: fcolor.white,
//     paddingHorizontal: 24,

//   },
//   header: {
//     paddingLeft: 30,
//     paddingRight: 30,
//     paddingBottom: 10,
//     flexDirection: 'row',
//     backgroundColor: fcolor.blue

//   },
//   white: {
//     width: '100%',
//     height: 550,
//     backgroundColor: fcolor.white,
//     justifyContent: 'center',
//     elevation: 30,

//   },
//   travelplane: {
//     height: 500,
//     padding: 20,
//     margin: 20,

//   },
//   clickbox1: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 32,
//     borderWidth: 1,
//     borderRadius: 16,
//     paddingHorizontal:12,
//     marginRight:9,
//     borderColor: fcolor.gray2
//   },
//   alarmbox:{
//     height:82,
//     backgroundColor:fcolor.lblue2,
//     paddingHorizontal:36,
//     paddingVertical:15

//   }
// })

// export default Alarmlist;
