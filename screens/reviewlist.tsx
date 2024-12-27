// import React, { useCallback, useEffect, useState } from 'react';
// import { Button, FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
// import database from '@react-native-firebase/database';
// import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import RText from '../src/components/common/RText';
// import BText from '../src/components/common/BText';
// import MText from '../src/components/common/MText';
// import fcolor from '../src/assets/colors/fcolors';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import NeonGr from '../src/components/neongr';
// import BottomBar from '../src/components/common/BottomBar';
// import LinearGradient from 'react-native-linear-gradient';

// import firestore, { FieldValue } from "@react-native-firebase/firestore";
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
// import { useUser } from '../src/components/common/UserContext';
// import { date } from '../src/lib/date';

// export type RootStackParam = {
//   Home: undefined;
//   Test: undefined;
// };

// // Item.bigicontyp(큰 아이콘)
// // Item.smicontyp(작은 아이콘)
// // Item.title(큰내용)
// // Item.memo(메모)

// export function Reviewlist({ navigation: { navigate } }) {

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

//   const plan_info = async () => {
//     try {
//       const usersCollection = firestore().collection('users').doc(usercode).get();
//       let db = (await usersCollection).data();

//       const list = db.plan
//       console.log('뭐임')
//       console.log(list)

//       let updateplan = [];
//       for (let id = 0; id < list.length; id++) {
//         console.log(list[id])
//         const usersCollection1 = firestore().collection('plan').doc(list[id]).get();
//         const db1 = (await usersCollection1).data();
//         console.log(db1)
//         let title = db1.title
//         //날짜
//         let s_date = db1.startday.split('-')
//         let start_d = s_date[0].slice(2, 4) + '.' + s_date[1] + '.' + s_date[2]
//         let e_date = db1.endday.split('-')
//         let end_d = e_date[0].slice(2, 4) + '.' + e_date[1] + '.' + e_date[2]

//         //리뷰 적힌 여부
//         let have = await get_plan_list(list[id])
//         console.log('뭐지')
//         console.log(have)
//         updateplan.push({ ...db1, title: title, id: id + 1, code: list[id], start: start_d, end: end_d, have_r: have[0],img: have[1]})
//         console.log('돌아감2')
//         console.log(db1.title)
//       }
//       setPlanTitle(updateplan)

//       // setplanlist(db)

//     } catch (error) {
//       console.log('안돌아감');
//     }
//   };

//   // 리뷰 목록 불러오기
//   useFocusEffect(
//     useCallback(() => {
//       plan_info();
//     }, [])
//   );

//   const[isimg,settimg]=useState('')

//   //리뷰가 적혀있니?
//   const get_plan_list = async (code) => {
//     const planListCollection = await firestore().collection('plan').doc(code).collection('reviewlist').get();
//     let planList = [];
//     planListCollection.forEach(doc => {
//       planList.push({ id: doc.id, ...doc.data() });
//     });
//     var have_r = 0
//     var img=''
//     if (planList.length === 0) {
//       console.log('없어요')

//     } else {
//       console.log('있어요')
//       have_r = 1
//       planList[0].plantext.forEach(planItem => {
//         img=planItem.photo
//       });
//     }

//     console.log(have_r)
//     return [have_r,img]
//   };

