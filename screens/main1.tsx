// import React, { memo, useCallback, useEffect, useState } from 'react';
// import { Button, FlatList, Image, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
// import { GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import fcolor from '../src/assets/colors/fcolors';
// import BText from '../src/components/common/BText';
// import RText from '../src/components/common/RText';
// import LinearGradient from 'react-native-linear-gradient';
// import MText from '../src/components/common/MText';
// import NeonGr from '../src/components/neongr';
// import BottomBar from '../src/components/common/BottomBar';
// import { useUser } from '../src/components/common/UserContext';
// import { usePlan } from '../src/components/common/PlanContext';

// import firestore from '@react-native-firebase/firestore';
// import BoxGr from '../src/components/common/BoxGr';
// import { date } from '../src/lib/date';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { FadeDownView } from '../src/components/common/buttonAnimation';

// export function Main1({ navigation: { navigate } }) {

//   //메인 계획 코드 가져오기
//   const { plancode } = usePlan();

//   //여행 제목
//   const get_plan = async () => {
//     const planDoc = await firestore().collection('plan').doc(plancode).get();
//     const planData = planDoc.data();

//     var have = false

//     if (planData?.photo) {
//       have = true
//     } else {
//       console.log('사진 없어')
//     }
//     return { title: planData?.title, memo: planData?.memo, photo: planData?.photo, hav_p: have };
//   };

//   //여행 계획
//   const get_plan_list = async () => {
//     const planListCollection = await firestore().collection('plan').doc(plancode).collection('planlist').get();
//     let planList = [];
//     planListCollection.forEach(doc => {
//       planList.push({ id: doc.id, ...doc.data() });
//     });
//     return planList;
//   };

//   const [planTitle, setPlanTitle] = useState({ title: '', memo: '', hav_p: '', photo: '' });
//   const [plan, setPlan] = useState({ title: '', id: '', mon: '', day: '' }); // 큰 계획
//   const [planList, setPlanList] = useState([]); // 작은 계획
//   const [isOpend, setOpend] = useState(false);

//   const plan_info = async () => {
//     try {
//       const plan = await get_plan();
//       console.log(plan)
//       setPlanTitle(plan);

//       const planList = await get_plan_list();
//       console.log(planList[0].title)

//       // planList[0]만을 사용하여 fullPlanList를 구성
//       let id1 = 0;
//       let fullPlanList = [];
//       planList[0].plantext.forEach(planItem => {
//         fullPlanList.push({ ...planItem, id: id1 += 1, date: planList[0].id });
//       });

//       let date_word = date(planList[0].id)
//       // setPlan을 호출할 때 planList[0]의 각 item을 변환하여 설정
//       setPlan({ title: planList[0].title, id: planList[0].id, mon: date_word[0], day: date_word[1] });
//       setPlanList(fullPlanList);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       plan_info();
//     }, [])
//   );

//   //일정
//   const renderItem = ({ item }) => (
//     <View style={styles.planebox}>
//       <View style={{ width: '12%' }}>
//         <RText fontSize={12} color={fcolor.gray4}>{item.time}</RText>
//       </View>
//       <View style={{ width: '12%' }}>
//         <BoxGr name={item.locationtyp} />
//       </View>
//       <View style={{ width: '65%' }}>
//         <View style={{ flexDirection: 'row' }}>
//           <BText fontSize={15}>{item.location}</BText>

//         </View>
//         <View style={{ flexDirection: 'row', marginTop: 8 }}>
//           {item.content[0] !== '' && <Icons name={item.content[0]} size={22} color="#6AA1F7" />}
//           <RText fontSize={12} color={fcolor.gray4} style={{ marginLeft: 5 }}>{item.content[1]}</RText>
//         </View>
//       </View>
//     </View>

//   );

//   const handlePress = () => {
//     setOpend(!isOpend);
//   };

//   //사진 설정이랑 그런 거
//   const [smallboxVisible, setSmallboxVisible] = useState(false);