//   //여행 박스
//   const renderItem = ({ item }) => {
//     console.log(item.have_r)
//     return (
//       <View>
//         <View style={styles.planebox}>
//           {item.have_r === 1 && (
//             <>
//               <Image source={require('../src/assets/images/stamp.png')}
//                 style={{
//                   width: 130,
//                   height: 100,
//                   position: 'absolute',
//                   zIndex: 2,
//                   right: 2,
//                   top: 115
//                 }}
//               />
//             </>
//           )
//           }
//           <Image source={require('../src/assets/images/stamp-2.png')}
//             style={{
//               width: 94,
//               height: 94,
//               position: 'absolute',
//               zIndex: 1,
//               right: 40,
//               top: 119
//             }} />
//           <View style={styles.rv_photo}>
//             {item.have_r === 1 && (
//               <>
//                 <Image
//                 source={{ uri: `data:image/jpeg;base64,${item.img}` }}
//                 style={{ width: '100%', height: 150 ,borderRadius: 4, }}
//                 />
//               </>
//             )
//             }
//           </View>
//           <TouchableOpacity onPress={() => {
//             if (item.have_r === 1) {
//               navigate('reviewp', { plancode: item.code })
//             } else {
//               navigate('addreview', { plancode: item.code })
//             }
//           }}>
//             <View style={{ marginVertical: 10, alignItems: 'flex-start' }}>
//               <NeonGr><BText fontSize={18}>{item.title}</BText></NeonGr>
//             </View>
//           </TouchableOpacity>
//           <RText fontSize={10} color={fcolor.gray4}>{item.start} ~ {item.end}</RText>
//         </View>

//       </View>

//     )
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 40 }}>
//           <View style={{ width: 66 }}></View>
//           <BText style={{ alignItems: 'center' }} fontSize={18}>여행 리뷰</BText>
//           <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
//             <TouchableOpacity onPress={() => navigate("addplan")}>
//               <Icon style={{ marginRight: 18 }} name='search' size={24} color={fcolor.gray4} />
//             </TouchableOpacity>
//           </View>

//         </View>
//         <View style={{ flexDirection: "row", marginTop: 20, marginBottom: 20, marginLeft: 12 }}>
//           {['최신 날짜 순', '최근 수정 순', '최근 조회 순'].map(id => (
//             <TouchableOpacity key={id}
//               style={[styles.clickbox1, isclick === id ? { backgroundColor: fcolor.blue, borderColor: fcolor.blue } : null]}
//               onPress={() => handle(id)}>
//               {isclick === id ?
//                 <RText fontSize={13} color={fcolor.white}>{id}</RText> :
//                 <RText fontSize={13} color={fcolor.gray4}>{id}</RText>}
//             </TouchableOpacity>
//           ))}
//         </View>

//         <FlatList
//           data={planTitle}
//           renderItem={renderItem}
//           style={{ marginBottom: 80 }}
//           keyExtractor={(item) => item.id.toString()}
//         />

//         <Pressable
//           style={({ pressed }) => pressed ? [styles.fab, { transform: [{ scale: 0.9 }] }] : [styles.fab]}
//           onPress={() => navigate('addreview')}>
//           <Icon name='edit' size={24} color={fcolor.white} />
//         </Pressable>

//       </View>

//       <BottomBar reviewcolor={fcolor.blue}></BottomBar>

//     </GestureHandlerRootView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: fcolor.white,
//     paddingHorizontal: 16,

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
//     width: 82,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 32,
//     borderWidth: 1,
//     borderRadius: 16,
//     paddingHorizontal: 8,
//     marginRight: 9,
//     borderColor: fcolor.gray2
//   },
//   //일정내용
//   planecontent: {
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column',
//     paddingBottom: 30
//   },
//   planeline: {
//     width: 1,
//     height: 100,
//     backgroundColor: fcolor.gray4
//   },
//   planebox: {
//     width: '100%',
//     height: 242,
//     borderColor: fcolor.lblue1,
//     borderWidth: 1,
//     borderRadius: 6,
//     paddingTop: 20,
//     paddingHorizontal: 16,
//     marginBottom: 21
//   },
//   rv_photo: {
//     width: '100%',
//     height: 150,
//     backgroundColor: fcolor.gray3,
//     borderRadius: 4,
//   },
//   //플로팅 버튼
//   fab: {
//     width: 40,
//     height: 40,
//     backgroundColor: fcolor.blue,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     right: 15,
//     bottom: 90,
//     elevation: 2
//   }
// })

// export default Reviewlist;