//   const toggleMenu = () => {
//     setSmallboxVisible(!smallboxVisible);
//   };

//   const select_p = async (data) => {
//     const data1 = { photo: '와' }

//     const planDoc = await firestore().collection('plan').doc(plancode);
//     // Set the 'capital' field of the city

//     const res = await planDoc.update({ photo: data });
//     console.log(data)
//     plan_info();

//   }

//   //사진 가져오기
//   const [response, setResponse] = useState("");
//   const [imageFile, setImageFile] = useState("");
//   const onSelectImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         maxWidth: 512,
//         maxHeight: 512,
//         includeBase64: Platform.OS === 'android',
//       },
//       (res) => {

//         // console.log(response.assets[0].base64)
//         if (res.didCancel) {
//           return;

//         } else if (res.errorCode) {
//           console.log("Image Error : " + res.errorCode);
//         }

//         setResponse(res);
//         select_p(res.assets[0].base64);

//       },

//     )
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         {planTitle.hav_p ? (
//           <View style={{ flex: 1 }}>
//             <ImageBackground
//               source={{ uri: `data:image/jpeg;base64,${planTitle.photo}` }}
//               style={{ width: "100%", height: "100%", zIndex: 1 }}
//               resizeMode="cover"
//             >
//               <View style={{
//                 flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 paddingTop: 30,
//                 paddingLeft: 30,
//                 paddingRight: 30,
//                 paddingBottom: 10,
//               }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50 }}>
//                   <Image source={require('../src/assets/images/logo.png')} style={{ width: 89, height: 34 }} />
//                   <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => navigate('alarmlist')}><Icons name='bell' size={22} color={fcolor.white}></Icons></TouchableOpacity>
//                     <TouchableOpacity onPress={() => navigate('friend')}><Icon name='group' size={25} color={fcolor.white} style={{ marginHorizontal: 16 }} /></TouchableOpacity>
//                     <TouchableOpacity onPress={toggleMenu}><Icon name='settings' size={25} color={fcolor.white} /></TouchableOpacity>
//                   </View>
//                 </View>
//                 {smallboxVisible && (
//                   <>
//                     <FadeDownView>
//                       <TouchableOpacity style={styles.smallbox} onPress={() => { }}>
//                         <RText color={fcolor.blue} fontSize={13}>사진 촬영하기</RText>
//                       </TouchableOpacity>
//                     </FadeDownView>
//                     <FadeDownView>
//                       <TouchableOpacity style={styles.smallbox1} onPress={onSelectImage}>
//                         <RText color={fcolor.blue} fontSize={13}>앨범 선택하기</RText>
//                       </TouchableOpacity>
//                     </FadeDownView>
//                   </>
//                 )}

//                 <BText color='white' fontSize={23} style={{ marginBottom: 5 }}>{planTitle.title}</BText>
//               </View>

//             </ImageBackground>
//           </View>

//         ) : (
//           <View style={styles.imagebanner}>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 50 }}>
//               <Image source={require('../src/assets/images/logo.png')} style={{ width: 89, height: 34 }} />
//               <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                 <TouchableOpacity onPress={() => navigate('alarmlist')}><Icons name='bell' size={22} color={fcolor.white}></Icons></TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigate('friend')}><Icon name='group' size={25} color={fcolor.white} style={{ marginHorizontal: 16 }} /></TouchableOpacity>
//                 <TouchableOpacity onPress={toggleMenu}><Icon name='settings' size={25} color={fcolor.white} /></TouchableOpacity>
//               </View>
//             </View>
//             {smallboxVisible && (
//               <>
//                 <FadeDownView duration={300}>
//                   <TouchableOpacity style={styles.smallbox} onPress={() => { navigate('loading') }}>
//                     <RText color={fcolor.blue} fontSize={13}>사진 촬영하기</RText>
//                   </TouchableOpacity>
//                 </FadeDownView>

//                 <FadeDownView duration={300}>
//                   <TouchableOpacity style={styles.smallbox1} onPress={onSelectImage}>
//                     <RText color={fcolor.blue} fontSize={13}>앨범 선택하기</RText>
//                   </TouchableOpacity>
//                 </FadeDownView>

//               </>
//             )}

//             <BText color='white' fontSize={23} style={{ marginBottom: 5 }}>{planTitle.title}</BText>

//           </View>

//         )

//         }

//         <View style={styles.white}>
//           <View>
//             {/* 여행 중요 메모 */}
//             <View style={styles.trvmemo}>
//               <BText fontSize={14} color={fcolor.blue} style={{ marginBottom: 5 }}>여행 중요 메모</BText>
//               <RText fontSize={13} color={fcolor.gray4}>{planTitle.memo}</RText>

//             </View>
//           </View>

//           <View style={{ marginTop: 15 }}>
//             {/* 여행 일정 */}
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
//               <BText fontSize={15}>여행 일정</BText>
//               <TouchableOpacity onPress={() => navigate('plande')}><RText color={fcolor.gray4}>상세보기{'>'}</RText></TouchableOpacity>
//             </View>
//             <View style={styles.travelplane}>
//               <View style={styles.trv_calendar}>
//                 <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
//                   <BText fontSize={15} color={"#6AA1F7"}>{plan.mon}/{plan.day}</BText>
//                 </View>
//                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                   <NeonGr colors={['#ffffff00', fcolor.lblue1]}><BText fontSize={16}>DAY{plan.title}</BText></NeonGr>
//                 </View>
//               </View>
//               <View style={styles.planecontent}>
//                 <FlatList
//                   data={planList.filter(dplan => dplan.date === plan.id)}
//                   renderItem={renderItem}
//                   keyExtractor={(item) => String(item.id)}
//                 />
//               </View>

//             </View>
//           </View>

//         </View>
//       </View>

//       <BottomBar homecolor={fcolor.blue}></BottomBar>

//     </GestureHandlerRootView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: fcolor.gray4,
//     justifyContent: 'flex-end'
//   },
//   imagebanner: {
//     flex: 1,
//     paddingTop: 30,
//     paddingLeft: 30,
//     paddingRight: 30,
//     paddingBottom: 10,
//     backgroundColor: fcolor.blue,
//     zIndex: 3
//   },
//   smallbox: {
//     position: 'absolute',
//     right: -8,
//     top: -45,
//     backgroundColor: fcolor.lblue1,
//     padding: 7,
//     borderRadius: 8,
//     zIndex: 10,
//     elevation: 4,
//   },
//   smallbox1: {
//     position: 'absolute',
//     right: -8,
//     top: -6,
//     backgroundColor: fcolor.lblue1,
//     padding: 7,
//     borderRadius: 8,
//     zIndex: 10,
//     elevation: 4,
//   },
//   white: {
//     width: '100%',
//     height: 544,
//     padding: 25,
//     paddingHorizontal: 16,
//     backgroundColor: fcolor.lblue2,
//     elevation: 30,
//     marginBottom: 60

//   },
//   //여행 중요 메모
//   trvmemo: {
//     height: 88,
//     flexDirection: 'column',
//     backgroundColor: fcolor.white,
//     borderWidth: 1,
//     borderColor: fcolor.lblue1,
//     padding: 24,
//     borderRadius: 10
//   },
//   //일정내용
//   travelplane: {
//     height: 357,
//     marginTop: 10,
//     backgroundColor: fcolor.white,
//     borderWidth: 1,
//     borderColor: fcolor.lblue1,
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 13
//   },
//   trv_calendar: {
//     height: 50,
//     borderBottomWidth: 1,
//     borderColor: fcolor.gray2,
//     flexDirection: 'row',
//     marginBottom: 5,
//   },
//   planecontent: {
//     paddingHorizontal: 10

//   },

//   planebox: {
//     marginVertical: 12,
//     flexDirection: 'row',
//     height: 50,
//     width: '100%',
//     justifyContent: 'space-around',
//     alignItems: 'baseline'
//   },

// })

// export default Main1;
